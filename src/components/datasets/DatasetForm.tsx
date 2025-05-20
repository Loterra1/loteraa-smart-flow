
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { NewDatasetFormData } from '@/types/dataset';
import { SmartContract } from '@/types/smartContract';

interface DatasetFormProps {
  onSubmit: (formData: NewDatasetFormData) => void;
  onCancel: () => void;
  availableContracts: SmartContract[];
}

export default function DatasetForm({ onSubmit, onCancel, availableContracts }: DatasetFormProps) {
  const [formData, setFormData] = useState<NewDatasetFormData>({
    name: '',
    type: '',
    source: '',
    description: '',
    region: '',
    autoAnalyze: false,
    autoPayGas: false,
    accessType: 'Open Access',
    accessControl: {
      requireAuth: false,
      allowReuse: false,
      onetimeAccess: false,
      timeLockedAccess: false
    }
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAccessControlChange = (field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      accessControl: {
        ...prev.accessControl!,
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
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
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter dataset name" 
              required
              className="bg-loteraa-gray/10 border-loteraa-gray/30 text-white"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-white/70" htmlFor="type">Dataset Type</label>
              <Select onValueChange={(value) => handleChange('type', value)}>
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
                value={formData.source}
                onChange={(e) => handleChange('source', e.target.value)}
                placeholder="Enter data source" 
                className="bg-loteraa-gray/10 border-loteraa-gray/30 text-white"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-white/70" htmlFor="description">Description</label>
            <Textarea 
              id="description" 
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
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

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="autoAnalyze" 
              checked={formData.autoAnalyze}
              onCheckedChange={(checked) => handleChange('autoAnalyze', checked)}
            />
            <label
              htmlFor="autoAnalyze"
              className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Auto-analyze & extract structure from file
            </label>
          </div>

          <div className="pt-4 border-t border-loteraa-gray/30">
            <h3 className="text-white text-lg font-medium mb-4">Step 2: Bind to Smart Contract</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-white/70">Select Verification Smart Contract</label>
                <Select onValueChange={(value) => handleChange('smartContract', value)}>
                  <SelectTrigger className="bg-loteraa-gray/10 border-loteraa-gray/30 text-white">
                    <SelectValue placeholder="Available Smart Contracts by type" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableContracts.map(contract => (
                      <SelectItem key={contract.id} value={contract.id}>{contract.name} ({contract.type})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-white/70" htmlFor="accessFee">
                  Set Access Fee per Query (in $Terra)
                </label>
                <Input 
                  id="accessFee" 
                  type="number"
                  value={formData.accessFee || ''}
                  onChange={(e) => handleChange('accessFee', parseFloat(e.target.value))}
                  placeholder="0.00" 
                  className="bg-loteraa-gray/10 border-loteraa-gray/30 text-white"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="autoPayGas" 
                  checked={formData.autoPayGas}
                  onCheckedChange={(checked) => handleChange('autoPayGas', checked)}
                />
                <label
                  htmlFor="autoPayGas"
                  className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Auto-pay gas from Reward balance
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/70" htmlFor="region">Location</label>
            <Input 
              id="region" 
              value={formData.region || ''}
              onChange={(e) => handleChange('region', e.target.value)}
              placeholder="Enter region/city" 
              className="bg-loteraa-gray/10 border-loteraa-gray/30 text-white"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm text-white/70">Licensing & Usage Rights</label>
            <RadioGroup 
              defaultValue="open" 
              value={formData.accessType === 'Open Access' ? 'open' : formData.accessType === 'Paid Access' ? 'paid' : 'restricted'}
              onValueChange={(value) => {
                const accessType = value === 'open' ? 'Open Access' : value === 'paid' ? 'Paid Access' : 'Restricted Use';
                handleChange('accessType', accessType);
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="open" id="open" />
                <Label htmlFor="open" className="text-white">Open Access</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paid" id="paid" />
                <Label htmlFor="paid" className="text-white">Paid Access</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="restricted" id="restricted" />
                <Label htmlFor="restricted" className="text-white">Restricted Use</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.accessType === 'Paid Access' && (
            <div className="space-y-2">
              <label className="text-sm text-white/70" htmlFor="accessPrice">
                Access Price per Request (in $Terra)
              </label>
              <Input 
                id="accessPrice" 
                type="number"
                value={formData.accessPrice || ''}
                onChange={(e) => handleChange('accessPrice', parseFloat(e.target.value))}
                placeholder="0.00" 
                className="bg-loteraa-gray/10 border-loteraa-gray/30 text-white"
              />
            </div>
          )}

          <div className="space-y-3">
            <label className="text-sm text-white/70">Access Control Settings</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="requireAuth" 
                  checked={formData.accessControl?.requireAuth}
                  onCheckedChange={(checked) => handleAccessControlChange('requireAuth', checked as boolean)}
                />
                <label
                  htmlFor="requireAuth"
                  className="text-sm leading-none text-white"
                >
                  Require authentication to access
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="allowReuse" 
                  checked={formData.accessControl?.allowReuse}
                  onCheckedChange={(checked) => handleAccessControlChange('allowReuse', checked as boolean)}
                />
                <label
                  htmlFor="allowReuse"
                  className="text-sm leading-none text-white"
                >
                  Allow developer reuse
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="onetimeAccess" 
                  checked={formData.accessControl?.onetimeAccess}
                  onCheckedChange={(checked) => handleAccessControlChange('onetimeAccess', checked as boolean)}
                />
                <label
                  htmlFor="onetimeAccess"
                  className="text-sm leading-none text-white"
                >
                  Onetime access per user
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="timeLockedAccess" 
                  checked={formData.accessControl?.timeLockedAccess}
                  onCheckedChange={(checked) => handleAccessControlChange('timeLockedAccess', checked as boolean)}
                />
                <label
                  htmlFor="timeLockedAccess"
                  className="text-sm leading-none text-white"
                >
                  Enable time locked access
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-2">
            <Button 
              type="button"
              variant="outline" 
              className="bg-transparent border-loteraa-gray/50 text-white hover:bg-loteraa-gray/20"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              type="button"
              variant="outline" 
              className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
            >
              View Data Preview
            </Button>
            <Button 
              type="button"
              variant="outline" 
              className="bg-transparent border-loteraa-gray/50 text-white hover:bg-loteraa-gray/20"
            >
              Save as Draft
            </Button>
            <Button 
              type="submit"
              className="bg-loteraa-purple hover:bg-loteraa-purple/90"
            >
              Publish Dataset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
