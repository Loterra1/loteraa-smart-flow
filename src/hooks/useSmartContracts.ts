
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { SmartContract } from '@/types/smartContract';
import SmartContractService from '@/utils/smartContractUtils';
import { apiService } from '@/services/apiService';

export const useSmartContracts = () => {
  const [contracts, setContracts] = useState<SmartContract[]>([
    {
      id: '1',
      name: 'Environmental Data Access',
      type: 'Access Control',
      status: 'Active',
      trigger: 'Automated',
      lastModified: 'May 15, 2025',
      address: '0x7F4e7630f8742e7Db0606a55E3d45970E3F3dC25',
      code: SmartContractService.generateDefaultContractCode('EnvironmentalDataAccess'),
      abi: SmartContractService.generateDefaultABI()
    },
    {
      id: '2',
      name: 'Payment Distribution',
      type: 'Financial',
      status: 'Active',
      trigger: 'Manual',
      lastModified: 'May 10, 2025',
      address: '0x8e3f...4d5f',
      code: SmartContractService.generateDefaultContractCode('PaymentDistribution'),
      abi: SmartContractService.generateDefaultABI()
    },
    {
      id: '3',
      name: 'Data Verification Contract',
      type: 'Validation',
      status: 'Active',
      trigger: 'Event-driven',
      lastModified: 'May 5, 2025',
      address: '0x9a2c...7e8b',
      code: SmartContractService.generateDefaultContractCode('DataVerificationContract'),
      abi: SmartContractService.generateDefaultABI()
    },
    {
      id: '4',
      name: 'Device Authorization',
      type: 'Security',
      status: 'Inactive',
      trigger: 'On-demand',
      lastModified: 'Apr 28, 2025',
      address: '0x6b1d...9f3a',
      code: SmartContractService.generateDefaultContractCode('DeviceAuthorization'),
      abi: SmartContractService.generateDefaultABI()
    },
  ]);
  
  const [selectedContract, setSelectedContract] = useState<SmartContract | null>(null);
  const { toast } = useToast();

  const handleContractCreated = async (newContract: Omit<SmartContract, 'id' | 'address'>) => {
    try {
      // Generate contract code if not provided
      const contractCode = newContract.code || SmartContractService.generateDefaultContractCode(newContract.name);
      const contractAbi = newContract.abi || SmartContractService.generateDefaultABI();
      
      // Validate contract code
      const validation = SmartContractService.validateContractCode(contractCode);
      if (!validation.isValid) {
        toast({
          title: "Contract Validation Failed",
          description: validation.errors.join(', '),
          variant: "destructive"
        });
        return;
      }
      
      // Deploy contract (in real implementation, this would interact with blockchain)
      const contractAddress = await SmartContractService.deployContract(contractCode, contractAbi);
      
      const contractWithId: SmartContract = {
        ...newContract,
        id: Date.now().toString(),
        address: contractAddress,
        code: contractCode,
        abi: contractAbi,
        lastModified: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })
      };
      
      setContracts([contractWithId, ...contracts]);
      
      toast({
        title: "Contract Created & Deployed",
        description: `The smart contract has been successfully created and deployed at ${contractAddress}.`,
      });
    } catch (error) {
      toast({
        title: "Deployment Failed",
        description: "Failed to deploy the smart contract. Please try again.",
        variant: "destructive"
      });
    }
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
    // Validate the new contract code
    const validation = SmartContractService.validateContractCode(code);
    if (!validation.isValid) {
      toast({
        title: "Code Validation Failed",
        description: validation.errors.join(', '),
        variant: "destructive"
      });
      return;
    }

    const updatedContract = { ...contract, code, abi };
    setContracts(contracts.map(c => c.id === contract.id ? updatedContract : c));
    toast({
      title: "Code Saved",
      description: "The contract code has been successfully saved and validated.",
    });
  };

  const executeContractFunction = async (contractId: string, functionName: string, params: any[]) => {
    try {
      const contract = contracts.find(c => c.id === contractId);
      if (!contract || !contract.address) {
        throw new Error('Contract not found or not deployed');
      }

      const result = await SmartContractService.callContractFunction(
        contract.address,
        functionName,
        params
      );

      toast({
        title: "Function Executed",
        description: `Successfully executed ${functionName} on contract ${contract.name}`,
      });

      return result;
    } catch (error) {
      toast({
        title: "Execution Failed",
        description: `Failed to execute contract function: ${error}`,
        variant: "destructive"
      });
      throw error;
    }
  };

  return {
    contracts,
    selectedContract,
    setSelectedContract,
    handleContractCreated,
    handleContractUpdated,
    handleContractDeleted,
    handleSaveContractCode,
    executeContractFunction
  };
};
