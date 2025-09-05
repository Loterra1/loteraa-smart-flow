import { useState, useEffect } from 'react';
import { ExternalLink, X, Wallet, Download, CheckCircle } from 'lucide-react';
import { ethers } from 'ethers';

import { MetaMaskInpageProvider } from '@metamask/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import { useAuth } from '@/contexts/AuthContext';

import { useLoteraaDePIN } from '@/contexts/LoteraaDePIN';

declare global {
   interface Window {
      ethereum?: MetaMaskInpageProvider;
   }
}

// Wallet configurations with detection methods

// note install ethers.js web3modal, coinbase
const WALLETS = [
   {
      id: 'metamask',
      name: 'MetaMask',
      icon: '🦊',
      provider: 'ethereum',
      downloadUrl: 'https://metamask.io/',
      deepLink: 'https://metamask.app.link/dapp/',
      mobileDetection: () => /MetaMask/i.test(navigator.userAgent),
      desktopDetection: () =>
         typeof window !== 'undefined' && window.ethereum?.isMetaMask,
   },
   // {
   //    id: 'phantom',
   //    name: 'Phantom',
   //    icon: '👻',
   //    provider: 'solana',
   //    downloadUrl: 'https://phantom.app/',
   //    deepLink: 'https://phantom.app/ul/browse/',
   //    mobileDetection: () => /Phantom/i.test(navigator.userAgent),
   //    desktopDetection: () =>
   //       typeof window !== 'undefined' && window.phantom?.solana,
   // },
];

// Enhanced wallet detection
const detectWalletStatus = (wallet) => {
   const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
         navigator.userAgent
      );

   if (isMobile) {
      // On mobile, check if we're already in the wallet's browser
      const isInWalletBrowser = wallet.mobileDetection();
      return {
         isInstalled: isInWalletBrowser,
         canOpen: !isInWalletBrowser, // Can open if not already in wallet
         isMobile: true,
         isInWalletBrowser,
      };
   } else {
      // On desktop, check for injected provider
      const isInstalled = wallet.desktopDetection();
      return {
         isInstalled,
         canOpen: isInstalled,
         isMobile: false,
         isInWalletBrowser: false,
      };
   }
};

export default function EnhancedWalletModal({
   onClose,
   onConnect,
}: {
   onClose: () => void;
   onConnect: () => void;
}) {
   const { setWalletAddress } = useAuth();
   const { account } = useLoteraaDePIN();

   const [walletStatuses, setWalletStatuses] = useState({});
   const [selectedWallet, setSelectedWallet] = useState(null);
   const [isConnecting, setIsConnecting] = useState(false);
   const [connectionMethod, setConnectionMethod] = useState('wallet');
   const [manualAddress, setManualAddress] = useState('');

   // const [accounts, setAccounts] = useState<string[]>([]);

   const openWallet = async () => {
      if (!window.ethereum || !window.ethereum.isMetaMask) {
         console.log('MetaMask not detected');
         return;
      }

      try {
         await onConnect();

         console.log('Accounts:', account);
         setWalletAddress(account[0]);

         onClose();
      } catch (err) {
         if (err.code === 4001) {
            console.error('User rejected connection request');
         } else {
            console.error('MetaMask error:', err);
         }
      }
   };

   // useEffect(() => {
   //    // optional: listen for account changes
   //    if (window.ethereum) {
   //       window.ethereum.on('accountsChanged', (accs: string[]) => {
   //          setAccounts(accs);
   //       });
   //    }
   // }, []);

   const WalletButton = ({ wallet }) => {
      const status = walletStatuses[wallet.id] || {};
      const { isInstalled, canOpen, isMobile, isInWalletBrowser } = status;

      return (
         <div
            className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
               selectedWallet === wallet.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
            }`}
         >
            <div className="flex items-center gap-3">
               <span className="text-2xl">{wallet.icon}</span>
               <div>
                  <span className="font-medium text-gray-800 block">
                     {wallet.name}
                  </span>
                  {isInWalletBrowser && (
                     <span className="text-xs text-green-600 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Connected Browser
                     </span>
                  )}
               </div>
            </div>

            <div className="flex items-center gap-2">
               {isInstalled ? (
                  <div className="flex items-center gap-2">
                     <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Installed
                     </span>
                     <button
                        onClick={openWallet}
                        // disabled={isConnecting}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1"
                     >
                        <Wallet className="w-3 h-3" />
                        {isMobile && canOpen ? 'connect wallet' : 'Connect'}
                     </button>
                  </div>
               ) : (
                  <div className="flex items-center gap-2">
                     {canOpen && (
                        <button
                           onClick={() => openWallet()}
                           className="bg-orange-600 text-white px-3 py-1 rounded text-xs hover:bg-orange-700 flex items-center gap-1"
                        >
                           <Wallet className="w-3 h-3" />
                           Open
                        </button>
                     )}
                     <a
                        href={wallet.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"
                     >
                        <Download className="w-3 h-3" />
                        Install
                     </a>
                  </div>
               )}
            </div>
         </div>
      );
   };

   useEffect(() => {
      // Update wallet statuses
      const statuses = {};
      WALLETS.forEach((wallet) => {
         statuses[wallet.id] = detectWalletStatus(wallet);
      });
      setWalletStatuses(statuses);
   }, []);

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
         <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
               <h2 className="text-xl font-semibold text-gray-800">
                  Connect Wallet
               </h2>
               {onClose && (
                  <button
                     onClick={onClose}
                     className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                     <X className="w-5 h-5" />
                  </button>
               )}
            </div>

            <div className="p-6">
               <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                     Choose Wallet
                  </label>
                  {WALLETS.map((wallet) => (
                     <WalletButton key={wallet.id} wallet={wallet} />
                  ))}

                  {isConnecting && (
                     <div className="flex items-center justify-center p-4">
                        <div className="flex items-center gap-2 text-blue-600">
                           <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                           Connecting to wallet...
                        </div>
                     </div>
                  )}
               </div>
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
   );
}
