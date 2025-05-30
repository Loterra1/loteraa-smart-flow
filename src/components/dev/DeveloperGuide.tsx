
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Code, FileText, Zap, Database } from "lucide-react";

const DeveloperGuide = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-4">Developer Integration Guide</h1>
        <p className="text-white/70 text-lg">
          Complete guide for frontend developers and smart contract developers to integrate with our platform
        </p>
      </div>

      <Tabs defaultValue="frontend" className="w-full">
        <TabsList className="bg-loteraa-gray/20 border-loteraa-gray/30 grid grid-cols-4">
          <TabsTrigger value="frontend" className="data-[state=active]:text-loteraa-purple">Frontend</TabsTrigger>
          <TabsTrigger value="contracts" className="data-[state=active]:text-loteraa-purple">Smart Contracts</TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:text-loteraa-purple">API Reference</TabsTrigger>
          <TabsTrigger value="examples" className="data-[state=active]:text-loteraa-purple">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="frontend" className="space-y-6">
          <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Code className="mr-2 h-5 w-5" />
                Frontend Development Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Getting Started</h3>
                <pre className="bg-loteraa-gray/30 p-4 rounded-md text-sm overflow-x-auto">
{`// Import application constants
import APP_CONSTANTS from '@/constants/app';

// Import API service
import { apiService } from '@/services/apiService';

// Import smart contract utilities
import SmartContractService from '@/utils/smartContractUtils';

// Example: Fetch devices
const devices = await apiService.getDevices();

// Example: Deploy a contract
const contractAddress = await SmartContractService.deployContract(
  contractCode, 
  contractABI
);`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Available Constants</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Device Types: {`APP_CONSTANTS.DEVICE_TYPES`}</li>
                  <li>Contract Types: {`APP_CONSTANTS.CONTRACT_TYPES`}</li>
                  <li>Status Options: {`APP_CONSTANTS.STATUS_OPTIONS`}</li>
                  <li>API Endpoints: {`APP_CONSTANTS.API.ENDPOINTS`}</li>
                  <li>Routes: {`APP_CONSTANTS.ROUTES`}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-6">
          <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Smart Contract Development
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Contract Templates</h3>
                <pre className="bg-loteraa-gray/30 p-4 rounded-md text-sm overflow-x-auto">
{`// Generate a new contract template
const contractCode = SmartContractService.generateDefaultContractCode('MyContract');

// Validate contract code
const validation = SmartContractService.validateContractCode(contractCode);
if (!validation.isValid) {
  console.error('Validation errors:', validation.errors);
}

// Deploy contract
const address = await SmartContractService.deployContract(contractCode, abi);

// Call contract function
const result = await SmartContractService.callContractFunction(
  contractAddress,
  'logSensorData',
  ['sensor-1', '25.5']
);`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Network Configuration</h3>
                <pre className="bg-loteraa-gray/30 p-4 rounded-md text-sm overflow-x-auto">
{`import BLOCKCHAIN_CONFIG from '@/config/blockchain';

// Get current network configuration
const networkConfig = getNetworkConfig();
console.log('Current network:', networkConfig.name);
console.log('Chain ID:', networkConfig.chainId);
console.log('RPC URL:', networkConfig.rpcUrl);`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Database className="mr-2 h-5 w-5" />
                API Reference
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Device Management</h3>
                <div className="space-y-2 text-sm">
                  <div><code className="bg-loteraa-gray/30 px-2 py-1 rounded">GET /api/devices</code> - List all devices</div>
                  <div><code className="bg-loteraa-gray/30 px-2 py-1 rounded">GET /api/devices/:id</code> - Get device details</div>
                  <div><code className="bg-loteraa-gray/30 px-2 py-1 rounded">POST /api/devices</code> - Create new device</div>
                  <div><code className="bg-loteraa-gray/30 px-2 py-1 rounded">PUT /api/devices/:id</code> - Update device</div>
                  <div><code className="bg-loteraa-gray/30 px-2 py-1 rounded">DELETE /api/devices/:id</code> - Delete device</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Smart Contract Management</h3>
                <div className="space-y-2 text-sm">
                  <div><code className="bg-loteraa-gray/30 px-2 py-1 rounded">GET /api/smart-contracts</code> - List all contracts</div>
                  <div><code className="bg-loteraa-gray/30 px-2 py-1 rounded">POST /api/smart-contracts/deploy</code> - Deploy contract</div>
                  <div><code className="bg-loteraa-gray/30 px-2 py-1 rounded">POST /api/smart-contracts/:id/execute</code> - Execute function</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Code Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Frontend Component Example</h3>
                <pre className="bg-loteraa-gray/30 p-4 rounded-md text-sm overflow-x-auto">
{`import { useState, useEffect } from 'react';
import { apiService } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await apiService.getDevices();
        setDevices(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch devices",
          variant: "destructive"
        });
      }
    };

    fetchDevices();
  }, []);

  return (
    <div>
      {devices.map(device => (
        <div key={device.id}>{device.name}</div>
      ))}
    </div>
  );
};`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Smart Contract Interaction Example</h3>
                <pre className="bg-loteraa-gray/30 p-4 rounded-md text-sm overflow-x-auto">
{`import SmartContractService from '@/utils/smartContractUtils';

const ContractManager = {
  async deployNewContract(name, type) {
    // Generate contract code
    const code = SmartContractService.generateDefaultContractCode(name);
    const abi = SmartContractService.generateDefaultABI();
    
    // Validate before deployment
    const validation = SmartContractService.validateContractCode(code);
    if (!validation.isValid) {
      throw new Error('Contract validation failed');
    }
    
    // Deploy to blockchain
    const address = await SmartContractService.deployContract(code, abi);
    return { address, code, abi };
  },
  
  async logSensorData(contractAddress, sensorId, value) {
    return await SmartContractService.callContractFunction(
      contractAddress,
      'logSensorData',
      [sensorId, value]
    );
  }
};`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-loteraa-gray/20 border-loteraa-gray/30">
        <CardHeader>
          <CardTitle className="text-white">Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="text-white/80">
          <p className="mb-4">
            For additional support or questions about integration, please refer to our documentation or contact our development team.
          </p>
          <div className="flex gap-4">
            <Button className="bg-loteraa-purple hover:bg-loteraa-purple/90">
              View Full Documentation
            </Button>
            <Button variant="outline" className="border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20">
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperGuide;
