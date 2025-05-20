
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function DatasetGuidelines() {
  return (
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
  );
}
