import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Database, 
  Info, 
  Code, 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign,
  Calendar,
  Hash
} from 'lucide-react';
import { DatasetFile } from '@/hooks/useSupabaseDatasets';

interface DatasetDetailsModalProps {
  dataset: DatasetFile | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload?: () => void;
}

export default function DatasetDetailsModal({ dataset, isOpen, onClose }: DatasetDetailsModalProps) {
  if (!dataset) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variant = status === 'verified' ? 'default' : status === 'rejected' ? 'destructive' : 'secondary';
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        {getStatusIcon(status)}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-black border border-white/20">
        <DialogHeader className="border-b border-white/10 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                <Database className="h-6 w-6 text-loteraa-teal" />
                {dataset.name}
              </DialogTitle>
              <p className="text-white/70 mt-2">{dataset.description}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              {getStatusBadge(dataset.status)}
              {dataset.status === 'verified' && dataset.reward_amount > 0 && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {dataset.reward_amount} LOT
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-loteraa-gray/20">
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Information
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Data Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Code Preview
            </TabsTrigger>
            <TabsTrigger value="status" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Status & Transaction
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-loteraa-gray/10 border-loteraa-gray/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Dataset Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">File Type:</span>
                    <span className="text-white font-medium">{dataset.file_type.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">File Size:</span>
                    <span className="text-white font-medium">{formatFileSize(dataset.file_size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Access Type:</span>
                    <span className="text-white font-medium capitalize">{dataset.access_type}</span>
                  </div>
                  {dataset.access_type === 'paid' && (
                    <div className="flex justify-between">
                      <span className="text-white/70">Price:</span>
                      <span className="text-white font-medium">${dataset.access_price}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-white/70">Downloads:</span>
                    <span className="text-white font-medium">{dataset.download_count}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-loteraa-gray/10 border-loteraa-gray/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Upload Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Created:</span>
                    <span className="text-white font-medium">
                      {new Date(dataset.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Updated:</span>
                    <span className="text-white font-medium">
                      {new Date(dataset.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                  {dataset.verified_at && (
                    <div className="flex justify-between">
                      <span className="text-white/70">Verified:</span>
                      <span className="text-white font-medium">
                        {new Date(dataset.verified_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {dataset.region && (
                    <div className="flex justify-between">
                      <span className="text-white/70">Region:</span>
                      <span className="text-white font-medium">{dataset.region}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            {dataset.file_structure?.sampleData ? (
              <Card className="bg-loteraa-gray/10 border-loteraa-gray/20">
                <CardHeader>
                  <CardTitle className="text-white">Data Preview</CardTitle>
                  <p className="text-white/70 text-sm">
                    Showing first 5 rows of {dataset.file_structure.rowCount} total rows
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10">
                          {dataset.file_structure.columns?.map((column: string, index: number) => (
                            <TableHead key={index} className="text-white font-medium">
                              {column}
                              <div className="text-xs text-white/50 font-normal">
                                {dataset.file_structure.dataTypes?.[column] || 'string'}
                              </div>
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dataset.file_structure.sampleData.map((row: any, rowIndex: number) => (
                          <TableRow key={rowIndex} className="border-white/10">
                            {dataset.file_structure.columns?.map((column: string, colIndex: number) => (
                              <TableCell key={colIndex} className="text-white/80">
                                {String(row[column] || '')}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-loteraa-gray/10 border-loteraa-gray/20">
                <CardContent className="flex items-center justify-center py-12">
                  <p className="text-white/70">No preview data available</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <Card className="bg-loteraa-gray/10 border-loteraa-gray/20">
              <CardHeader>
                <CardTitle className="text-white">JSON Code Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>
                      {JSON.stringify(dataset.file_structure?.sampleData || {}, null, 2)}
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="status" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-loteraa-gray/10 border-loteraa-gray/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-loteraa-teal" />
                    Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Status:</span>
                    {getStatusBadge(dataset.status)}
                  </div>
                  {dataset.verification_details && (
                    <>
                      <Separator className="bg-white/10" />
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/70">Verified By:</span>
                          <span className="text-white font-medium">
                            {dataset.verification_details.verified_by || 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Verification Date:</span>
                          <span className="text-white font-medium">
                            {dataset.verification_details.verification_date ? 
                              new Date(dataset.verification_details.verification_date).toLocaleDateString() : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Data Integrity:</span>
                          <Badge variant={dataset.verification_details.data_integrity_check ? 'default' : 'destructive'}>
                            {dataset.verification_details.data_integrity_check ? 'Passed' : 'Failed'}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Format Validation:</span>
                          <Badge variant={dataset.verification_details.format_validation ? 'default' : 'destructive'}>
                            {dataset.verification_details.format_validation ? 'Passed' : 'Failed'}
                          </Badge>
                        </div>
                        {dataset.verification_details.rejection_reason && (
                          <div className="mt-2 p-2 bg-red-500/10 rounded border border-red-500/20">
                            <p className="text-red-400 text-sm">{dataset.verification_details.rejection_reason}</p>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-loteraa-gray/10 border-loteraa-gray/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-loteraa-teal" />
                    Transaction Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Reward Amount:</span>
                    <span className="text-white font-medium">{dataset.reward_amount} LOT</span>
                  </div>
                  {dataset.verification_details?.paymentStatus && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-white/70">Payment Status:</span>
                        <Badge variant={dataset.verification_details.paymentStatus === 'Paid' ? 'default' : 'secondary'}>
                          {dataset.verification_details.paymentStatus}
                        </Badge>
                      </div>
                      {dataset.verification_details.txHash && (
                        <div className="flex justify-between">
                          <span className="text-white/70">Transaction Hash:</span>
                          <span className="text-white font-mono text-xs truncate max-w-32">
                            {dataset.verification_details.txHash}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 border-t border-white/10 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/20 text-white hover:bg-white/10"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}