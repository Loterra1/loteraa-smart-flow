
export interface SmartContract {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Inactive" | "Pending" | "Error";
  address?: string;
  abi?: string;
  network: string;
  createdAt: string;
  lastInteraction: string;
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
