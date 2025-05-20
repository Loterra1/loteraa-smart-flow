
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dataset } from '@/types/dataset';

interface DatasetsListProps {
  datasets: Dataset[];
}

export default function DatasetsList({ datasets }: DatasetsListProps) {
  return (
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
  );
}
