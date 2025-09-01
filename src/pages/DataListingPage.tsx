
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Eye, Filter, Database } from "lucide-react";
import DashboardNavbar from '@/components/DashboardNavbar';
import DatasetDetailsModal from '@/components/datasets/DatasetDetailsModal';
import { useSupabaseDatasets } from '@/hooks/useSupabaseDatasets';
import { useNavigate } from 'react-router-dom';

export default function DataListingPage() {
  const { fetchAllVerifiedDatasets } = useSupabaseDatasets();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [verifiedDatasets, setVerifiedDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVerifiedDatasets();
  }, []);

  const loadVerifiedDatasets = async () => {
    setLoading(true);
    const datasets = await fetchAllVerifiedDatasets();
    setVerifiedDatasets(datasets);
    setLoading(false);
  };

  // Filter datasets based on search and category
  const filteredDatasets = verifiedDatasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || dataset.file_type === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleViewDetails = (dataset) => {
    setSelectedDataset(dataset);
    setShowDetailsModal(true);
  };

  const handleDownload = (dataset) => {
    // Simulate download - in a real app, this would download the actual file
    const blob = new Blob([`Dataset: ${dataset.name}\nType: ${dataset.type}\nSize: ${dataset.size}`], {
      type: 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dataset.name.replace(/\s+/g, '_')}_dataset.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmitDataset = () => {
    navigate('/dataset-entry');
  };

  const categories = ['all', ...Array.from(new Set(verifiedDatasets.map(d => d.file_type)))];

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <DashboardNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">Loading datasets...</div>
        </div>
      </div>
    );
  }

  if (verifiedDatasets.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <DashboardNavbar />
        <div className="container mx-auto px-4 py-4 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-3xl font-bold text-white mb-2">IoT Data Listing</h1>
            <p className="text-white/70 text-sm sm:text-base">Browse and download verified IoT datasets for your development projects</p>
          </div>
          
          <div className="bg-loteraa-gray/10 backdrop-blur-md border border-loteraa-gray/20 rounded-xl p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-loteraa-teal/10 flex items-center justify-center">
              <Database className="h-8 w-8 text-loteraa-teal/50" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">No verified datasets available yet</h2>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Be the first to contribute! Submit your IoT datasets for verification and help build our decentralized data ecosystem.
            </p>
            <Button 
              onClick={handleSubmitDataset}
              className="bg-black hover:bg-black/90 border border-white text-white"
            >
              Submit Your Dataset
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-3xl font-bold text-white mb-2">IoT Data Listing</h1>
          <p className="text-white/70 text-sm sm:text-base">Browse and download verified IoT datasets for your development projects</p>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="bg-loteraa-gray/20 rounded-lg border border-loteraa-gray/30 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                placeholder="Search datasets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-loteraa-gray/10 border-loteraa-gray/30 text-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-white/50 h-4 w-4" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-loteraa-gray/10 border-loteraa-gray/30 text-white">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-white/70 text-sm">
            Showing {filteredDatasets.length} of {verifiedDatasets.length} verified datasets
          </p>
        </div>

        {/* Datasets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatasets.map((dataset) => (
            <Card key={dataset.id} className="bg-loteraa-gray/20 border-loteraa-gray/30 hover:bg-loteraa-gray/30 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-medium text-white line-clamp-2">
                    {dataset.name}
                  </CardTitle>
                  <Badge className="bg-green-100 text-green-800 ml-2">
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-white/70 border-loteraa-gray/50">
                    {dataset.file_type}
                  </Badge>
                  <span className="text-white/50 text-xs">{Math.round(dataset.file_size / 1024)} KB</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <p className="text-white/70 text-sm line-clamp-3">
                      {dataset.description || 'No description available'}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/50">Added:</span>
                      <span className="text-white/70">{new Date(dataset.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/50">Downloads:</span>
                      <span className="text-white/70">{dataset.download_count || 0}</span>
                    </div>
                    {dataset.region && (
                      <div className="flex justify-between text-xs">
                        <span className="text-white/50">Region:</span>
                        <span className="text-white/70">{dataset.region}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(dataset)}
                      className="flex-1 bg-transparent border-loteraa-gray/50 text-white hover:bg-loteraa-gray/20"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDownload(dataset)}
                      className="flex-1 bg-black hover:bg-black/90 border border-white text-white"
                    >
                      <Download className="h-4 w-4 mr-1 text-white" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredDatasets.length === 0 && verifiedDatasets.length > 0 && (
          <div className="text-center py-12">
            <div className="text-white/50 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No datasets found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
          </div>
        )}

        {/* Dataset Details Modal */}
        {showDetailsModal && selectedDataset && (
          <DatasetDetailsModal
            dataset={selectedDataset}
            isOpen={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
            onDownload={() => handleDownload(selectedDataset)}
          />
        )}
      </div>
    </div>
  );
}
