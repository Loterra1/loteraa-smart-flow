import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Transaction {
  id: string;
  type: 'earning' | 'withdrawal' | 'deposit' | 'payment';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  created_at: string;
  transaction_hash?: string;
  metadata?: any;
  source: 'earnings' | 'downloads' | 'activities';
}

export interface TransactionStats {
  totalEarnings: number;
  totalWithdrawals: number;
  totalTransactions: number;
  pendingTransactions: number;
}

export const useTransactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<TransactionStats>({
    totalEarnings: 0,
    totalWithdrawals: 0,
    totalTransactions: 0,
    pendingTransactions: 0
  });

  useEffect(() => {
    if (!user) return;

    fetchTransactions();

    // Set up real-time subscriptions
    const earningsChannel = supabase
      .channel(`transactions-earnings-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'earnings',
          filter: `user_id=eq.${user.id}`
        },
        () => fetchTransactions()
      )
      .subscribe();

    const downloadsChannel = supabase
      .channel(`transactions-downloads-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'downloads',
          filter: `user_id=eq.${user.id}`
        },
        () => fetchTransactions()
      )
      .subscribe();

    const activitiesChannel = supabase
      .channel(`transactions-activities-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_activities',
          filter: `user_id=eq.${user.id}`
        },
        () => fetchTransactions()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(earningsChannel);
      supabase.removeChannel(downloadsChannel);
      supabase.removeChannel(activitiesChannel);
    };
  }, [user?.id]);

  const fetchTransactions = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch earnings (deposits/earnings)
      const { data: earnings, error: earningsError } = await supabase
        .from('earnings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (earningsError) throw earningsError;

      // Fetch downloads (payments)
      const { data: downloads, error: downloadsError } = await supabase
        .from('downloads')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (downloadsError) throw downloadsError;

      // Fetch user activities (withdrawals and other transactions)
      const { data: activities, error: activitiesError } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', user.id)
        .in('activity_type', ['withdrawal', 'deposit', 'transaction'])
        .order('created_at', { ascending: false });

      if (activitiesError) throw activitiesError;

      // Transform and combine all transactions
      const allTransactions: Transaction[] = [];

      // Add earnings
      earnings?.forEach(earning => {
        allTransactions.push({
          id: earning.id,
          type: 'earning',
          amount: Number(earning.amount),
          status: earning.status as any,
          created_at: earning.created_at,
          transaction_hash: earning.transaction_hash || undefined,
          metadata: { type: earning.type, dataset_id: earning.dataset_id },
          source: 'earnings'
        });
      });

      // Add downloads as payments
      downloads?.forEach(download => {
        if (download.payment_amount && Number(download.payment_amount) > 0) {
          allTransactions.push({
            id: download.id,
            type: 'payment',
            amount: Number(download.payment_amount),
            status: download.payment_status === 'completed' ? 'completed' : 'pending',
            created_at: download.created_at,
            metadata: { 
              dataset_id: download.dataset_id,
              download_url: download.download_url 
            },
            source: 'downloads'
          });
        }
      });

      // Add user activities
      activities?.forEach(activity => {
        const activityData = (activity.activity_data as any) || {};
        allTransactions.push({
          id: activity.id,
          type: activity.activity_type === 'withdrawal' ? 'withdrawal' : 'deposit',
          amount: Number(activityData.amount || 0),
          status: activityData.status || 'completed',
          created_at: activity.created_at,
          transaction_hash: activityData.transaction_hash,
          metadata: activityData,
          source: 'activities'
        });
      });

      // Sort by date (newest first)
      allTransactions.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setTransactions(allTransactions);

      // Calculate stats
      const newStats: TransactionStats = {
        totalEarnings: allTransactions
          .filter(t => t.type === 'earning' || t.type === 'deposit')
          .reduce((sum, t) => sum + t.amount, 0),
        totalWithdrawals: allTransactions
          .filter(t => t.type === 'withdrawal')
          .reduce((sum, t) => sum + t.amount, 0),
        totalTransactions: allTransactions.length,
        pendingTransactions: allTransactions
          .filter(t => t.status === 'pending').length
      };

      setStats(newStats);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    transactions,
    loading,
    stats,
    refetch: fetchTransactions
  };
};