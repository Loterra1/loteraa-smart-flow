
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
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
