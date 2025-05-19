
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Download, Upload, AlertCircle } from "lucide-react";
import DashboardNavbar from '@/components/DashboardNavbar';
import { useToast } from "@/hooks/use-toast";

interface Dataset {
  id: string;
  name: string;
  type: string;
  source: string;
  size: string;
  dateAdded: string;
  status: 'Verified' | 'Pending' | 'Rejected';
}

export default function DatasetEntryPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([
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
  
  const [isAddingDataset, setIsAddingDataset] = useState(false);
  const [newDataset, setNewDataset] = useState({
    name: '',
    type: '',
    source: '',
    description: ''
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new dataset entry
    const dataset: Dataset = {
      id: Math.random().toString(36).substr(2, 9),
      name: newDataset.name,
      type: newDataset.type,
      source: newDataset.source,
      size: 'Calculating...',
      dateAdded: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      status: 'Pending'
    };
    
    setDatasets([dataset, ...datasets]);
    setIsAddingDataset(false);
    setNewDataset({ name: '', type: '', source: '', description: '' });
    
    toast({
      title: "Dataset submitted",
      description: "Your dataset has been submitted for verification.",
    });
  };

  return (
    <div className="min-h-screen bg-loteraa-black">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Dataset Entry</h1>
            <p className="text-white/70">Submit and manage your datasets for research and development</p>
          </div>
          <Button 
            className="bg-loteraa-purple hover:bg-loteraa-purple/90"
            onClick={() => setIsAddingDataset(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Dataset
          </Button>
        </div>
        
        {isAddingDataset ? (
          <Card className="bg-loteraa-gray/20 border-loteraa-gray/30 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Submit New Dataset</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="name">Dataset Name</label>
                  <Input 
                    id="name" 
                    value={newDataset.name}
                    onChange={(e) => setNewDataset({...newDataset, name: e.target.value})}
                    placeholder="Enter dataset name" 
                    required
                    className="bg-loteraa-gray/10 border-loteraa-gray/30 text-white"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-white/70" htmlFor="type">Dataset Type</label>
                    <Select onValueChange={(value) => setNewDataset({...newDataset, type: value})}>
                      <SelectTrigger className="bg-loteraa-gray/10 border-loteraa-gray/30 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IoT Readings">IoT Readings</SelectItem>
                        <SelectItem value="Environmental Data">Environmental Data</SelectItem>
                        <SelectItem value="Smart Grid">Smart Grid</SelectItem>
                        <SelectItem value="Vehicle Movement">Vehicle Movement</SelectItem>
                        <SelectItem value="Atmospheric Sensors">Atmospheric Sensors</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-white/70" htmlFor="source">Data Source</label>
                    <Input 
                      id="source" 
                      value={newDataset.source}
                      onChange={(e) => setNewDataset({...newDataset, source: e.target.value})}
                      placeholder="Enter data source" 
                      className="bg-loteraa-gray/10 border-loteraa-gray/30 text-white"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="description">Description</label>
                  <Textarea 
                    id="description" 
                    value={newDataset.description}
                    onChange={(e) => setNewDataset({...newDataset, description: e.target.value})}
                    placeholder="Describe your dataset" 
                    rows={4}
                    className="bg-loteraa-gray/10 border-loteraa-gray/30 text-white resize-none"
                  />
                </div>
                
                <div className="border border-dashed border-loteraa-gray/40 rounded-lg p-6">
                  <div className="flex flex-col items-center justify-center text-center">
                    <Upload className="h-10 w-10 text-white/50 mb-2" />
                    <h3 className="text-white text-lg font-medium mb-1">Upload Dataset Files</h3>
                    <p className="text-white/70 text-sm mb-4">Drag and drop files here or click to browse</p>
                    <Button 
                      type="button"
                      variant="outline" 
                      className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                    >
                      Select Files
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-end gap-4 pt-2">
                  <Button 
                    type="button"
                    variant="outline" 
                    className="bg-transparent border-loteraa-gray/50 text-white hover:bg-loteraa-gray/20"
                    onClick={() => setIsAddingDataset(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-loteraa-purple hover:bg-loteraa-purple/90"
                  >
                    Submit Dataset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : null}
        
        <div className="bg-loteraa-gray/20 rounded-lg border border-loteraa-gray/30 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-loteraa-gray/30 hover:bg-transparent">
                  <TableHead className="text-white">Dataset Name</TableHead>
                  <TableHead className="text-white">Type</TableHead>
                  <TableHead className="text-white">Source</TableHead>
                  <TableHead className="text-white">Size</TableHead>
                  <TableHead className="text-white">Date Added</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datasets.map((dataset) => (
                  <TableRow key={dataset.id} className="border-loteraa-gray/30 hover:bg-loteraa-gray/10">
                    <TableCell className="font-medium text-white">
                      {dataset.name}
                    </TableCell>
                    <TableCell className="text-white/80">{dataset.type}</TableCell>
                    <TableCell className="text-white/80">{dataset.source}</TableCell>
                    <TableCell className="text-white/80">{dataset.size}</TableCell>
                    <TableCell className="text-white/80">{dataset.dateAdded}</TableCell>
                    <TableCell>
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          dataset.status === 'Verified' 
                            ? 'bg-green-100 text-green-800' 
                            : dataset.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {dataset.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-white">Dataset Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-white/80">
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-loteraa-purple flex-shrink-0" />
                  <span>Ensure data is anonymized and free of personal information</span>
                </li>
                <li className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-loteraa-purple flex-shrink-0" />
                  <span>Document data collection methodology</span>
                </li>
                <li className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-loteraa-purple flex-shrink-0" />
                  <span>Include metadata descriptions for all fields</span>
                </li>
                <li className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-loteraa-purple flex-shrink-0" />
                  <span>Verify data integrity before submission</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-white">Rewards & Credits</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-white/80">
              <p className="mb-4">Earn tokens by contributing valuable datasets to our research pool.</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Your contributions:</span>
                  <span className="text-white font-semibold">4 datasets</span>
                </div>
                <div className="flex justify-between">
                  <span>Data used in research:</span>
                  <span className="text-white font-semibold">2 datasets</span>
                </div>
                <div className="flex justify-between">
                  <span>Total earnings:</span>
                  <span className="text-white font-semibold">250 LOT</span>
                </div>
                <Button className="w-full mt-2 bg-loteraa-purple hover:bg-loteraa-purple/90">
                  View Earnings Details
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-white">Download Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/80 mb-4">
                Download standard templates for common dataset types to ensure your data is compatible with our systems.
              </p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full bg-transparent border-loteraa-purple/30 text-white hover:bg-loteraa-purple/10 justify-start"
                >
                  <Download className="mr-2 h-4 w-4" />
                  IoT Sensor Template
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full bg-transparent border-loteraa-purple/30 text-white hover:bg-loteraa-purple/10 justify-start"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Environmental Data Template
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full bg-transparent border-loteraa-purple/30 text-white hover:bg-loteraa-purple/10 justify-start"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Smart Grid Data Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
