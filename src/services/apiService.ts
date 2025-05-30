
import APP_CONSTANTS from '@/constants/app';

// Base API service for frontend developers
class APIService {
  private baseURL: string;
  
  constructor() {
    this.baseURL = APP_CONSTANTS.API.BASE_URL;
  }
  
  // Generic HTTP methods
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      throw error;
    }
  }
  
  // Device API methods
  async getDevices() {
    return this.request(APP_CONSTANTS.API.ENDPOINTS.DEVICES);
  }
  
  async getDevice(deviceId: string) {
    return this.request(`${APP_CONSTANTS.API.ENDPOINTS.DEVICES}/${deviceId}`);
  }
  
  async createDevice(deviceData: any) {
    return this.request(APP_CONSTANTS.API.ENDPOINTS.DEVICES, {
      method: 'POST',
      body: JSON.stringify(deviceData),
    });
  }
  
  async updateDevice(deviceId: string, deviceData: any) {
    return this.request(`${APP_CONSTANTS.API.ENDPOINTS.DEVICES}/${deviceId}`, {
      method: 'PUT',
      body: JSON.stringify(deviceData),
    });
  }
  
  async deleteDevice(deviceId: string) {
    return this.request(`${APP_CONSTANTS.API.ENDPOINTS.DEVICES}/${deviceId}`, {
      method: 'DELETE',
    });
  }
  
  // Smart Contract API methods
  async getContracts() {
    return this.request(APP_CONSTANTS.API.ENDPOINTS.CONTRACTS);
  }
  
  async getContract(contractId: string) {
    return this.request(`${APP_CONSTANTS.API.ENDPOINTS.CONTRACTS}/${contractId}`);
  }
  
  async deployContract(contractData: any) {
    return this.request(`${APP_CONSTANTS.API.ENDPOINTS.CONTRACTS}/deploy`, {
      method: 'POST',
      body: JSON.stringify(contractData),
    });
  }
  
  async executeContractFunction(contractId: string, functionData: any) {
    return this.request(`${APP_CONSTANTS.API.ENDPOINTS.CONTRACTS}/${contractId}/execute`, {
      method: 'POST',
      body: JSON.stringify(functionData),
    });
  }
  
  // Dataset API methods
  async getDatasets() {
    return this.request(APP_CONSTANTS.API.ENDPOINTS.DATASETS);
  }
  
  async submitDataset(datasetData: any) {
    return this.request(APP_CONSTANTS.API.ENDPOINTS.DATASETS, {
      method: 'POST',
      body: JSON.stringify(datasetData),
    });
  }
  
  // Notification API methods
  async getNotifications() {
    return this.request(APP_CONSTANTS.API.ENDPOINTS.NOTIFICATIONS);
  }
  
  async markNotificationAsRead(notificationId: string) {
    return this.request(`${APP_CONSTANTS.API.ENDPOINTS.NOTIFICATIONS}/${notificationId}/read`, {
      method: 'PATCH',
    });
  }
  
  // Earnings API methods
  async getEarnings() {
    return this.request(APP_CONSTANTS.API.ENDPOINTS.EARNINGS);
  }
  
  async getEarningsBreakdown(timeframe: string) {
    return this.request(`${APP_CONSTANTS.API.ENDPOINTS.EARNINGS}/breakdown?timeframe=${timeframe}`);
  }
  
  // Automation API methods
  async getAutomations() {
    return this.request(APP_CONSTANTS.API.ENDPOINTS.AUTOMATION);
  }
  
  async createAutomation(automationData: any) {
    return this.request(APP_CONSTANTS.API.ENDPOINTS.AUTOMATION, {
      method: 'POST',
      body: JSON.stringify(automationData),
    });
  }
  
  async toggleAutomation(automationId: string, enabled: boolean) {
    return this.request(`${APP_CONSTANTS.API.ENDPOINTS.AUTOMATION}/${automationId}/toggle`, {
      method: 'PATCH',
      body: JSON.stringify({ enabled }),
    });
  }
}

export const apiService = new APIService();
export default apiService;
