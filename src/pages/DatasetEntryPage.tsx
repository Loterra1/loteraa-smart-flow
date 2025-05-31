
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, Database } from "lucide-react";
import DashboardNavbar from '@/components/DashboardNavbar';
import DatasetsList from '@/components/datasets/DatasetsList';
import DatasetForm from '@/components/datasets/DatasetForm';
import DatasetGuidelines from '@/components/datasets/DatasetGuidelines';
import VerificationSummary from '@/components/datasets/VerificationSummary';
import { useDatasets } from '@/hooks/useDatasets';
import { useSmartContracts } from '@/hooks/useSmartContracts';

export default function DatasetEntryPage() {
  const {
    datasets,
    isAddingDataset,
    setIsAddingDataset,
    addDataset,
    showVerificationSummary,
    verifiedDataset,
    closeVerificationSummary
  } = useDatasets();
  
  const { contracts } = useSmartContracts();
  const [isNewAccount, setIsNewAccount] = useState(true);

  useEffect(() => {
    // Check if user has datasets
    if (datasets && datasets.length > 0) {
      setIsNewAccount(false);
    } else {
      setIsNewAccount(true);
    }
  }, [datasets]);

  if (isNewAccount) {
    return (
      <div className="min-h-screen bg-loteraa-black">
        <DashboardNavbar />
        <div className="container mx-auto px-4 py-4 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
            <div>
              <h1 className="text-xl sm:text-3xl font-bold gradient-text mb-2">Dataset Entry</h1>
              <p className="text-white/70 text-sm sm:text-base">Submit and manage your datasets for Smart contract verification and onchain to earn rewards</p>
            </div>
            <Button 
              className="bg-loteraa-purple hover:bg-loteraa-purple/90 w-full sm:w-auto"
              onClick={() => setIsAddingDataset(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Dataset
            </Button>
          </div>
          
          <div className="bg-loteraa-gray/10 backdrop-blur-md border border-loteraa-gray/20 rounded-xl p-12 text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-loteraa-teal/10 flex items-center justify-center">
              <Database className="h-8 w-8 text-loteraa-teal/50" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">No datasets submitted yet</h2>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Start by submitting your first dataset for verification and earn rewards through our decentralized verification system.
            </p>
            <Button 
              className="bg-loteraa-purple hover:bg-loteraa-purple/90"
              onClick={() => setIsAddingDataset(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Submit Your First Dataset
            </Button>
          </div>
          
          {isAddingDataset && (
            <DatasetForm 
              onSubmit={addDataset}
              onCancel={() => setIsAddingDataset(false)}
              availableContracts={contracts}
            />
          )}
          
          <div className="mt-6 sm:mt-8">
            <DatasetGuidelines />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-loteraa-black">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold gradient-text mb-2">Dataset Entry</h1>
            <p className="text-white/70 text-sm sm:text-base">Submit and manage your datasets for Smart contract verification and onchain to earn rewards</p>
          </div>
          <Button 
            className="bg-loteraa-purple hover:bg-loteraa-purple/90 w-full sm:w-auto"
            onClick={() => setIsAddingDataset(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Dataset
          </Button>
        </div>
        
        {showVerificationSummary && verifiedDataset && (
          <VerificationSummary 
            dataset={verifiedDataset} 
            onClose={closeVerificationSummary} 
          />
        )}
        
        {isAddingDataset ? (
          <DatasetForm 
            onSubmit={addDataset}
            onCancel={() => setIsAddingDataset(false)}
            availableContracts={contracts}
          />
        ) : null}
        
        <DatasetsList datasets={datasets} />
        
        <div className="mt-6 sm:mt-8">
          <DatasetGuidelines />
        </div>
      </div>
    </div>
  );
}
