
export interface SmartContract {
  id: string;
  name: string;
  address?: string;
  abi?: string;
  description?: string;
  network?: string;
  status: "Active" | "Inactive";
  createdAt: string;
  lastInteraction?: string;
  type: string;
  trigger: string;
  lastModified?: string;
  code?: string;
  gasUsed?: number;
  methods?: Array<{
    name: string;
    type: string;
    inputs: Array<{
      name: string;
      type: string;
    }>;
  }>;
}

export interface ContractMethod {
  name: string;
  type: 'function' | 'event';
  inputs: ContractInput[];
  outputs?: ContractInput[];
  stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
}

export interface ContractInput {
  name: string;
  type: string;
  internalType?: string;
}
