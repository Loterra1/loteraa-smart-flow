'use client';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { X, Wallet, ExternalLink, Copy, Check } from 'lucide-react';

// Wallet configurations
const WALLETS = [
   {
      id: 'metamask',
      name: 'MetaMask',
      icon: '🦊',
      provider: 'ethereum',
      downloadUrl: 'https://metamask.io/',
   },
   {
      id: 'phantom',
      name: 'Phantom',
      icon: '👻',
      provider: 'solana',
      downloadUrl: 'https://phantom.app/',
   },
   {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: '🔗',
      provider: 'walletconnect',
      downloadUrl: 'https://walletconnect.com/',
   },
   {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: '🔵',
      provider: 'coinbaseWallet',
      downloadUrl: 'https://www.coinbase.com/wallet',
   },
];

// Network configurations
const NETWORKS = {
   ethereum: [
      {
         id: '1',
         name: 'Ethereum Mainnet',
         rpc: 'https://mainnet.infura.io/v3/',
      },
      {
         id: '11155111',
         name: 'Sepolia Testnet',
         rpc: 'https://sepolia.infura.io/v3/',
      },
      { id: '137', name: 'Polygon', rpc: 'https://polygon-rpc.com/' },
      { id: '56', name: 'BSC', rpc: 'https://bsc-dataseed.binance.org/' },
   ],
   solana: [
      {
         id: 'mainnet-beta',
         name: 'Solana Mainnet',
         rpc: 'https://api.mainnet-beta.solana.com',
      },
      {
         id: 'devnet',
         name: 'Solana Devnet',
         rpc: 'https://api.devnet.solana.com',
      },
   ],
};

export default function WalletModal() {
   const [provider, setProvider] = useState<ethers.BrowserProvider | null>(
      null
   );
   const [address, setAddress] = useState('');
   const [isConnecting, setIsConnecting] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
   const [selectedNetwork, setSelectedNetwork] = useState('1');
   const [manualAddress, setManualAddress] = useState('');
   const [connectionMethod, setConnectionMethod] = useState<
      'wallet' | 'manual'
   >('wallet');
   const [copiedAddress, setCopiedAddress] = useState(false);

   // Check wallet availability
   const getWalletAvailability = () => {
      const availability: Record<string, boolean> = {};
      WALLETS.forEach((wallet) => {
         switch (wallet.id) {
            case 'metamask':
               availability[wallet.id] = !!(window as any).ethereum?.isMetaMask;
               break;
            case 'phantom':
               availability[wallet.id] = !!(window as any).phantom?.solana;
               break;
            case 'coinbase':
               availability[wallet.id] = !!(window as any).ethereum
                  ?.isCoinbaseWallet;
               break;
            default:
               availability[wallet.id] = false;
         }
      });
      return availability;
   };

   const [walletAvailability, setWalletAvailability] = useState<
      Record<string, boolean>
   >({});

   useEffect(() => {
      setWalletAvailability(getWalletAvailability());
   }, []);

   const connectToWallet = async (walletId: string, networkId: string) => {
      setIsConnecting(true);
      try {
         let walletProvider: ethers.BrowserProvider | null = null;
         let userAddress: string;

         switch (walletId) {
            case 'metamask':
               if (!(window as any).ethereum?.isMetaMask) {
                  throw new Error('MetaMask is not installed');
               }

               // Switch to selected network first
               try {
                  await (window as any).ethereum.request({
                     method: 'wallet_switchEthereumChain',
                     params: [
                        { chainId: `0x${parseInt(networkId).toString(16)}` },
                     ],
                  });
               } catch (switchError: any) {
                  if (switchError.code === 4902) {
                     // Network not added, you could add logic to add the network here
                     console.log('Network not found in wallet');
                  }
               }

               const accounts = await (window as any).ethereum.request({
                  method: 'eth_requestAccounts',
               });

               if (accounts.length === 0) throw new Error('No accounts found');

               walletProvider = new ethers.BrowserProvider(
                  (window as any).ethereum
               );
               const signer = await walletProvider.getSigner();
               userAddress = await signer.getAddress();
               break;

            case 'phantom':
               if (!(window as any).phantom?.solana) {
                  throw new Error('Phantom wallet is not installed');
               }

               const response = await (window as any).phantom.solana.connect();
               userAddress = response.publicKey.toString();
               // Note: Phantom doesn't use ethers BrowserProvider, so walletProvider stays null
               break;

            default:
               throw new Error('Wallet not supported yet');
         }

         setProvider(walletProvider);
         setAddress(userAddress);
         setShowModal(false);
      } catch (error: any) {
         console.error('Wallet connection error:', error);

         if (error.code === 4001) {
            alert('Connection rejected by user');
         } else if (error.message.includes('not installed')) {
            alert(error.message);
         } else {
            alert(`Connection failed: ${error.message}`);
         }
      } finally {
         setIsConnecting(false);
      }
   };

   const connectManually = () => {
      if (!manualAddress.trim()) {
         alert('Please enter a wallet address');
         return;
      }

      // Basic validation
      if (selectedNetwork === 'mainnet-beta' || selectedNetwork === 'devnet') {
         // Solana address validation (basic)
         if (manualAddress.length < 32 || manualAddress.length > 44) {
            alert('Invalid Solana address format');
            return;
         }
      } else {
         // Ethereum address validation
         if (!ethers.isAddress(manualAddress)) {
            alert('Invalid Ethereum address format');
            return;
         }
      }

      setAddress(manualAddress);
      setShowModal(false);
      setManualAddress('');
   };

   const disconnectWallet = () => {
      setProvider(null);
      setAddress('');
   };

   const copyAddress = async () => {
      if (address) {
         await navigator.clipboard.writeText(address);
         setCopiedAddress(true);
         setTimeout(() => setCopiedAddress(false), 2000);
      }
   };

   const getNetworkOptions = () => {
      if (!selectedWallet) return [];

      const wallet = WALLETS.find((w) => w.id === selectedWallet);
      if (wallet?.provider === 'solana') {
         return NETWORKS.solana;
      }
      return NETWORKS.ethereum;
   };

   // Listen for account changes
   useEffect(() => {
      if ((window as any).ethereum) {
         const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length === 0) {
               setAddress('');
               setProvider(null);
            } else {
               setAddress(accounts[0]);
            }
         };

         (window as any).ethereum.on('accountsChanged', handleAccountsChanged);

         return () => {
            (window as any).ethereum.removeListener(
               'accountsChanged',
               handleAccountsChanged
            );
         };
      }
   }, []);

   return (
      <div
         className={`flex flex-col items-center gap-4 p-8 ${
            showModal ? 'overflow-hidden' : 'overflow-y-auto'
         }`}
      >
         {address ? (
            <div className="bg-white rounded-lg shadow-md p-6 border">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                     Connected Wallet
                  </h3>
                  <button
                     onClick={disconnectWallet}
                     className="text-red-500 hover:text-red-700 text-sm"
                  >
                     Disconnect
                  </button>
               </div>

               <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">Address:</span>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                     {address.slice(0, 8)}...{address.slice(-6)}
                  </span>
                  <button
                     onClick={copyAddress}
                     className="p-1 hover:bg-gray-200 rounded"
                     title="Copy address"
                  >
                     {copiedAddress ? (
                        <Check className="w-4 h-4 text-green-500" />
                     ) : (
                        <Copy className="w-4 h-4 text-gray-500" />
                     )}
                  </button>
               </div>
            </div>
         ) : (
            <button
               className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
               onClick={() => setShowModal(true)}
            >
               <Wallet className="w-5 h-5" />
               Connect Wallet
            </button>
         )}

         {/* Wallet Connection Modal */}
         {showModal && (
            <div className="fixed backdrop:bg-stone-900/90 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50  ">
               <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between p-6 border-b">
                     <h2 className="text-xl font-semibold text-gray-800">
                        Connect Wallet
                     </h2>
                     <button
                        onClick={() => setShowModal(false)}
                        className="p-1 hover:bg-gray-100 rounded"
                     >
                        <X className="w-5 h-5 text-gray-500" />
                     </button>
                  </div>

                  <div className="p-6">
                     {/* Connection Method Tabs */}
                     <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                        <button
                           onClick={() => setConnectionMethod('wallet')}
                           className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                              connectionMethod === 'wallet'
                                 ? 'bg-white text-blue-600 shadow-sm'
                                 : 'text-gray-600 hover:text-gray-800'
                           }`}
                        >
                           Wallet Apps
                        </button>
                        <button
                           onClick={() => setConnectionMethod('manual')}
                           className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                              connectionMethod === 'manual'
                                 ? 'bg-white text-blue-600 shadow-sm'
                                 : 'text-gray-600 hover:text-gray-800'
                           }`}
                        >
                           Manual Entry
                        </button>
                     </div>

                     {connectionMethod === 'wallet' ? (
                        <>
                           {/* Wallet Selection */}
                           <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                 Choose Wallet
                              </label>
                              <div className="grid gap-2">
                                 {WALLETS.map((wallet) => {
                                    const isAvailable =
                                       walletAvailability[wallet.id];
                                    return (
                                       <button
                                          key={wallet.id}
                                          onClick={() =>
                                             setSelectedWallet(wallet.id)
                                          }
                                          className={`flex items-center justify-between p-3 border rounded-lg transition-all ${
                                             selectedWallet === wallet.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                          } ${
                                             !isAvailable ? 'opacity-60' : ''
                                          }`}
                                       >
                                          <div className="flex items-center gap-3">
                                             <span className="text-2xl">
                                                {wallet.icon}
                                             </span>
                                             <span className="font-medium text-gray-800">
                                                {wallet.name}
                                             </span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                             {isAvailable ? (
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                                   Installed
                                                </span>
                                             ) : (
                                                <a
                                                   href={wallet.downloadUrl}
                                                   target="_blank"
                                                   rel="noopener noreferrer"
                                                   className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                                   onClick={(e) =>
                                                      e.stopPropagation()
                                                   }
                                                >
                                                   Install{' '}
                                                   <ExternalLink className="w-3 h-3" />
                                                </a>
                                             )}
                                          </div>
                                       </button>
                                    );
                                 })}
                              </div>
                           </div>

                           {/* Network Selection */}
                           {selectedWallet && (
                              <div className="mb-6">
                                 <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Choose Network
                                 </label>
                                 <select
                                    value={selectedNetwork}
                                    onChange={(e) =>
                                       setSelectedNetwork(e.target.value)
                                    }
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 >
                                    {getNetworkOptions().map((network) => (
                                       <option
                                          key={network.id}
                                          value={network.id}
                                       >
                                          {network.name}
                                       </option>
                                    ))}
                                 </select>
                              </div>
                           )}

                           {/* Connect Button */}
                           <button
                              onClick={() =>
                                 selectedWallet &&
                                 connectToWallet(
                                    selectedWallet,
                                    selectedNetwork
                                 )
                              }
                              disabled={
                                 !selectedWallet ||
                                 isConnecting ||
                                 !walletAvailability[selectedWallet || '']
                              }
                              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                           >
                              {isConnecting ? (
                                 <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Connecting...
                                 </div>
                              ) : (
                                 'Connect Wallet'
                              )}
                           </button>
                        </>
                     ) : (
                        <>
                           {/* Manual Address Entry */}
                           <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                 Choose Network
                              </label>
                              <select
                                 value={selectedNetwork}
                                 onChange={(e) =>
                                    setSelectedNetwork(e.target.value)
                                 }
                                 className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                 {[
                                    ...NETWORKS.ethereum,
                                    ...NETWORKS.solana,
                                 ].map((network) => (
                                    <option key={network.id} value={network.id}>
                                       {network.name}
                                    </option>
                                 ))}
                              </select>
                           </div>

                           <div className="mb-6">
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                 Wallet Address
                              </label>
                              <input
                                 type="text"
                                 value={manualAddress}
                                 onChange={(e) =>
                                    setManualAddress(e.target.value)
                                 }
                                 placeholder="Enter your wallet address..."
                                 className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                              />
                              <p className="text-xs text-gray-500 mt-2">
                                 Note: Manual entry is read-only. You won't be
                                 able to sign transactions.
                              </p>
                           </div>

                           <button
                              onClick={connectManually}
                              disabled={!manualAddress.trim()}
                              className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                           >
                              Connect Address
                           </button>
                        </>
                     )}
                  </div>

                  {/* Modal Footer */}
                  <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
                     <p className="text-xs text-gray-500 text-center">
                        Make sure you trust the wallet provider and verify all
                        transactions before signing.
                     </p>
                  </div>
               </div>
            </div>
         )}

         {/* Connection Status */}
         {address && (
            <div className="text-center">
               <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Wallet Connected
               </div>
            </div>
         )}
      </div>
   );
}
