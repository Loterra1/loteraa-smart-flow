
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { Dataset, NewDatasetFormData } from '@/types/dataset';

export const useDatasets = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [isNewAccount, setIsNewAccount] = useState(true);
  const [isAddingDataset, setIsAddingDataset] = useState(false);
  const [showVerificationSummary, setShowVerificationSummary] = useState(false);
  const [verifiedDataset, setVerifiedDataset] = useState<Dataset | null>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has any activity to determine if they should have datasets
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.hasDatasets) {
        setIsNewAccount(false);
        // Load sample datasets for existing users
        setDatasets([
          {
            id: '1',
            name: 'Environmental Sensor Data',
            type: 'IoT Readings',
            source: 'Smart City Project',
            size: '1.2 GB',
            dateAdded: 'May 15, 2025',
            status: 'Verified',
          },
          {
            id: '2',
            name: 'Traffic Pattern Analysis',
            type: 'Vehicle Movement',
            source: 'Highway Department',
            size: '800 MB',
            dateAdded: 'May 10, 2025',
            status: 'Pending',
          },
          {
            id: '3',
            name: 'Air Quality Measurements',
            type: 'Atmospheric Sensors',
            source: 'Environmental Agency',
            size: '450 MB',
            dateAdded: 'May 8, 2025',
            status: 'Verified',
          },
          {
            id: '4',
            name: 'Energy Consumption Data',
            type: 'Smart Grid',
            source: 'Power Company',
            size: '2.1 GB',
            dateAdded: 'May 3, 2025',
            status: 'Rejected',
          },
        ]);
      } else {
        setIsNewAccount(true);
        setDatasets([]);
      }
    }
  }, []);

  const addDataset = (formData: NewDatasetFormData) => {
    const newDataset: Dataset = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      type: formData.type,
      source: formData.source,
      size: 'Calculating...',
      dateAdded: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      status: 'Pending',
      description: formData.description,
      region: formData.region,
      accessType: formData.accessType,
      accessPrice: formData.accessPrice,
      smartContract: formData.smartContract,
      accessFee: formData.accessFee,
      autoPayGas: formData.autoPayGas,
      accessControl: formData.accessControl,
    };

    setDatasets([newDataset, ...datasets]);
    setIsAddingDataset(false);
    setIsNewAccount(false);
    
    // Update user data to indicate they now have datasets
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      localStorage.setItem('userData', JSON.stringify({
        ...parsedData,
        hasDatasets: true,
        hasActivity: true
      }));
    }
    
    toast({
      title: "Dataset submitted",
      description: "Your dataset has been submitted for verification.",
    });

    // Note: Actual verification is handled by Supabase edge function
    // Real-time updates will show the verification results
  };

  const closeVerificationSummary = () => {
    setShowVerificationSummary(false);
    setVerifiedDataset(null);
  };

  return {
    datasets,
    isAddingDataset,
    setIsAddingDataset,
    addDataset,
    showVerificationSummary,
    verifiedDataset,
    closeVerificationSummary
  };
};
