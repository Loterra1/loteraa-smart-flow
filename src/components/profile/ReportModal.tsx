import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Image, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: ReportFormData) => void;
}

export interface ReportFormData {
  reportType: string;
  description: string;
  screenshots: File[];
  userId?: string;
}

const REPORT_TYPES = [
  'Bug Report',
  'Feature Request',
  'Payment Issue',
  'Performance Issue',
  'Other'
];

export default function ReportModal({ isOpen, onClose, onSubmit }: ReportModalProps) {
  const [reportType, setReportType] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    const validFiles = files.filter(file => {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file`,
          variant: "destructive",
        });
        return false;
      }
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 5MB`,
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    });

    setScreenshots(prev => [...prev, ...validFiles]);
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeScreenshot = (index: number) => {
    setScreenshots(prev => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setReportType('');
    setReportDescription('');
    setScreenshots([]);
    setIsSubmitting(false);
  };

  const handleReportSubmit = async () => {
    // Validation
    if (!reportType) {
      toast({
        title: "Missing report type",
        description: "Please select a report type",
        variant: "destructive",
      });
      return;
    }

    if (!reportDescription.trim() || reportDescription.trim().length < 10) {
      toast({
        title: "Description too short",
        description: "Please provide at least 10 characters in the description",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData: ReportFormData = {
        reportType,
        description: reportDescription.trim(),
        screenshots,
        userId: user?.id,
      };

      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // TODO: Replace with actual backend endpoint
        // const backendFormData = new FormData();
        // backendFormData.append('reportType', reportType);
        // backendFormData.append('description', reportDescription.trim());
        // backendFormData.append('userId', user?.id || '');
        // screenshots.forEach((file, index) => {
        //   backendFormData.append(`screenshots`, file);
        // });
        
        // const response = await fetch('YOUR_BACKEND_ENDPOINT', {
        //   method: 'POST',
        //   body: backendFormData,
        // });
        
        // if (!response.ok) {
        //   throw new Error('Failed to submit report');
        // }
        
        // Simulate API call for now
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      toast({
        title: "Report submitted successfully",
        description: "Thank you for your feedback. We'll review it shortly.",
      });

      resetForm();
      onClose();
    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Failed to submit report",
        description: "Please try again later or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-loteraa-black border-loteraa-gray/30">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-semibold">
            Submit Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Report Type Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Report Type *</label>
            <Select value={reportType} onValueChange={setReportType} disabled={isSubmitting}>
              <SelectTrigger className="w-full bg-loteraa-gray/20 border-loteraa-gray/30 text-white">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent className="bg-loteraa-black border-loteraa-gray/30">
                {REPORT_TYPES.map((type) => (
                  <SelectItem 
                    key={type} 
                    value={type}
                    className="text-white hover:bg-loteraa-gray/20 focus:bg-loteraa-gray/20"
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Screenshots Upload */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-white">Screenshots (Optional)</label>
            
            <div className="border-2 border-dashed border-loteraa-gray/30 rounded-lg p-6 text-center hover:border-loteraa-gray/50 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isSubmitting}
              />
              <Upload className="w-8 h-8 text-loteraa-gray mx-auto mb-2" />
              <p className="text-sm text-loteraa-gray mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-loteraa-gray/70 mb-3">
                PNG, JPG, GIF up to 5MB each
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSubmitting}
                className="border-loteraa-gray/30 text-white hover:bg-loteraa-gray/20"
              >
                Choose Files
              </Button>
            </div>

            {/* Screenshot Previews */}
            {screenshots.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {screenshots.map((file, index) => (
                  <Card key={index} className="relative bg-loteraa-gray/10 border-loteraa-gray/30">
                    <CardContent className="p-3">
                      <div className="relative">
                        <div className="aspect-square bg-loteraa-gray/20 rounded-md flex items-center justify-center">
                          <Image className="w-8 h-8 text-loteraa-gray" />
                        </div>
                        <button
                          onClick={() => removeScreenshot(index)}
                          disabled={isSubmitting}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                      <p className="text-xs text-loteraa-gray mt-2 truncate">{file.name}</p>
                      <p className="text-xs text-loteraa-gray/70">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Description *</label>
            <Textarea
              placeholder="Please provide detailed information about your issue or feedback..."
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              disabled={isSubmitting}
              className="min-h-[120px] bg-loteraa-gray/20 border-loteraa-gray/30 text-white placeholder:text-loteraa-gray/70 resize-none"
              maxLength={1000}
            />
            <div className="flex justify-between text-xs">
              <span className="text-loteraa-gray/70">Minimum 10 characters</span>
              <span className={`${
                reportDescription.length > 950 ? 'text-red-400' : 'text-loteraa-gray/70'
              }`}>
                {reportDescription.length}/1000
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 border-loteraa-gray/30 text-white hover:bg-loteraa-gray/20"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReportSubmit}
              disabled={isSubmitting || !reportType || reportDescription.length < 10}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Report'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}