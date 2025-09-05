import React, { useState, useRef, useEffect } from 'react';
import {
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
   Dialog,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
   ChevronRight,
   PlusCircle,
   Check,
   Upload,
   Coins,
   Database,
   Code,
   ExternalLink,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLoteraaDePINContext } from '@/contexts/LoteraaDePINContext';
import { ethers, Contract } from 'ethers';
import { CONTRACT_ADDRESSES } from '@/contexts/Contract';
import { CONTRACT_ABIS } from '@/contexts/Contract';

interface IoTDevice {
   id: string;
   name: string;
   type: string;
}

interface AutomationRule {
   id: string;
   name: string;
   description: string;
}

interface SmartContract {
   id?: string;
   name: string;
   type: string;
   status: 'Active' | 'Inactive';
   trigger: string;
   lastModified?: string;
   file?: File;
   code?: string;
}

interface CreateSmartContractDialogProps {
   onClose: () => void;
   onContractCreated?: (contract: SmartContract) => void;
   initialContractType?: 'template' | 'upload';
}

const CreateSmartContractDialog = ({
   onClose,
   onContractCreated,
   initialContractType = 'template',
}: CreateSmartContractDialogProps) => {
   //hooks
   const { signer, account } = useLoteraaDePINContext();

   //states
   const [step, setStep] = useState(1);
   const [contractType, setContractType] = useState<'template' | 'upload'>(
      initialContractType
   );
   const [templateType, setTemplateType] = useState('');
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [linkedDevices, setLinkedDevices] = useState<IoTDevice[]>([]);
   const [linkedRules, setLinkedRules] = useState<AutomationRule[]>([]);
   const [tokenPrice, setTokenPrice] = useState('0.10');
   const [tokenFrequency, setTokenFrequency] = useState('Motion detected');
   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
   const [contractCode, setContractCode] = useState<string>('');
   const fileInputRef = useRef<HTMLInputElement>(null);
   const { toast } = useToast();

   // Sample device and automation data
   const availableDevices: IoTDevice[] = [
      { id: '1', name: 'Temperature Sensor (TB-103)', type: 'Temperature' },
      { id: '2', name: 'Motion Detector (MD-201)', type: 'Motion' },
      { id: '3', name: 'Light Sensor (LS-105)', type: 'Light' },
      { id: '4', name: 'Humidity Sensor (HS-102)', type: 'Humidity' },
      { id: '5', name: 'Door Sensor (DS-301)', type: 'Contact' },
   ];

   const availableRules: AutomationRule[] = [
      {
         id: '1',
         name: 'Temperature Alert',
         description: 'Trigger when temperature exceeds threshold',
      },
      {
         id: '2',
         name: 'Motion Detection',
         description: 'Trigger when motion is detected',
      },
      {
         id: '3',
         name: 'Time-based Trigger',
         description: 'Trigger at specific times',
      },
      {
         id: '4',
         name: 'Condition-based Alert',
         description: 'Trigger when multiple conditions are met',
      },
   ];

   const handleNextStep = () => {
      if (step < 5) {
         setStep(step + 1);
      }
   };

   const handlePrevStep = () => {
      if (step > 1) {
         setStep(step - 1);
      }
   };

   useEffect(() => {
      console.log('signer and account', signer, account);
   }, [signer, account]);

   const handleDeploy = async () => {
      if (!signer) {
         toast({
            title: 'Wallet Not Connected',
            description: 'Please connect your wallet before deploying',
            variant: 'destructive',
         });
         return;
      }

      try {
         const lotToken = new ethers.Contract(
            CONTRACT_ADDRESSES.LOT_TOKEN,
            CONTRACT_ABIS.LOT_TOKEN,
            signer
         );

         // Get the deployer address
         // const deployerAddress = await signer.getAddress();

         // Mint 100 test LOT tokens to the deployer (adjust amount as needed)
         // const mintAmount = ethers.parseEther('100');
         // const tx = await lotToken.mint(deployerAddress, mintAmount);
         // await tx.wait();

         // Simulate deployment success after minting
         setTimeout(() => {
            if (onContractCreated) {
               onContractCreated({
                  name:
                     contractType === 'upload' && uploadedFile
                        ? uploadedFile.name
                        : name || 'New Contract',
                  type:
                     contractType === 'template'
                        ? templateType === 'iot-payment'
                           ? 'IoT Payment'
                           : templateType === 'iot-data'
                           ? 'Data Access'
                           : templateType === 'custom-logic'
                           ? 'Custom Logic'
                           : 'Token Access'
                        : 'Custom Upload',
                  status: 'Active',
                  trigger:
                     linkedRules.length > 0 ? linkedRules[0].name : 'None',
                  file: uploadedFile || undefined,
                  code: contractCode || undefined,
               });
            }

            toast({
               title: 'Contract Deployed Successfully',
               description:
                  'Your smart contract has been deployed and test LOT tokens have been minted to your wallet.',
            });
            setStep(4);
         }, 1500);
      } catch (error) {
         console.error('Deployment failed:', error);
         toast({
            title: 'Deployment Failed',
            description:
               error instanceof Error ? error.message : 'Something went wrong',
            variant: 'destructive',
         });
      }
   };

   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         setUploadedFile(file);
         setName(file.name);

         // Read file content
         const reader = new FileReader();
         reader.onload = (e) => {
            const content = e.target?.result as string;
            setContractCode(content);
         };
         reader.readAsText(file);

         toast({
            title: 'File Uploaded',
            description: `${file.name} has been uploaded successfully.`,
         });
      }
   };

   const handleDeviceSelect = () => {
      // Simulate selecting a device
      const randomDevice = availableDevices.find(
         (device) => !linkedDevices.some((d) => d.id === device.id)
      );
      if (randomDevice) {
         setLinkedDevices([...linkedDevices, randomDevice]);
         toast({
            title: 'Device Linked',
            description: `${randomDevice.name} has been linked to your contract.`,
         });
      }
   };

   const removeDevice = (deviceId: string) => {
      setLinkedDevices(
         linkedDevices.filter((device) => device.id !== deviceId)
      );
   };

   const handleRuleSelect = () => {
      // Simulate selecting a rule
      const randomRule = availableRules.find(
         (rule) => !linkedRules.some((r) => r.id === rule.id)
      );
      if (randomRule) {
         setLinkedRules([...linkedRules, randomRule]);
         toast({
            title: 'Rule Linked',
            description: `${randomRule.name} has been linked to your contract.`,
         });
      }
   };

   const removeRule = (ruleId: string) => {
      setLinkedRules(linkedRules.filter((rule) => rule.id !== ruleId));
   };

   const configureTokenSettings = () => {
      // Open token configuration modal (simplified for this implementation)
      toast({
         title: 'Token Settings Updated',
         description: `Payment set to $${tokenPrice} TERAA per ${tokenFrequency}.`,
      });
   };

   const renderStepIndicator = () => {
      return (
         <div className="flex justify-between mb-8 px-2">
            {[1, 2, 3, 4].map((stepNum) => (
               <div key={stepNum} className="flex flex-col items-center">
                  <div
                     className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= stepNum
                           ? 'bg-loteraa-purple'
                           : 'bg-loteraa-gray/40'
                     }`}
                  >
                     {step > stepNum ? (
                        <Check className="h-4 w-4 text-white" />
                     ) : (
                        <span className="text-white text-sm">{stepNum}</span>
                     )}
                  </div>
                  <span className="text-xs mt-1 text-white/70">
                     {stepNum === 1 && 'Choose Type'}
                     {stepNum === 2 && 'Configure'}
                     {stepNum === 3 && 'Deploy'}
                     {stepNum === 4 && 'Success'}
                  </span>
               </div>
            ))}
         </div>
      );
   };

   const renderStep1 = () => {
      return (
         <>
            <div className="mb-6">
               <Label className="text-white mb-2 block">
                  Choose Contract Type
               </Label>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card
                     className={`bg-loteraa-gray/20 border-loteraa-gray/30 hover:border-loteraa-purple/60 transition-colors cursor-pointer ${
                        contractType === 'template'
                           ? 'border-loteraa-purple'
                           : ''
                     }`}
                     onClick={() => setContractType('template')}
                  >
                     <CardContent className="p-4 flex items-center">
                        <div className="h-10 w-10 rounded-full bg-loteraa-purple/20 flex items-center justify-center mr-3">
                           <Code className="h-5 w-5 text-loteraa-purple" />
                        </div>
                        <div>
                           <h3 className="text-white font-medium">
                              Create from Template
                           </h3>
                           <p className="text-sm text-white/60">
                              Use pre-built contract templates
                           </p>
                        </div>
                     </CardContent>
                  </Card>

                  <Card
                     className={`bg-loteraa-gray/20 border-loteraa-gray/30 hover:border-loteraa-purple/60 transition-colors cursor-pointer ${
                        contractType === 'upload' ? 'border-loteraa-purple' : ''
                     }`}
                     onClick={() => setContractType('upload')}
                  >
                     <CardContent className="p-4 flex items-center">
                        <div className="h-10 w-10 rounded-full bg-loteraa-purple/20 flex items-center justify-center mr-3">
                           <Upload className="h-5 w-5 text-loteraa-purple" />
                        </div>
                        <div>
                           <h3 className="text-white font-medium">
                              Upload Existing Contract
                           </h3>
                           <p className="text-sm text-white/60">
                              Upload .sol or ABI file
                           </p>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>

            {contractType === 'template' && (
               <>
                  <div className="mb-4">
                     <Label
                        htmlFor="template-type"
                        className="text-white mb-2 block"
                     >
                        Choose Contract Purpose
                     </Label>
                     <div className="grid grid-cols-1 gap-3">
                        <div
                           className={`p-3 rounded-md border cursor-pointer flex items-center ${
                              templateType === 'iot-data'
                                 ? 'border-loteraa-purple bg-loteraa-purple/10'
                                 : 'border-loteraa-gray/30 bg-loteraa-gray/20 hover:bg-loteraa-gray/30'
                           }`}
                           onClick={() => setTemplateType('iot-data')}
                        >
                           <div className="mr-3 h-8 w-8 rounded-full bg-loteraa-purple/20 flex items-center justify-center">
                              <Database className="h-4 w-4 text-loteraa-purple" />
                           </div>
                           <div className="flex-1">
                              <h4 className="text-white text-sm font-medium">
                                 IoT Data Access Contract
                              </h4>
                              <p className="text-xs text-white/60">
                                 Control access to your device data
                              </p>
                           </div>
                        </div>

                        <div
                           className={`p-3 rounded-md border cursor-pointer flex items-center ${
                              templateType === 'iot-payment'
                                 ? 'border-loteraa-purple bg-loteraa-purple/10'
                                 : 'border-loteraa-gray/30 bg-loteraa-gray/20 hover:bg-loteraa-gray/30'
                           }`}
                           onClick={() => setTemplateType('iot-payment')}
                        >
                           <div className="mr-3 h-8 w-8 rounded-full bg-loteraa-purple/20 flex items-center justify-center">
                              <Coins className="h-4 w-4 text-loteraa-purple" />
                           </div>
                           <div className="flex-1">
                              <h4 className="text-white text-sm font-medium">
                                 IoT Payment Trigger
                              </h4>
                              <p className="text-xs text-white/60">
                                 Automate payments based on sensor triggers
                              </p>
                           </div>
                        </div>

                        <div
                           className={`p-3 rounded-md border cursor-pointer flex items-center ${
                              templateType === 'custom-logic'
                                 ? 'border-loteraa-purple bg-loteraa-purple/10'
                                 : 'border-loteraa-gray/30 bg-loteraa-gray/20 hover:bg-loteraa-gray/30'
                           }`}
                           onClick={() => setTemplateType('custom-logic')}
                        >
                           <div className="mr-3 h-8 w-8 rounded-full bg-loteraa-purple/20 flex items-center justify-center">
                              <Code className="h-4 w-4 text-loteraa-purple" />
                           </div>
                           <div className="flex-1">
                              <h4 className="text-white text-sm font-medium">
                                 Custom Logic Smart Contract
                              </h4>
                              <p className="text-xs text-white/60">
                                 Define custom behavior for your devices
                              </p>
                           </div>
                        </div>

                        <div
                           className={`p-3 rounded-md border cursor-pointer flex items-center ${
                              templateType === 'token-access'
                                 ? 'border-loteraa-purple bg-loteraa-purple/10'
                                 : 'border-loteraa-gray/30 bg-loteraa-gray/20 hover:bg-loteraa-gray/30'
                           }`}
                           onClick={() => setTemplateType('token-access')}
                        >
                           <div className="mr-3 h-8 w-8 rounded-full bg-loteraa-purple/20 flex items-center justify-center">
                              <Coins className="h-4 w-4 text-loteraa-purple" />
                           </div>
                           <div className="flex-1">
                              <h4 className="text-white text-sm font-medium">
                                 Token Based Sensor Access
                              </h4>
                              <p className="text-xs text-white/60">
                                 Control sensor access with token payments
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="mb-4">
                     <Label
                        htmlFor="contract-label"
                        className="text-white mb-2 block"
                     >
                        Contract Label
                     </Label>
                     <Input
                        id="contract-label"
                        className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                        placeholder="Enter a name for your contract"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />
                  </div>

                  <div className="mb-4">
                     <Label
                        htmlFor="contract-desc"
                        className="text-white mb-2 block"
                     >
                        Description (optional)
                     </Label>
                     <Textarea
                        id="contract-desc"
                        className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                        placeholder="Describe your contract's purpose"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                     />
                  </div>
               </>
            )}

            {contractType === 'upload' && (
               <>
                  <div className="mb-4">
                     <Label className="text-white mb-2 block">
                        Upload .sol or ABI File
                     </Label>
                     <div
                        className="border-dashed border-2 border-loteraa-gray/40 rounded-md p-6 text-center cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                     >
                        <input
                           type="file"
                           ref={fileInputRef}
                           className="hidden"
                           accept=".sol,.json,.abi"
                           onChange={handleFileUpload}
                        />
                        <Upload className="mx-auto h-10 w-10 text-white/50 mb-2" />
                        <p className="text-white/70 mb-2">
                           {uploadedFile
                              ? `Selected: ${uploadedFile.name}`
                              : 'Drag and drop or click to upload'}
                        </p>
                        <Button
                           variant="outline"
                           className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                        >
                           Upload File
                        </Button>
                     </div>
                  </div>

                  <div className="mb-4">
                     <Label
                        htmlFor="upload-name"
                        className="text-white mb-2 block"
                     >
                        Name
                     </Label>
                     <Input
                        id="upload-name"
                        className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                        placeholder="Enter contract name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />
                  </div>

                  <div className="mb-4">
                     <Label
                        htmlFor="upload-desc"
                        className="text-white mb-2 block"
                     >
                        Description (optional)
                     </Label>
                     <Textarea
                        id="upload-desc"
                        className="bg-loteraa-gray/20 border-loteraa-gray/30 text-white"
                        placeholder="Describe your contract's purpose"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                     />
                  </div>

                  {uploadedFile && contractCode && (
                     <div className="mb-4">
                        <Label className="text-white mb-2 block">
                           Preview Code
                        </Label>
                        <div className="bg-loteraa-gray/30 p-3 rounded-md overflow-x-auto max-h-60">
                           <pre className="text-white/90 text-xs font-mono">
                              {contractCode}
                           </pre>
                        </div>
                     </div>
                  )}
               </>
            )}
         </>
      );
   };

   const renderStep2 = () => {
      return (
         <>
            <div className="mb-4">
               <Label className="text-white mb-2 block">
                  Link with IoT Device(s)
               </Label>
               <div className="flex items-center justify-between p-3 rounded-md bg-loteraa-gray/20 border border-loteraa-gray/30 mb-2">
                  <span className="text-white">Select devices to connect</span>
                  <Button
                     variant="ghost"
                     className="h-8 text-loteraa-purple"
                     onClick={handleDeviceSelect}
                  >
                     <PlusCircle className="h-4 w-4 mr-1" />
                     Select from list
                  </Button>
               </div>
               {linkedDevices.length > 0 && (
                  <div className="space-y-2">
                     {linkedDevices.map((device) => (
                        <div
                           key={device.id}
                           className="p-2 bg-loteraa-purple/10 border border-loteraa-purple/30 rounded-md flex justify-between"
                        >
                           <span className="text-white">{device.name}</span>
                           <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => removeDevice(device.id)}
                           >
                              ×
                           </Button>
                        </div>
                     ))}
                  </div>
               )}
            </div>

            <div className="mb-4">
               <Label className="text-white mb-2 block">
                  Link with Automation Rule(s)
               </Label>
               <div className="flex items-center justify-between p-3 rounded-md bg-loteraa-gray/20 border border-loteraa-gray/30 mb-2">
                  <span className="text-white">Select automation rules</span>
                  <Button
                     variant="ghost"
                     className="h-8 text-loteraa-purple"
                     onClick={handleRuleSelect}
                  >
                     <PlusCircle className="h-4 w-4 mr-1" />
                     Select rule logic
                  </Button>
               </div>
               {linkedRules.length > 0 && (
                  <div className="space-y-2">
                     {linkedRules.map((rule) => (
                        <div
                           key={rule.id}
                           className="p-2 bg-loteraa-purple/10 border border-loteraa-purple/30 rounded-md flex justify-between"
                        >
                           <span className="text-white">{rule.name}</span>
                           <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => removeRule(rule.id)}
                           >
                              ×
                           </Button>
                        </div>
                     ))}
                  </div>
               )}
            </div>

            <div className="mb-4">
               <Label className="text-white mb-2 block">Payment Triggers</Label>
               <div className="flex items-center justify-between p-3 rounded-md bg-loteraa-gray/20 border border-loteraa-gray/30 mb-2">
                  <span className="text-white">Configure payment rules</span>
                  <Button
                     variant="ghost"
                     className="h-8 text-loteraa-purple"
                     onClick={configureTokenSettings}
                  >
                     <PlusCircle className="h-4 w-4 mr-1" />
                     Configure token settings
                  </Button>
               </div>
               <div className="p-4 bg-loteraa-purple/10 border border-loteraa-purple/30 rounded-md">
                  <div className="flex items-center mb-2">
                     <Label className="text-white mr-2">Token: </Label>
                     <span className="font-medium text-white">TERAA</span>
                  </div>
                  <div className="flex flex-wrap items-center mb-2">
                     <Label className="text-white mr-2">Price: </Label>
                     <div className="flex items-center">
                        <span className="text-white">$</span>
                        <Input
                           className="bg-loteraa-gray/30 border-loteraa-gray/40 text-white h-8 w-16 mx-1"
                           value={tokenPrice}
                           onChange={(e) => setTokenPrice(e.target.value)}
                        />
                        <span className="text-white">TERAA</span>
                     </div>
                  </div>
                  <div className="flex flex-wrap items-center">
                     <Label className="text-white mr-2">Frequency: </Label>
                     <div className="flex items-center">
                        <span className="text-white">Every time</span>
                        <Input
                           className="bg-loteraa-gray/30 border-loteraa-gray/40 text-white h-8 mx-2 w-32"
                           value={tokenFrequency}
                           onChange={(e) => setTokenFrequency(e.target.value)}
                        />
                     </div>
                  </div>
               </div>
               <div className="text-xs text-white/60 mt-1">
                  Example: ${tokenPrice} TERAA every time {tokenFrequency}
               </div>
            </div>
         </>
      );
   };

   const renderStep3 = () => {
      return (
         <>
            <div className="mb-6">
               <h3 className="text-white font-medium mb-4">Review Summary</h3>
               <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-md p-4 space-y-3">
                  <div className="flex justify-between items-center">
                     <span className="text-white/70">Contract Name:</span>
                     <span className="text-white font-medium break-all">
                        {contractType === 'upload' && uploadedFile
                           ? uploadedFile.name
                           : name || 'IoT Payment Contract'}
                     </span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-white/70">Type:</span>
                     <span className="text-white font-medium">
                        {contractType === 'template'
                           ? templateType === 'iot-payment'
                              ? 'IoT Payment Trigger'
                              : templateType === 'iot-data'
                              ? 'IoT Data Access'
                              : templateType === 'custom-logic'
                              ? 'Custom Logic'
                              : 'Token Access'
                           : 'Custom Upload'}
                     </span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-white/70">Linked Devices:</span>
                     <span className="text-white font-medium">
                        {linkedDevices.length || 'None'}
                     </span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-white/70">Linked Rules:</span>
                     <span className="text-white font-medium">
                        {linkedRules.length || 'None'}
                     </span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-white/70">Payment Trigger:</span>
                     <span className="text-white font-medium">
                        ${tokenPrice} TERAA per {tokenFrequency}
                     </span>
                  </div>
               </div>
            </div>

            <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-md p-4 mb-6">
               <div className="flex justify-between items-center">
                  <span className="text-white font-medium">
                     Deployment Cost Estimate
                  </span>
                  <span className="text-white font-medium">0.002 ETH</span>
               </div>
               <div className="text-xs text-white/60 mt-1">
                  Gas fees will be charged when deploying to blockchain
               </div>
            </div>
         </>
      );
   };

   const renderStep4 = () => {
      return (
         <div className="text-center py-6">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
               Contract Deployed Successfully!
            </h3>
            <p className="text-white/70 mb-6">
               Your contract is now active on the Loteraa network
            </p>

            <div className="bg-loteraa-gray/20 border border-loteraa-gray/30 rounded-md p-4 mb-6 text-left">
               <div className="flex justify-between items-center mb-3">
                  <span className="text-white/70">Contract Address:</span>
                  <span className="text-white font-mono text-sm break-all">
                     0x7F4e7630f8742e7Db0606a55E3d45...
                  </span>
               </div>
               <div className="flex justify-center flex-wrap gap-2">
                  <Button
                     variant="outline"
                     className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                  >
                     <ExternalLink className="h-4 w-4 mr-2" />
                     View Explorer
                  </Button>
                  <Button
                     variant="outline"
                     className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                  >
                     Copy Address
                  </Button>
               </div>
            </div>
         </div>
      );
   };

   const renderStepContent = () => {
      switch (step) {
         case 1:
            return renderStep1();
         case 2:
            return renderStep2();
         case 3:
            return renderStep3();
         case 4:
            return renderStep4();
         default:
            return null;
      }
   };

   const renderButtons = () => {
      if (step === 4) {
         return (
            <div className="flex justify-between">
               <Button
                  variant="outline"
                  className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                  onClick={onClose}
               >
                  Configure More Triggers
               </Button>
               <Button
                  className="bg-loteraa-purple hover:bg-loteraa-purple/90"
                  onClick={onClose}
               >
                  Finish
               </Button>
            </div>
         );
      }

      return (
         <div className="flex justify-between">
            {step > 1 ? (
               <Button
                  variant="outline"
                  className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                  onClick={handlePrevStep}
               >
                  Back
               </Button>
            ) : (
               <Button
                  variant="outline"
                  className="bg-transparent border-loteraa-purple/70 text-white hover:bg-loteraa-purple/20"
                  onClick={onClose}
               >
                  Cancel
               </Button>
            )}

            {step < 3 ? (
               <Button
                  className="bg-loteraa-purple hover:bg-loteraa-purple/90"
                  onClick={handleNextStep}
               >
                  Next <ChevronRight className="h-4 w-4 ml-1" />
               </Button>
            ) : step === 3 ? (
               <Button
                  className="bg-loteraa-purple hover:bg-loteraa-purple/90"
                  onClick={handleDeploy}
               >
                  Deploy to Loteraa
               </Button>
            ) : null}
         </div>
      );
   };

   return (
      <DialogContent className="bg-loteraa-black border-loteraa-gray/30 text-white sm:max-w-[650px]">
         <DialogHeader>
            <DialogTitle className="text-white text-xl">
               {step < 4 ? 'Create Smart Contract' : 'Contract Deployed'}
            </DialogTitle>
            <DialogDescription className="text-white/70">
               {step < 4
                  ? 'Configure and deploy your smart contract.'
                  : 'Your contract has been deployed successfully.'}
            </DialogDescription>
         </DialogHeader>

         {step < 4 && renderStepIndicator()}

         <div className="max-h-[60vh] overflow-y-auto pr-1">
            {renderStepContent()}
         </div>

         <div className="mt-6">{renderButtons()}</div>
      </DialogContent>
   );
};

export default CreateSmartContractDialog;
