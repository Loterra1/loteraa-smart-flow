
export interface SmartContract {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Error';
  trigger: string;
  lastModified: string;
  address: string;
  code: string;
  abi: string;
}

export interface ContractFunction {
  name: string;
  inputs: ContractInput[];
  outputs: ContractOutput[];
  stateMutability: 'view' | 'pure' | 'nonpayable' | 'payable';
}

export interface ContractInput {
  name: string;
  type: string;
  internalType?: string;
}

export interface ContractOutput {
  name: string;
  type: string;
  internalType?: string;
}
