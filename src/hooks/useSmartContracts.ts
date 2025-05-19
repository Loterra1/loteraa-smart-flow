
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { SmartContract } from '@/types/smartContract';

export const useSmartContracts = () => {
  const [contracts, setContracts] = useState<SmartContract[]>([
    {
      id: '1',
      name: 'Environmental Data Access',
      type: 'Access Control',
      status: 'Active',
      trigger: 'Automated',
      lastModified: 'May 15, 2025',
    },
    {
      id: '2',
      name: 'Payment Distribution',
      type: 'Financial',
      status: 'Active',
      trigger: 'Manual',
      lastModified: 'May 10, 2025',
    },
    {
      id: '3',
      name: 'Data Verification Contract',
      type: 'Validation',
      status: 'Active',
      trigger: 'Event-driven',
      lastModified: 'May 5, 2025',
    },
    {
      id: '4',
      name: 'Device Authorization',
      type: 'Security',
      status: 'Inactive',
      trigger: 'On-demand',
      lastModified: 'Apr 28, 2025',
    },
  ]);
  
  const [selectedContract, setSelectedContract] = useState<SmartContract | null>(null);
  const { toast } = useToast();

  const handleContractCreated = (newContract: SmartContract) => {
    setContracts([newContract, ...contracts]);
    toast({
      title: "Contract Created",
      description: "The smart contract has been successfully created.",
    });
  };

  const handleContractUpdated = (updatedContract: SmartContract) => {
    setContracts(contracts.map(c => c.id === updatedContract.id ? updatedContract : c));
    toast({
      title: "Contract Updated",
      description: "The smart contract has been successfully updated.",
    });
  };

  const handleContractDeleted = (contractId: string) => {
    setContracts(contracts.filter(c => c.id !== contractId));
    toast({
      title: "Contract Deleted",
      description: "The smart contract has been successfully deleted.",
    });
  };

  const handleSaveContractCode = (contract: SmartContract, code: string, abi: string) => {
    const updatedContract = { ...contract, code, abi };
    setContracts(contracts.map(c => c.id === contract.id ? updatedContract : c));
    toast({
      title: "Code Saved",
      description: "The contract code has been successfully saved.",
    });
  };

  return {
    contracts,
    selectedContract,
    setSelectedContract,
    handleContractCreated,
    handleContractUpdated,
    handleContractDeleted,
    handleSaveContractCode
  };
};
