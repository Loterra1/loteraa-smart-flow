import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface DatasetFile {
  id: string;
  name: string;
  description: string;
  file_type: string;
  file_size: number;
  file_url: string;
  file_structure: any;
  status: 'pending' | 'verified' | 'rejected';
  verification_details?: any;
  access_type: 'open' | 'paid' | 'restricted';
  access_price: number;
  download_count: number;
  reward_amount: number;
  region?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  verified_at?: string;
}

export interface DatasetFormData {
  name: string;
  description: string;
  region?: string;
  accessType: 'open' | 'paid' | 'restricted';
  accessPrice?: number;
  tags?: string[];
}

export const useSupabaseDatasets = () => {
  const [datasets, setDatasets] = useState<DatasetFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchUserDatasets();
    }
  }, [user]);

  const fetchUserDatasets = async () => {
    try {
      const { data, error } = await supabase
        .from('datasets')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching datasets:', error);
        return;
      }

      setDatasets((data || []) as DatasetFile[]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllVerifiedDatasets = async (): Promise<DatasetFile[]> => {
    try {
      const { data, error } = await supabase
        .from('datasets')
        .select('*')
        .eq('status', 'verified')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching verified datasets:', error);
        return [];
      }

      return (data || []) as DatasetFile[];
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };

  const uploadDataset = async (file: File, datasetInfo: DatasetFormData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to upload datasets",
        variant: "destructive"
      });
      return null;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('datasetInfo', JSON.stringify(datasetInfo));
      formData.append('userId', user.id);

      const { data, error } = await supabase.functions.invoke('upload-dataset', {
        body: formData
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Dataset uploaded successfully! Verification in progress.",
      });

      // Refresh user datasets
      await fetchUserDatasets();
      
      return data;
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload dataset. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const downloadDataset = async (datasetId: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to download datasets",
        variant: "destructive"
      });
      return null;
    }

    try {
      const { data, error } = await supabase.functions.invoke('download-dataset', {
        body: {
          datasetId,
          userId: user.id
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Dataset download started",
      });

      return data;
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: "Failed to download dataset. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  };

  const analyzeFile = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const fileName = file.name.toLowerCase();
          
          if (fileName.endsWith('.csv')) {
            const analysis = analyzeCsvContent(text, file.size);
            resolve(analysis);
          } else if (fileName.endsWith('.json')) {
            const analysis = analyzeJsonContent(text, file.size);
            resolve(analysis);
          } else {
            resolve({
              columns: ['Unknown'],
              rowCount: 0,
              dataTypes: {},
              sampleData: [],
              fileSize: file.size
            });
          }
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  return {
    datasets,
    loading,
    uploading,
    uploadDataset,
    downloadDataset,
    fetchAllVerifiedDatasets,
    analyzeFile,
    refreshDatasets: fetchUserDatasets
  };
};

function analyzeCsvContent(csvText: string, fileSize: number) {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length === 0) {
    return { columns: [], rowCount: 0, dataTypes: {}, sampleData: [], fileSize };
  }

  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const dataLines = lines.slice(1);
  
  const sampleData = dataLines.slice(0, 5).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    return row;
  });

  const dataTypes: Record<string, string> = {};
  headers.forEach((header, index) => {
    const sampleValue = sampleData[0]?.[header];
    if (sampleValue && !isNaN(Number(sampleValue))) {
      dataTypes[header] = 'number';
    } else if (sampleValue && (sampleValue.includes('-') || sampleValue.includes('/'))) {
      dataTypes[header] = 'date';
    } else {
      dataTypes[header] = 'string';
    }
  });

  return {
    columns: headers,
    rowCount: dataLines.length,
    dataTypes,
    sampleData,
    fileSize
  };
}

function analyzeJsonContent(jsonText: string, fileSize: number) {
  try {
    const data = JSON.parse(jsonText);
    let columns: string[] = [];
    let rowCount = 0;
    let sampleData: any[] = [];

    if (Array.isArray(data)) {
      rowCount = data.length;
      if (data.length > 0 && typeof data[0] === 'object') {
        columns = Object.keys(data[0]);
        sampleData = data.slice(0, 5);
      }
    } else if (typeof data === 'object') {
      columns = Object.keys(data);
      rowCount = 1;
      sampleData = [data];
    }

    const dataTypes: Record<string, string> = {};
    columns.forEach(column => {
      const sampleValue = sampleData[0]?.[column];
      dataTypes[column] = typeof sampleValue;
    });

    return {
      columns,
      rowCount,
      dataTypes,
      sampleData,
      fileSize
    };
  } catch {
    return {
      columns: ['Invalid JSON'],
      rowCount: 0,
      dataTypes: {},
      sampleData: [],
      fileSize
    };
  }
}