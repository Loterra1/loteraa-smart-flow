
export interface SmartContract {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Inactive';
  trigger: string;
  lastModified: string;
  file?: File;
  code?: string;
  abi?: string;
}
