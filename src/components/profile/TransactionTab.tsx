import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import {
   ArrowUpRight,
   ArrowDownRight,
   Coins,
   Download,
   ExternalLink,
} from 'lucide-react';
import { useTransactions } from '@/hooks/useTransactions';
import { format } from 'date-fns';

export default function TransactionTab() {
   const { transactions, loading, stats } = useTransactions();
   const [selectedTransaction, setSelectedTransaction] = useState(null);
   const [filter, setFilter] = useState<string>('all');

   const filteredTransactions =
      filter === 'all'
         ? transactions
         : transactions.filter((t) => t.type === filter);

   const getTransactionIcon = (type: string) => {
      switch (type) {
         case 'deposit':
            return <ArrowDownRight className="h-4 w-4 text-green-400" />;
         case 'withdrawal':
            return <ArrowUpRight className="h-4 w-4 text-red-400" />;
         case 'earning':
            return <Coins className="h-4 w-4 text-yellow-400" />;
         case 'payment':
            return <Download className="h-4 w-4 text-blue-400" />;
         default:
            return <Coins className="h-4 w-4 text-gray-400" />;
      }
   };

   const getStatusBadge = (status: string) => {
      const variants = {
         completed: 'default',
         pending: 'secondary',
         failed: 'destructive',
      } as const;

      return (
         <Badge
            variant={variants[status as keyof typeof variants] || 'secondary'}
         >
            {status}
         </Badge>
      );
   };

   if (loading) {
      return (
         <div className="p-6">
            <div className="animate-pulse space-y-4">
               {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-muted/10 rounded-lg" />
               ))}
            </div>
         </div>
      );
   }

   return (
      <div className="p-6 space-y-6">
         {/* Transaction Statistics */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-background/5 border-muted/20">
               <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">
                     Total Earnings
                  </div>
                  <div className="text-2xl font-bold text-green-400">
                     ${stats.totalEarnings.toFixed(2)}
                  </div>
               </CardContent>
            </Card>
            <Card className="bg-background/5 border-muted/20">
               <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">
                     Total Withdrawals
                  </div>
                  <div className="text-2xl font-bold text-red-400">
                     ${stats.totalWithdrawals.toFixed(2)}
                  </div>
               </CardContent>
            </Card>
            <Card className="bg-background/5 border-muted/20">
               <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">
                     Total Transactions
                  </div>
                  <div className="text-2xl font-bold">
                     {stats.totalTransactions}
                  </div>
               </CardContent>
            </Card>
            <Card className="bg-background/5 border-muted/20">
               <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Pending</div>
                  <div className="text-2xl font-bold text-yellow-400">
                     {stats.pendingTransactions}
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Transaction Filters */}
         <div className="flex gap-2 flex-wrap">
            <Button
               variant={filter === 'all' ? 'default' : 'outline'}
               size="sm"
               onClick={() => setFilter('all')}
            >
               All
            </Button>
            <Button
               variant={filter === 'earning' ? 'default' : 'outline'}
               size="sm"
               onClick={() => setFilter('earning')}
            >
               Earnings
            </Button>
            <Button
               variant={filter === 'withdrawal' ? 'default' : 'outline'}
               size="sm"
               onClick={() => setFilter('withdrawal')}
            >
               Withdrawals
            </Button>
            <Button
               variant={filter === 'deposit' ? 'default' : 'outline'}
               size="sm"
               onClick={() => setFilter('deposit')}
            >
               Deposits
            </Button>
            <Button
               variant={filter === 'payment' ? 'default' : 'outline'}
               size="sm"
               onClick={() => setFilter('payment')}
            >
               Payments
            </Button>
         </div>

         {/* Transaction Table */}
         <Card className="bg-background/5 border-muted/20">
            <CardHeader>
               <CardTitle className="text-foreground">
                  Recent Transactions
               </CardTitle>
            </CardHeader>
            <CardContent>
               {filteredTransactions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                     No transactions found
                  </div>
               ) : (
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Type</TableHead>
                           <TableHead>Amount</TableHead>
                           <TableHead>Status</TableHead>
                           <TableHead>Date</TableHead>
                           <TableHead>Actions</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {filteredTransactions.map((transaction) => (
                           <TableRow key={transaction.id}>
                              <TableCell>
                                 <div className="flex items-center gap-2">
                                    {getTransactionIcon(transaction.type)}
                                    <span className="capitalize">
                                       {transaction.type}
                                    </span>
                                 </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                 <span
                                    className={
                                       transaction.type === 'earning' ||
                                       transaction.type === 'deposit'
                                          ? 'text-green-400'
                                          : 'text-red-400'
                                    }
                                 >
                                    {transaction.type === 'earning' ||
                                    transaction.type === 'deposit'
                                       ? '+'
                                       : '-'}
                                    LOT{transaction.amount.toFixed(2)}
                                 </span>
                              </TableCell>
                              <TableCell>
                                 {getStatusBadge(transaction.status)}
                              </TableCell>
                              <TableCell>
                                 {format(
                                    new Date(transaction.created_at),
                                    'MMM dd, yyyy'
                                 )}
                              </TableCell>
                              <TableCell>
                                 <div className="flex gap-2">
                                    <Button
                                       variant="outline"
                                       size="sm"
                                       onClick={() =>
                                          setSelectedTransaction(transaction)
                                       }
                                    >
                                       View
                                    </Button>
                                    {transaction.transaction_hash && (
                                       <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() =>
                                             window.open(
                                                `https://etherscan.io/tx/${transaction.transaction_hash}`,
                                                '_blank'
                                             )
                                          }
                                       >
                                          <ExternalLink className="h-3 w-3" />
                                       </Button>
                                    )}
                                 </div>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               )}
            </CardContent>
         </Card>

         {/* Transaction Details Modal */}
         <Dialog
            open={!!selectedTransaction}
            onOpenChange={() => setSelectedTransaction(null)}
         >
            <DialogContent className="bg-background border-muted/20">
               <DialogHeader>
                  <DialogTitle className="text-foreground">
                     Transaction Details
                  </DialogTitle>
               </DialogHeader>
               {selectedTransaction && (
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <div className="text-sm text-muted-foreground">
                              Type
                           </div>
                           <div className="flex items-center gap-2">
                              {getTransactionIcon(selectedTransaction.type)}
                              <span className="capitalize">
                                 {selectedTransaction.type}
                              </span>
                           </div>
                        </div>
                        <div>
                           <div className="text-sm text-muted-foreground">
                              Amount
                           </div>
                           <div className="font-medium">
                              LOT{selectedTransaction.amount.toFixed(2)}
                           </div>
                        </div>
                        <div>
                           <div className="text-sm text-muted-foreground">
                              Status
                           </div>
                           {getStatusBadge(selectedTransaction.status)}
                        </div>
                        <div>
                           <div className="text-sm text-muted-foreground">
                              Date
                           </div>
                           <div>
                              {format(
                                 new Date(selectedTransaction.created_at),
                                 'MMM dd, yyyy HH:mm'
                              )}
                           </div>
                        </div>
                     </div>

                     {selectedTransaction.transaction_hash && (
                        <div>
                           <div className="text-sm text-muted-foreground">
                              Transaction Hash
                           </div>
                           <div className="font-mono text-xs break-all bg-muted/10 p-2 rounded">
                              {selectedTransaction.transaction_hash}
                           </div>
                        </div>
                     )}

                     {selectedTransaction.metadata && (
                        <div>
                           <div className="text-sm text-muted-foreground">
                              Additional Details
                           </div>
                           <div className="bg-muted/10 p-2 rounded text-xs">
                              <pre>
                                 {JSON.stringify(
                                    selectedTransaction.metadata,
                                    null,
                                    2
                                 )}
                              </pre>
                           </div>
                        </div>
                     )}
                  </div>
               )}
            </DialogContent>
         </Dialog>
      </div>
   );
}
