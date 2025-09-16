import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export default function DashboardStats() {
   const [isNewAccount, setIsNewAccount] = useState(true);
   // const [totalEarnings, setTotalEarnings] = useState<number>(0);
   const { user, lotBalance } = useAuth();

   // const fetchTotalEarnings = async () => {
   //   if (!user) return;

   //   try {
   //     // First try to get from profiles table
   //     const { data: profile, error: profileError } = await supabase
   //       .from('profiles')
   //       .select('lot_token_balance')
   //       .eq('user_id', user.id)
   //       .maybeSingle();

   //     if (profileError) {
   //       console.error('Error fetching profile:', profileError);
   //       return;
   //     }

   //     if (profile && profile.lot_token_balance !== null && profile.lot_token_balance !== undefined) {
   //       setTotalEarnings(Number(profile.lot_token_balance));
   //     } else {
   //       // If no profile data, calculate from earnings table
   //       const { data: earnings, error: earningsError } = await supabase
   //         .from('earnings')
   //         .select('amount')
   //         .eq('user_id', user.id)
   //         .eq('status', 'completed');

   //       if (earningsError) {
   //         console.error('Error fetching earnings:', earningsError);
   //         return;
   //       }

   //       const total = earnings?.reduce((sum, earning) => sum + Number(earning.amount), 0) || 0;
   //       setTotalEarnings(total);
   //     }
   //   } catch (error) {
   //     console.error('Error fetching total earnings:', error);
   //   }
   // };

   // useEffect(() => {
   //   const userData = localStorage.getItem('userData');
   //   if (userData) {
   //     const parsedData = JSON.parse(userData);
   //     setIsNewAccount(parsedData.isNewAccount !== false);
   //   }

   //   if (user) {
   //     fetchTotalEarnings();

   //     // Set up real-time subscription for profile updates
   //     const channel = supabase
   //       .channel('dashboard-profile-changes')
   //       .on(
   //         'postgres_changes',
   //         {
   //           event: 'UPDATE',
   //           schema: 'public',
   //           table: 'profiles',
   //           filter: `user_id=eq.${user.id}`
   //         },
   //         (payload) => {
   //           if (payload.new.lot_token_balance !== undefined) {
   //             setTotalEarnings(Number(payload.new.lot_token_balance));
   //           }
   //         }
   //       )
   //       .subscribe();

   //     return () => {
   //       supabase.removeChannel(channel);
   //     };
   //   }
   // }, [user]);

   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
         <StatCard
            title="Data Streams"
            value="0"
            trend={<ChevronUp className="h-4 w-4 text-gray-500" />}
            trendValue="Start collecting data"
            iconBg="bg-loteraa-blue/20"
            iconColor="text-loteraa-blue"
            isNew={isNewAccount}
         />
         <StatCard
            title="Total Earnings"
            value={lotBalance.toFixed(2)}
            unit="$LOT"
            trend={<ChevronUp className="h-4 w-4 text-gray-500" />}
            trendValue={
               lotBalance > 0
                  ? `$${lotBalance.toFixed(2)} earned`
                  : 'Begin earning'
            }
            iconBg="bg-loteraa-teal/20"
            iconColor="text-loteraa-teal"
            isNew={isNewAccount && lotBalance === 0}
         />
      </div>
   );
}

interface StatCardProps {
   title: string;
   value: string;
   unit?: string;
   trend: React.ReactNode;
   trendValue: string;
   iconBg: string;
   iconColor: string;
   isNew?: boolean;
}

function StatCard({
   title,
   value,
   unit,
   trend,
   trendValue,
   iconBg,
   iconColor,
   isNew,
}: StatCardProps) {
   return (
      <Card className="bg-loteraa-gray/20 border-loteraa-gray/30 hover:border-loteraa-purple/50 transition-colors">
         <CardContent className="p-6">
            <div className="flex items-center justify-between">
               <div>
                  <p className="text-sm text-white/70">{title}</p>
                  <div className="flex items-baseline mt-1">
                     <p className="text-2xl font-semibold text-white">
                        {value}
                     </p>
                     {unit && (
                        <span className="ml-1 text-sm text-white/70">
                           {unit}
                        </span>
                     )}
                  </div>
                  <div className="flex items-center mt-2">
                     {trend}
                     <span
                        className={`text-xs ml-1 ${
                           isNew ? 'text-gray-500' : 'text-green-500'
                        }`}
                     >
                        {trendValue}
                     </span>
                  </div>
               </div>
               <div className={`p-2 rounded-lg ${iconBg}`}>
                  <div className={`h-8 w-8 ${iconColor}`}></div>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
