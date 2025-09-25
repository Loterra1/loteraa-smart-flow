import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/utils/api';

export interface Transaction {
   id: string;
   type: 'earning' | 'withdrawal' | 'deposit' | 'payment';
   amount: number;
   status: 'completed' | 'pending' | 'failed';
   createdAt: string;
   transaction_hash?: string;
   metadata?: Record<string, unknown>;
   source: 'earnings' | 'downloads' | 'activities';
   description?: string;
}

export interface TransactionStats {
   totalEarnings: number;
   totalWithdrawals: number;
   totalTransactions: number;
   pendingTransactions: number;
   availableBalance: number;
}

interface TransactionFilters {
   type?: 'earning' | 'withdrawal' | 'deposit' | 'payment';
   status?: 'completed' | 'pending' | 'failed';
   source?: 'earnings' | 'downloads' | 'activities';
   dateFrom?: string;
   dateTo?: string;
   limit?: number;
   offset?: number;
}

export const useTransactions = (filters?: TransactionFilters) => {
   const { user } = useAuth();
   const [transactions, setTransactions] = useState<Transaction[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [stats, setStats] = useState<TransactionStats>({
      totalEarnings: 0,
      totalWithdrawals: 0,
      totalTransactions: 0,
      pendingTransactions: 0,
      availableBalance: 0,
   });

   // Memoize fetchTransactions to prevent infinite re-renders
   const fetchTransactions = useCallback(async () => {
      if (!user?.id) {
         setLoading(false);
         return;
      }

      try {
         setLoading(true);
         setError(null);

         // Build query parameters
         const paramsObj: Record<string, string> = {
            userId: user.id,
         };
         if (filters) {
            if (filters.type) paramsObj.type = filters.type;
            if (filters.status) paramsObj.status = filters.status;
            if (filters.source) paramsObj.source = filters.source;
            if (filters.dateFrom) paramsObj.dateFrom = filters.dateFrom;
            if (filters.dateTo) paramsObj.dateTo = filters.dateTo;
            if (typeof filters.limit === 'number')
               paramsObj.limit = filters.limit.toString();
            if (typeof filters.offset === 'number')
               paramsObj.offset = filters.offset.toString();
         }
         const params = new URLSearchParams(paramsObj);

         // Fetch transactions from backend

         const url = `/onchain/transactions?userId=${user.id}&limit=50`;
         console.log('Request URL:', url);
         const limit = '50';
         const response = await api.get(
            `/onchain/transactions?userId=${
               user.id
            }&page=1&limit=${limit.toString()}`
         );
         console.log('Fetched transactions response:', response);

         if (response.data && response.data.success) {
            const { transactions: fetchedTransactions, stats: fetchedStats } =
               response.data.data;

            // Transform transactions to match our interface
            const transformedTransactions: Transaction[] =
               fetchedTransactions.map((tx) => ({
                  id: tx.id,
                  type: tx.type,
                  amount: Number(tx.amount),
                  status: tx.status,
                  created_at: tx.created_at,
                  transaction_hash: tx.transaction_hash,
                  metadata: tx.metadata || {},
                  source: tx.source || 'activities',
                  description:
                     tx.description ||
                     getDefaultDescription(tx.type, tx.amount),
               }));

            setTransactions(transformedTransactions);

            // Update stats if provided by backend
            if (fetchedStats) {
               setStats({
                  totalEarnings: Number(fetchedStats.totalEarnings || 0),
                  totalWithdrawals: Number(fetchedStats.totalWithdrawals || 0),
                  totalTransactions: Number(
                     fetchedStats.totalTransactions || 0
                  ),
                  pendingTransactions: Number(
                     fetchedStats.pendingTransactions || 0
                  ),
                  availableBalance: Number(fetchedStats.availableBalance || 0),
               });
            } else {
               // Calculate stats locally if not provided by backend
               calculateStatsLocally(transformedTransactions);
            }
         } else {
            throw new Error(
               response.data?.message || 'Failed to fetch transactions'
            );
         }
      } catch (err) {
         console.error('Error fetching transactions:', err);
         setError(
            err.response?.data?.message ||
               err.message ||
               'Failed to fetch transactions'
         );
         setTransactions([]);
      } finally {
         setLoading(false);
      }
   }, [user?.id, filters]);

   // Helper function to calculate stats locally
   const calculateStatsLocally = (txs: Transaction[]) => {
      const newStats: TransactionStats = {
         totalEarnings: txs
            .filter(
               (t) =>
                  (t.type === 'earning' || t.type === 'deposit') &&
                  t.status === 'completed'
            )
            .reduce((sum, t) => sum + t.amount, 0),
         totalWithdrawals: txs
            .filter((t) => t.type === 'withdrawal' && t.status === 'completed')
            .reduce((sum, t) => sum + t.amount, 0),
         totalTransactions: txs.length,
         pendingTransactions: txs.filter((t) => t.status === 'pending').length,
         availableBalance: 0, // This should come from backend
      };

      // Calculate available balance (earnings - withdrawals)
      newStats.availableBalance =
         newStats.totalEarnings - newStats.totalWithdrawals;

      setStats(newStats);
   };

   // Helper function to generate default descriptions
   const getDefaultDescription = (type: string, amount: number): string => {
      switch (type) {
         case 'earning':
            return `Earned ${amount} LOT tokens`;
         case 'withdrawal':
            return `Withdrew ${amount} LOT tokens`;
         case 'deposit':
            return `Deposited ${amount} LOT tokens`;
         case 'payment':
            return `Payment of ${amount} LOT tokens`;
         default:
            return `Transaction of ${amount} LOT tokens`;
      }
   };

   // Fetch transactions on mount and when dependencies change
   useEffect(() => {
      if (user?.id) {
         fetchTransactions();
      }
   }, [fetchTransactions]);

   // Create a new transaction (for when user makes a transaction)
   const createTransaction = useCallback(
      async (transactionData: {
         type: 'earning' | 'withdrawal' | 'deposit' | 'payment';
         amount: number;
         metadata?: Record<string, unknown>;
         description?: string;
      }) => {
         if (!user?.id) {
            throw new Error('User not authenticated');
         }

         try {
            const response = await api.post('/transactions', {
               userId: user.id,
               ...transactionData,
            });

            if (response.data && response.data.success) {
               // Refetch transactions to get the latest data
               await fetchTransactions();
               return response.data.data;
            } else {
               throw new Error(
                  response.data?.message || 'Failed to create transaction'
               );
            }
         } catch (err) {
            console.error('Error creating transaction:', err);
            throw new Error(
               err.response?.data?.message ||
                  err.message ||
                  'Failed to create transaction'
            );
         }
      },
      [user?.id, fetchTransactions]
   );

   // Update transaction status (for pending transactions)
   const updateTransactionStatus = useCallback(
      async (
         transactionId: string,
         status: 'completed' | 'failed',
         transactionHash?: string
      ) => {
         try {
            const response = await api.patch(`/transactions/${transactionId}`, {
               status,
               transaction_hash: transactionHash,
            });

            if (response.data && response.data.success) {
               // Update local state
               setTransactions((prev) =>
                  prev.map((tx) =>
                     tx.id === transactionId
                        ? {
                             ...tx,
                             status,
                             transaction_hash:
                                transactionHash || tx.transaction_hash,
                          }
                        : tx
                  )
               );

               // Recalculate stats
               const updatedTransactions = transactions.map((tx) =>
                  tx.id === transactionId
                     ? {
                          ...tx,
                          status,
                          transaction_hash:
                             transactionHash || tx.transaction_hash,
                       }
                     : tx
               );
               calculateStatsLocally(updatedTransactions);

               return response.data.data;
            } else {
               throw new Error(
                  response.data?.message || 'Failed to update transaction'
               );
            }
         } catch (err) {
            console.error('Error updating transaction:', err);
            throw new Error(
               err.response?.data?.message ||
                  err.message ||
                  'Failed to update transaction'
            );
         }
      },
      [transactions]
   );

   // Get transactions by type
   const getTransactionsByType = useCallback(
      (type: Transaction['type']) => {
         return transactions.filter((tx) => tx.type === type);
      },
      [transactions]
   );

   // Get pending transactions
   const getPendingTransactions = useCallback(() => {
      return transactions.filter((tx) => tx.status === 'pending');
   }, [transactions]);

   // Setup polling for real-time updates (optional)
   useEffect(() => {
      if (!user?.id) return;

      // Poll for updates every 30 seconds if there are pending transactions
      const pendingCount = transactions.filter(
         (tx) => tx.status === 'pending'
      ).length;

      if (pendingCount > 0) {
         const interval = setInterval(() => {
            fetchTransactions();
         }, 30000); // Poll every 30 seconds

         return () => clearInterval(interval);
      }
   }, [transactions, fetchTransactions, user?.id]);

   return {
      transactions,
      loading,
      error,
      stats,
      refetch: fetchTransactions,
      createTransaction,
      updateTransactionStatus,
      getTransactionsByType,
      getPendingTransactions,
   };
};
