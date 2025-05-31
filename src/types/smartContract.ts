
export interface SmartContract {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Inactive" | "Pending" | "Error";
  address?: string;
  abi?: string;
  code?: string;
  network: string;
  createdAt: string;
  lastInteraction: string;
  lastModified?: string;
  gasUsed?: number;
  type: string;
  trigger?: string;
  methods?: Array<{
    name: string;
    type: string;
    inputs: Array<{
      name: string;
      type: string;
    }>;
  }>;
}
