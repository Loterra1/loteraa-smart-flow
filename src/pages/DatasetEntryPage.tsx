
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, Database } from "lucide-react";
import DashboardNavbar from '@/components/DashboardNavbar';
import DatasetsList from '@/components/datasets/DatasetsList';
import DatasetFileUpload from '@/components/datasets/DatasetFileUpload';
import DatasetGuidelines from '@/components/datasets/DatasetGuidelines';
import { useSupabaseDatasets } from '@/hooks/useSupabaseDatasets';
import { useAuth } from '@/contexts/AuthContext';

export default function DatasetEntryPage() {
  const { datasets, loading } = useSupabaseDatasets();
  const { user } = useAuth();
  const [isAddingDataset, setIsAddingDataset] = useState(false);
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
            <DatasetFileUpload 
              onUploadSuccess={() => setIsAddingDataset(false)}
              onCancel={() => setIsAddingDataset(false)}
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
        
        {isAddingDataset && (
          <DatasetFileUpload 
            onUploadSuccess={() => setIsAddingDataset(false)}
            onCancel={() => setIsAddingDataset(false)}
          />
        )}
        
        <div className="bg-loteraa-gray/20 rounded-lg border border-loteraa-gray/30 p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Your Datasets</h2>
          {datasets.length === 0 ? (
            <p className="text-white/70">No datasets uploaded yet.</p>
          ) : (
            <div className="space-y-4">
              {datasets.map((dataset) => (
                <div key={dataset.id} className="bg-loteraa-gray/10 rounded-lg p-4 border border-loteraa-gray/20">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-white">{dataset.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      dataset.status === 'verified' ? 'bg-green-500/20 text-green-400' :
                      dataset.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {dataset.status}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm mb-2">{dataset.description}</p>
                  <div className="flex justify-between text-xs text-white/50">
                    <span>Type: {dataset.file_type}</span>
                    <span>Uploaded: {new Date(dataset.created_at).toLocaleDateString()}</span>
                  </div>
                  {dataset.status === 'verified' && dataset.reward_amount > 0 && (
                    <div className="mt-2 text-green-400 text-sm">
                      Reward: {dataset.reward_amount} LOT tokens
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-6 sm:mt-8">
          <DatasetGuidelines />
        </div>
      </div>
    </div>
  );
}
