
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Eye, Filter } from "lucide-react";
import DashboardNavbar from '@/components/DashboardNavbar';
import DatasetDetailsModal from '@/components/datasets/DatasetDetailsModal';
import { useDatasets } from '@/hooks/useDatasets';

export default function DataListingPage() {
  const { datasets } = useDatasets();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Filter datasets to only show verified ones
  const verifiedDatasets = datasets.filter(dataset => dataset.status === 'Verified');

  // Filter datasets based on search and category
  const filteredDatasets = verifiedDatasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.source.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || dataset.type === selectedCategory;
    
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

  const categories = ['all', ...Array.from(new Set(verifiedDatasets.map(d => d.type)))];

  return (
    <div className="min-h-screen bg-loteraa-black">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-3xl font-bold gradient-text mb-2">IoT Data Listing</h1>
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
                    {dataset.type}
                  </Badge>
                  <span className="text-white/50 text-xs">{dataset.size}</span>
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
                      <span className="text-white/50">Source:</span>
                      <span className="text-white/70">{dataset.source}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/50">Added:</span>
                      <span className="text-white/70">{dataset.dateAdded}</span>
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
                      className="flex-1 bg-loteraa-purple hover:bg-loteraa-purple/90"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredDatasets.length === 0 && (
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
