
// Application constants for frontend developers
export const APP_CONSTANTS = {
  // API endpoints
  API: {
    BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    ENDPOINTS: {
      DEVICES: '/devices',
      CONTRACTS: '/smart-contracts',
      DATASETS: '/datasets',
      NOTIFICATIONS: '/notifications',
      EARNINGS: '/earnings',
      AUTOMATION: '/automation'
    }
  },
  
  // UI Configuration
  UI: {
    ITEMS_PER_PAGE: 10,
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    SUPPORTED_FILE_TYPES: ['json', 'csv', 'txt'],
    TOAST_DURATION: 3000,
    REFRESH_INTERVAL: 30000 // 30 seconds
  },
  
  // Device types
  DEVICE_TYPES: [
    'Temperature',
    'Humidity',
    'Motion',
    'Light',
    'Pressure',
    'Air Quality',
    'Sound',
    'Custom'
  ] as const,
  
  // Contract types
  CONTRACT_TYPES: [
    'Access Control',
    'Financial',
    'Validation',
    'Security',
    'Data Processing',
    'Custom'
  ] as const,
  
  // Status options
  STATUS_OPTIONS: [
    'Active',
    'Inactive',
    'Pending',
    'Error'
  ] as const,
  
  // Automation trigger types
  TRIGGER_TYPES: [
    'Automated',
    'Manual',
    'Event-driven',
    'On-demand',
    'Scheduled'
  ] as const,
  
  // Currency configuration
  CURRENCY: {
    SYMBOL: '$TERRA',
    DECIMALS: 2,
    FORMAT: 'en-US'
  },
  
  // Routes for navigation
  ROUTES: {
    DASHBOARD: '/dashboard',
    DEVICES: '/devices',
    SMART_CONTRACTS: '/smart-contracts',
    DATASET_ENTRY: '/dataset-entry',
    DATA_LISTING: '/data-listing',
    EARNINGS: '/earnings',
    AUTOMATION: '/automation',
    NOTIFICATIONS: '/notifications',
    PROFILE: '/profile',
    STAKE: '/stake'
  }
} as const;

// Type definitions for frontend developers
export type DeviceType = typeof APP_CONSTANTS.DEVICE_TYPES[number];
export type ContractType = typeof APP_CONSTANTS.CONTRACT_TYPES[number];
export type StatusType = typeof APP_CONSTANTS.STATUS_OPTIONS[number];
export type TriggerType = typeof APP_CONSTANTS.TRIGGER_TYPES[number];

export default APP_CONSTANTS;
