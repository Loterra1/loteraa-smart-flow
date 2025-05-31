
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

    // Simulate verification process (in a real app, this would be handled by smart contract)
    setTimeout(() => {
      const verifiedDataset: Dataset = {
        ...newDataset,
        status: 'Verified',
        size: '1.8 GB',
        verificationDetails: {
          timeOfVerification: new Date().toLocaleString(),
          dataHashMatch: true,
          timestampMatch: true,
          regionMatch: true,
          paymentStatus: 'Paid',
          paymentAmount: 1950,
          walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
          txHash: '0x29a5b41b62c30b9de8c5d3fea17aca5ed888bdebc941a4ea6370e9d3c5cb6e4',
        }
      };

      setDatasets(prev => 
        prev.map(d => d.id === newDataset.id ? verifiedDataset : d)
      );
      setVerifiedDataset(verifiedDataset);
      setShowVerificationSummary(true);

      toast({
        title: "Dataset verified",
        description: "Your dataset has been successfully verified by the smart contract.",
      });
    }, 3000);
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
