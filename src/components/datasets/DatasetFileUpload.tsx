import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
   Upload,
   FileText,
   Database,
   CheckCircle,
   AlertCircle,
   Eye,
} from 'lucide-react';
import {
   useSupabaseDatasets,
   //  DatasetFormData,
} from '@/hooks/useSupabaseDatasets';
import { Badge } from '@/components/ui/badge';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import api from '@/utils/api';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

// Extend the DatasetFormData interface to include schemaKey
interface DatasetFormData {
   name: string;
   description: string;
   region: string;
   accessType: 'open' | 'paid' | 'restricted';
   accessPrice: number;
   tags: string[];
   schemaKey: string;
}

interface DatasetFileUploadProps {
   onUploadSuccess?: (dataset) => void;
   onCancel?: () => void;
}

interface FileAnalysis {
   columns: string[];
   rowCount: number;
   dataTypes: Record<string, string>;
   sampleData: Record<string, unknown>[];
   fileSize: number;
}

export default function DatasetFileUpload({
   onUploadSuccess,
   onCancel,
}: DatasetFileUploadProps) {
   const { user, refreshReward } = useAuth();
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [fileAnalysis, setFileAnalysis] = useState<FileAnalysis | null>(null);
   const [formData, setFormData] = useState<DatasetFormData>({
      name: '',
      description: '',
      region: '',
      accessType: 'open',
      accessPrice: 0,
      tags: [],
      schemaKey: '',
   });
   const [autoAnalyze, setAutoAnalyze] = useState(true);
   const [showPreview, setShowPreview] = useState(false);
   const [showCodePreview, setShowCodePreview] = useState(false);
   const [allSchemas, setAllSchemas] = useState([]);
   const [schemaPropertiesText, setSchemaPropertiesText] = useState('');
   const [uploading, setUploading] = useState(false);

   const fileInputRef = useRef<HTMLInputElement>(null);

   const { uploadDataset, analyzeFile } = useSupabaseDatasets();

   const handleGetSchemas = async () => {
      try {
         const response = await api.get('/uploads/all-schema-keys');
         if (response.data.success) {
            setAllSchemas(response.data.data);
         } else {
            console.error('Failed to fetch schemas:', response.data.message);
            toast({
               title: 'Error',
               description: 'Failed to load available schemas.',
               variant: 'destructive',
            });
         }
      } catch (error) {
         console.error('Error fetching schemas:', error);
         toast({
            title: 'Error',
            description: 'Failed to load available schemas.',
            variant: 'destructive',
         });
      }
   };

   // Use useCallback to memoize the function for useEffect dependency
   const handleGetSchemaProperties = useCallback(async () => {
      if (!formData.schemaKey) {
         setSchemaPropertiesText(''); // Clear text area if no schema is selected
         return;
      }
      try {
         const response = await api.get(
            `/uploads/schema-properties?schemaKey=${formData.schemaKey}`
         );
         if (response.data.success) {
            const formattedSchema = JSON.stringify(response.data.data, null, 2);
            setSchemaPropertiesText(formattedSchema);
         } else {
            setSchemaPropertiesText('Failed to fetch schema properties.');
            toast({
               title: 'Error',
               description: 'Failed to fetch schema properties.',
               variant: 'destructive',
            });
         }
      } catch (error) {
         console.error('Error fetching schema properties:', error);
         setSchemaPropertiesText('Error loading schema properties.');
         toast({
            title: 'Error',
            description: 'Failed to fetch schema properties.',
            variant: 'destructive',
         });
      }
   }, [formData.schemaKey]);

   const handleFileSelect = async (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setSelectedFile(file);
      setFormData((prev) => ({
         ...prev,
         name: file.name.replace(/\.[^/.]+$/, ''),
      }));

      if (autoAnalyze) {
         try {
            const analysis = await analyzeFile(file);
            setFileAnalysis(analysis);
         } catch (error) {
            console.error('File analysis failed:', error);
         }
      }
   };

   const handleUpload = async () => {
      if (!selectedFile) {
         toast({
            title: 'Error',
            description: 'Please select a file to upload.',
            variant: 'destructive',
         });
         return;
      }

      if (!formData.schemaKey) {
         toast({
            title: 'Error',
            description: 'Please select a schema for your dataset.',
            variant: 'destructive',
         });
         return;
      }
      setUploading(true);

      try {
         const uploadFormData = new FormData();
         uploadFormData.append('file', selectedFile);
         uploadFormData.append('userID', user.id);
         uploadFormData.append('name', formData.name);
         uploadFormData.append('accessType', formData.accessType);
         uploadFormData.append('schemaKey', formData.schemaKey);

         const response = await api.post(
            '/uploads/upload-data',
            uploadFormData,
            {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            }
         );

         if (response.data.success) {
            await uploadDataset(selectedFile, formData);
            onUploadSuccess(response.data);
            refreshReward();
            toast({
               title: 'Success',
               description: 'Dataset uploaded successfully!',
            });
         } else {
            console.error('Backend upload failed:', response.data.message);
            toast({
               title: 'Error',
               description:
                  'Failed to upload dataset. ' + response.data.message,
               variant: 'destructive',
            });
         }
      } catch (error) {
         console.error('Error during upload:', error);
         toast({
            title: 'Error',
            description: 'Failed to upload dataset. Please try again.',
            variant: 'destructive',
         });
      } finally {
         setUploading(false);
      }
   };

   const handlePreview = async () => {
      if (!selectedFile) return;

      try {
         const analysis = await analyzeFile(selectedFile);
         setFileAnalysis(analysis);
         setShowPreview(true);
      } catch (error) {
         console.error('Preview failed:', error);
      }
   };

   const handleCodePreview = async () => {
      if (!selectedFile) return;

      try {
         const analysis = await analyzeFile(selectedFile);
         setFileAnalysis(analysis);
         setShowCodePreview(true);
      } catch (error) {
         console.error('Code preview failed:', error);
      }
   };

   const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
   };

   useEffect(() => {
      handleGetSchemas();
   }, []);

   useEffect(() => {
      handleGetSchemaProperties();
   }, [formData.schemaKey, handleGetSchemaProperties]);

   const supportedFormats = ['CSV', 'JSON', 'XML', 'TXT', 'XLSX'];

   return (
      <div className="space-y-6">
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Dataset
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               {/* File Upload Section */}
               <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-loteraa-purple transition-colors">
                     <Label
                        htmlFor="file-upload"
                        className="flex flex-col items-center cursor-pointer"
                     >
                        <input
                           id="file-upload"
                           type="file"
                           className="hidden"
                           accept=".csv,.json,.xml,.txt,.xlsx"
                           onChange={handleFileSelect}
                        />
                        <Upload className="h-12 w-12 mb-4 text-gray-400" />
                        <p className="text-lg font-medium mb-2">
                           {selectedFile
                              ? selectedFile.name
                              : 'Drop your file here or click to browse'}
                        </p>
                        <p className="text-gray-500 mb-4">
                           {selectedFile
                              ? `${formatFileSize(selectedFile.size)} • ${
                                   selectedFile.type
                                }`
                              : 'Supported formats: CSV, JSON, XML, TXT, XLSX'}
                        </p>
                        {selectedFile && (
                           <Badge
                              variant="outline"
                              className="text-green-600 border-green-600"
                           >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              File selected
                           </Badge>
                        )}
                     </Label>
                  </div>
               </div>
               {/* Dataset Information */}
               <div className="space-y-4">
                  <div>
                     <Label htmlFor="name">Dataset Name</Label>
                     <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                           setFormData((prev) => ({
                              ...prev,
                              name: e.target.value,
                           }))
                        }
                        placeholder="Enter dataset name"
                     />
                  </div>

                  <div>
                     <Label htmlFor="description">Description</Label>
                     <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                           setFormData((prev) => ({
                              ...prev,
                              description: e.target.value,
                           }))
                        }
                        placeholder="Describe your dataset"
                        rows={3}
                     />
                  </div>

                  {/* Schema Selection */}
                  <div>
                     <Label htmlFor="schema">Dataset Schema</Label>
                     <Select
                        value={formData.schemaKey}
                        onValueChange={(value) =>
                           setFormData((prev) => ({
                              ...prev,
                              schemaKey: value,
                           }))
                        }
                     >
                        <SelectTrigger>
                           <SelectValue placeholder="Select a schema" />
                        </SelectTrigger>
                        <SelectContent>
                           {allSchemas.length > 0 ? (
                              allSchemas.map((schema) => (
                                 <SelectItem key={schema} value={schema}>
                                    {schema}
                                 </SelectItem>
                              ))
                           ) : (
                              <SelectItem value="no-schemas" disabled>
                                 No schemas available
                              </SelectItem>
                           )}
                        </SelectContent>
                     </Select>
                  </div>

                  {/* Conditionally rendered Textarea for Schema Properties */}
                  {schemaPropertiesText && (
                     <div>
                        <Label>Expected Schema Properties</Label>
                        <Textarea
                           className="font-mono text-xs"
                           value={schemaPropertiesText}
                           rows={10}
                           readOnly
                        />
                     </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <Label htmlFor="region">Region (Optional)</Label>
                        <Input
                           id="region"
                           value={formData.region}
                           onChange={(e) =>
                              setFormData((prev) => ({
                                 ...prev,
                                 region: e.target.value,
                              }))
                           }
                           placeholder="e.g., North America, Europe"
                        />
                     </div>

                     <div>
                        <Label htmlFor="accessType">Access Type</Label>
                        <Select
                           value={formData.accessType}
                           onValueChange={(
                              value: 'open' | 'paid' | 'restricted'
                           ) =>
                              setFormData((prev) => ({
                                 ...prev,
                                 accessType: value,
                              }))
                           }
                        >
                           <SelectTrigger>
                              <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="open">Open Access</SelectItem>
                              <SelectItem value="paid">Paid Access</SelectItem>
                              <SelectItem value="restricted">
                                 Restricted Use
                              </SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  </div>

                  {formData.accessType === 'paid' && (
                     <div>
                        <Label htmlFor="accessPrice">
                           Access Price (LOT tokens)
                        </Label>
                        <Input
                           id="accessPrice"
                           type="number"
                           min="0"
                           step="0.01"
                           value={formData.accessPrice}
                           onChange={(e) =>
                              setFormData((prev) => ({
                                 ...prev,
                                 accessPrice: Number(e.target.value),
                              }))
                           }
                           placeholder="0.00"
                        />
                     </div>
                  )}
               </div>

               {/* Options */}
               <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="autoAnalyze"
                        checked={autoAnalyze}
                        onCheckedChange={(checked) => setAutoAnalyze(!!checked)}
                     />
                     <Label htmlFor="autoAnalyze">
                        Auto-analyze & extract structure from file
                     </Label>
                  </div>
               </div>

               {/* File Analysis Preview */}
               {fileAnalysis && (
                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Database className="h-5 w-5" />
                           File Analysis
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                           <div>
                              <p className="text-sm text-gray-500">Columns</p>
                              <p className="font-medium">
                                 {fileAnalysis.columns.length}
                              </p>
                           </div>
                           <div>
                              <p className="text-sm text-gray-500">Rows</p>
                              <p className="font-medium">
                                 {fileAnalysis.rowCount}
                              </p>
                           </div>
                           <div>
                              <p className="text-sm text-gray-500">Size</p>
                              <p className="font-medium">
                                 {formatFileSize(fileAnalysis.fileSize)}
                              </p>
                           </div>
                           <div>
                              <p className="text-sm text-gray-500">Format</p>
                              <p className="font-medium">
                                 {selectedFile?.name
                                    .split('.')
                                    .pop()
                                    ?.toUpperCase()}
                              </p>
                           </div>
                        </div>

                        {fileAnalysis.columns.length > 0 && (
                           <div>
                              <p className="text-sm font-medium mb-2">
                                 Columns:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                 {fileAnalysis.columns
                                    .slice(0, 10)
                                    .map((column, index) => (
                                       <Badge key={index} variant="outline">
                                          {column} (
                                          {fileAnalysis.dataTypes[column] ||
                                             'unknown'}
                                          )
                                       </Badge>
                                    ))}
                                 {fileAnalysis.columns.length > 10 && (
                                    <Badge variant="secondary">
                                       +{fileAnalysis.columns.length - 10} more
                                    </Badge>
                                 )}
                              </div>
                           </div>
                        )}

                        {fileAnalysis.sampleData.length > 0 && showPreview && (
                           <div className="mt-4">
                              <p className="text-sm font-medium mb-3">
                                 Data Preview (First 5 rows):
                              </p>
                              <ScrollArea className="w-full border rounded-md">
                                 <div className="max-h-80">
                                    <Table>
                                       <TableHeader>
                                          <TableRow>
                                             {fileAnalysis.columns.map(
                                                (column, index) => (
                                                   <TableHead
                                                      key={index}
                                                      className="whitespace-nowrap font-medium"
                                                   >
                                                      <div>
                                                         <div>{column}</div>
                                                         <div className="text-xs text-muted-foreground font-normal">
                                                            {fileAnalysis
                                                               .dataTypes[
                                                               column
                                                            ] || 'unknown'}
                                                         </div>
                                                      </div>
                                                   </TableHead>
                                                )
                                             )}
                                          </TableRow>
                                       </TableHeader>
                                       <TableBody>
                                          {fileAnalysis.sampleData
                                             .slice(0, 5)
                                             .map((row, rowIndex) => (
                                                <TableRow key={rowIndex}>
                                                   {fileAnalysis.columns.map(
                                                      (column, colIndex) => (
                                                         <TableCell
                                                            key={colIndex}
                                                            className="whitespace-nowrap"
                                                         >
                                                            <div
                                                               className="max-w-32 truncate"
                                                               title={String(
                                                                  row[column] ||
                                                                     ''
                                                               )}
                                                            >
                                                               {row[column] !==
                                                                  null &&
                                                               row[column] !==
                                                                  undefined ? (
                                                                  String(
                                                                     row[column]
                                                                  )
                                                               ) : (
                                                                  <span className="text-muted-foreground">
                                                                     null
                                                                  </span>
                                                               )}
                                                            </div>
                                                         </TableCell>
                                                      )
                                                   )}
                                                </TableRow>
                                             ))}
                                       </TableBody>
                                    </Table>
                                 </div>
                              </ScrollArea>

                              {fileAnalysis.rowCount > 5 && (
                                 <p className="text-xs text-muted-foreground mt-2">
                                    Showing 5 of {fileAnalysis.rowCount} total
                                    rows
                                 </p>
                              )}
                           </div>
                        )}

                        {fileAnalysis.sampleData.length > 0 &&
                           showCodePreview && (
                              <div className="mt-4">
                                 <p className="text-sm font-medium mb-3">
                                    Dataset Code Preview (First 5 rows):
                                 </p>
                                 <ScrollArea className="w-full border rounded-md">
                                    <div className="max-h-80 p-4">
                                       <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">
                                          <code>
                                             {JSON.stringify(
                                                fileAnalysis.sampleData.slice(
                                                   0,
                                                   5
                                                ),
                                                null,
                                                2
                                             )}
                                          </code>
                                       </pre>
                                    </div>
                                 </ScrollArea>

                                 {fileAnalysis.rowCount > 5 && (
                                    <p className="text-xs text-muted-foreground mt-2">
                                       Showing 5 of {fileAnalysis.rowCount}{' '}
                                       total rows in JSON format
                                    </p>
                                 )}
                              </div>
                           )}
                     </CardContent>
                  </Card>
               )}

               {/* Action Buttons */}
               <div className="flex gap-3">
                  {onCancel && (
                     <Button variant="outline" onClick={onCancel}>
                        Cancel
                     </Button>
                  )}

                  {selectedFile && (
                     <>
                        <Button variant="outline" onClick={handlePreview}>
                           <Eye className="h-4 w-4 mr-2" />
                           {showPreview
                              ? 'Refresh Preview'
                              : 'View Data Preview'}
                        </Button>
                        <Button variant="outline" onClick={handleCodePreview}>
                           <FileText className="h-4 w-4 mr-2" />
                           {showCodePreview
                              ? 'Refresh Code'
                              : 'Preview Dataset Code'}
                        </Button>
                     </>
                  )}

                  <Button
                     onClick={handleUpload}
                     disabled={!selectedFile || uploading}
                     className="bg-loteraa-purple hover:bg-loteraa-purple/90"
                  >
                     {uploading ? (
                        <>
                           <AlertCircle className="h-4 w-4 mr-2 animate-spin" />
                           Uploading...
                        </>
                     ) : (
                        <>
                           <Upload className="h-4 w-4 mr-2" />
                           Publish Dataset
                        </>
                     )}
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
