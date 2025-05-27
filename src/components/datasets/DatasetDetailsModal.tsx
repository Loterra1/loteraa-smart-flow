
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Calendar, MapPin, Database, User, Shield, DollarSign } from "lucide-react";
import { Dataset } from '@/types/dataset';

interface DatasetDetailsModalProps {
  dataset: Dataset;
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export default function DatasetDetailsModal({ dataset, isOpen, onClose, onDownload }: DatasetDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-loteraa-gray/90 border border-loteraa-gray/40 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-white flex items-center gap-2">
            <Database className="h-5 w-5" />
            {dataset.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status and Type */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                {dataset.status}
              </Badge>
              <Badge variant="outline" className="text-white/70 border-loteraa-gray/50">
                {dataset.type}
              </Badge>
            </div>
            <span className="text-white/70 text-sm">{dataset.size}</span>
          </div>

          {/* Description */}
          {dataset.description && (
            <div>
              <h4 className="text-sm font-medium text-white/80 mb-2">Description</h4>
              <p className="text-white/70 text-sm">{dataset.description}</p>
            </div>
          )}

          <Separator className="bg-loteraa-gray/30" />

          {/* Dataset Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-white/50" />
                <div>
                  <span className="text-white/50 text-xs">Source</span>
                  <p className="text-white text-sm">{dataset.source}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-white/50" />
                <div>
                  <span className="text-white/50 text-xs">Date Added</span>
                  <p className="text-white text-sm">{dataset.dateAdded}</p>
                </div>
              </div>

              {dataset.region && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-white/50" />
                  <div>
                    <span className="text-white/50 text-xs">Region</span>
                    <p className="text-white text-sm">{dataset.region}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {dataset.accessType && (
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-white/50" />
                  <div>
                    <span className="text-white/50 text-xs">Access Type</span>
                    <p className="text-white text-sm">{dataset.accessType}</p>
                  </div>
                </div>
              )}

              {dataset.accessPrice && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-white/50" />
                  <div>
                    <span className="text-white/50 text-xs">Access Price</span>
                    <p className="text-white text-sm">${dataset.accessPrice} Terra</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Verification Details */}
          {dataset.verificationDetails && (
            <>
              <Separator className="bg-loteraa-gray/30" />
              <div>
                <h4 className="text-sm font-medium text-white/80 mb-3">Verification Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-loteraa-gray/30 p-3 rounded-md">
                    <span className="text-white/50">Verification Time</span>
                    <p className="text-white">{dataset.verificationDetails.timeOfVerification}</p>
                  </div>
                  <div className="bg-loteraa-gray/30 p-3 rounded-md">
                    <span className="text-white/50">Payment Status</span>
                    <p className="text-green-400">{dataset.verificationDetails.paymentStatus}</p>
                  </div>
                  <div className="bg-loteraa-gray/30 p-3 rounded-md">
                    <span className="text-white/50">Data Hash Match</span>
                    <p className="text-green-400">{dataset.verificationDetails.dataHashMatch ? 'Verified' : 'Failed'}</p>
                  </div>
                  <div className="bg-loteraa-gray/30 p-3 rounded-md">
                    <span className="text-white/50">Region Match</span>
                    <p className="text-green-400">{dataset.verificationDetails.regionMatch ? 'Verified' : 'Failed'}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Access Control */}
          {dataset.accessControl && (
            <>
              <Separator className="bg-loteraa-gray/30" />
              <div>
                <h4 className="text-sm font-medium text-white/80 mb-3">Access Control</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Requires Auth</span>
                    <span className="text-white">{dataset.accessControl.requireAuth ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Allow Reuse</span>
                    <span className="text-white">{dataset.accessControl.allowReuse ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">One-time Access</span>
                    <span className="text-white">{dataset.accessControl.onetimeAccess ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Time Locked</span>
                    <span className="text-white">{dataset.accessControl.timeLockedAccess ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-transparent border-loteraa-gray/50 text-white hover:bg-loteraa-gray/20"
            >
              Close
            </Button>
            <Button
              onClick={onDownload}
              className="bg-loteraa-purple hover:bg-loteraa-purple/90"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Dataset
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
