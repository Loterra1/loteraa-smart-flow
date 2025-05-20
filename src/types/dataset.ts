
export interface Dataset {
  id: string;
  name: string;
  type: string;
  source: string;
  size: string;
  dateAdded: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  description?: string;
  region?: string;
  accessType?: 'Open Access' | 'Paid Access' | 'Restricted Use';
  accessPrice?: number;
  smartContract?: string;
  accessFee?: number;
  autoPayGas?: boolean;
  accessControl?: {
    requireAuth?: boolean;
    allowReuse?: boolean;
    onetimeAccess?: boolean;
    timeLockedAccess?: boolean;
  };
  verificationDetails?: {
    timeOfVerification?: string;
    dataHashMatch?: boolean;
    timestampMatch?: boolean;
    regionMatch?: boolean;
    paymentStatus?: 'Paid' | 'Pending' | 'Failed';
    paymentAmount?: number;
    walletAddress?: string;
    txHash?: string;
  };
  paymentReport?: {
    downloadUrl?: string;
    generatedAt?: string;
  };
}

export interface NewDatasetFormData {
  name: string;
  type: string;
  source: string;
  description: string;
  region?: string;
  autoAnalyze?: boolean;
  smartContract?: string;
  accessFee?: number;
  autoPayGas?: boolean;
  accessType: 'Open Access' | 'Paid Access' | 'Restricted Use';
  accessPrice?: number;
  accessControl?: {
    requireAuth: boolean;
    allowReuse: boolean;
    onetimeAccess: boolean;
    timeLockedAccess: boolean;
  };
}
