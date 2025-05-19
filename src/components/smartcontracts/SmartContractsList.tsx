
import React from 'react';
import { Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { SmartContract } from '@/types/smartContract';

interface SmartContractsListProps {
  contracts: SmartContract[];
  onView: (contract: SmartContract) => void;
  onEdit: (contract: SmartContract) => void;
  onDelete: (contract: SmartContract) => void;
}

const SmartContractsList = ({ contracts, onView, onEdit, onDelete }: SmartContractsListProps) => {
  return (
    <div className="bg-loteraa-gray/20 rounded-lg border border-loteraa-gray/30 overflow-hidden mb-8">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-loteraa-gray/30 hover:bg-transparent">
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Type</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Trigger Used</TableHead>
              <TableHead className="text-white">Last Modified</TableHead>
              <TableHead className="text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract) => (
              <TableRow key={contract.id} className="border-loteraa-gray/30 hover:bg-loteraa-gray/10">
                <TableCell className="font-medium text-white">
                  {contract.name}
                </TableCell>
                <TableCell className="text-white/80">{contract.type}</TableCell>
                <TableCell>
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      contract.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {contract.status}
                  </span>
                </TableCell>
                <TableCell className="text-white/80">{contract.trigger}</TableCell>
                <TableCell className="text-white/80">{contract.lastModified}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-loteraa-purple/20"
                      onClick={() => onView(contract)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-loteraa-purple/20"
                      onClick={() => onEdit(contract)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-loteraa-purple/20"
                      onClick={() => onDelete(contract)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SmartContractsList;
