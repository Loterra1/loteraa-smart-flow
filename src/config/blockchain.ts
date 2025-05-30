
// Blockchain configuration for smart contract developers
export const BLOCKCHAIN_CONFIG = {
  // Network configurations
  networks: {
    development: {
      name: 'Local Development',
      chainId: 1337,
      rpcUrl: 'http://localhost:8545',
      blockExplorer: 'http://localhost:8080'
    },
    testnet: {
      name: 'Ethereum Testnet',
      chainId: 11155111, // Sepolia
      rpcUrl: 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY',
      blockExplorer: 'https://sepolia.etherscan.io'
    },
    mainnet: {
      name: 'Ethereum Mainnet',
      chainId: 1,
      rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
      blockExplorer: 'https://etherscan.io'
    }
  },
  
  // Contract deployment settings
  deployment: {
    gasLimit: 5000000,
    gasPrice: '20000000000', // 20 gwei
    confirmations: 2
  },
  
  // Default contract templates
  contractTemplates: {
    iotDataLogger: 'IoTDataLogger',
    accessControl: 'AccessControlContract',
    paymentDistribution: 'PaymentDistribution'
  }
};

// Environment-specific settings
export const getNetworkConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return BLOCKCHAIN_CONFIG.networks[env as keyof typeof BLOCKCHAIN_CONFIG.networks] || BLOCKCHAIN_CONFIG.networks.development;
};

export default BLOCKCHAIN_CONFIG;
