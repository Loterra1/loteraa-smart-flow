import { useState } from 'react';
import { ethers, BrowserProvider, Contract, Signer } from 'ethers';
import { StakingPool } from './types';

import { useAuth } from './AuthContext';

import {
   CONTRACT_ADDRESSES,
   CONTRACT_ABIS,
   STAKING_POOLS,
   FEE_CONFIG,
} from './Contract';

// Type definitions
interface Balances {
   eth: string;
   lot: string;
}

interface Contracts {
   lotToken?: Contract;
   lotStaking?: Contract;
}

interface StakeInfo {
   id: number;
   amount: string;
   poolId: string;
   startTime: Date;
   endTime: Date;
   withdrawn: boolean;
   poolInfo: StakingPool;
}

interface ContractStats {
   totalStaked: string;
   totalRewards: string;
   totalBurned: string;
   contractBalance: string;
}

interface TransactionResult {
   success: boolean;
   txHash?: string;
   error?: string;
}

interface ConnectionResult {
   success: boolean;
   address?: string;
   error?: string;
}

interface RawStake {
   amount: bigint;
   poolId: bigint;
   startTime: bigint;
   endTime: bigint;
   withdrawn: boolean;
}

interface RawContractStats {
   totalStaked_: bigint;
   totalRewardsDistributed_: bigint;
   totalFeesBurned_: bigint;
   contractBalance: bigint;
}

export const useLoteraaDePIN = () => {
   const { setWalletAddress } = useAuth();
   const [provider, setProvider] = useState<BrowserProvider | null>(null);
   const [signer, setSigner] = useState<Signer | null>(null);
   const [contracts, setContracts] = useState<Contracts>({});
   const [account, setAccount] = useState<string>('');
   const [balances, setBalances] = useState<Balances>({ eth: '0', lot: '0' });

   const connectWallet = async (): Promise<ConnectionResult> => {
      try {
         if (!window.ethereum) {
            throw new Error('MetaMask not installed');
         }

         await window.ethereum.request({ method: 'eth_requestAccounts' });

         const provider = new ethers.BrowserProvider(window.ethereum);
         const signer = await provider.getSigner();
         const address = await signer.getAddress();

         const lotToken = new ethers.Contract(
            CONTRACT_ADDRESSES.LOT_TOKEN,
            CONTRACT_ABIS.LOT_TOKEN,
            signer
         );

         const lotStaking = new ethers.Contract(
            CONTRACT_ADDRESSES.LOT_STAKING,
            CONTRACT_ABIS.LOT_STAKING,
            signer
         );

         setProvider(provider);
         setSigner(signer);
         setAccount(address);
         setWalletAddress(address);
         setContracts({ lotToken, lotStaking });

         // Load balances
         // await loadBalances(address, provider);

         return { success: true, address };
      } catch (error) {
         const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
         console.error('Connection failed:', error);
         return { success: false, error: errorMessage };
      }
   };

   // ✅ Fixed: consistent loadBalances
   const loadBalances = async (
      address: string,
      provider: BrowserProvider
   ): Promise<void> => {
      try {
         const lotToken = new Contract(
            CONTRACT_ADDRESSES.LOT_TOKEN,
            CONTRACT_ABIS.LOT_TOKEN,
            provider
         );

         const ethBalance = await provider.getBalance(address);
         const lotBalance = await lotToken.balanceOf(address);

         // Fetch decimals dynamically in case LOT_TOKEN != 18
         const decimals = await lotToken.decimals();

         setBalances({
            eth: ethers.formatEther(ethBalance),
            lot: ethers.formatUnits(lotBalance, decimals),
         });
      } catch (error) {
         console.error('Failed to load balances:', error);
      }
   };

   // Stake tokens
   const stakeTokens = async (
      amount: bigint,
      poolId: number
   ): Promise<TransactionResult> => {
      try {
         if (!contracts.lotToken || !contracts.lotStaking) {
            throw new Error('Contracts not initialized');
         }

         const stakeAmount = ethers.parseEther(amount.toString());

         // Approve
         const approveTx = await contracts.lotToken.approve(
            CONTRACT_ADDRESSES.LOT_STAKING,
            stakeAmount
         );
         await approveTx.wait();

         // Stake
         const stakeTx = await contracts.lotStaking.stake(stakeAmount, poolId);
         await stakeTx.wait();

         // Reload balances
         if (provider) {
            await loadBalances(account, provider);
         }

         return { success: true, txHash: stakeTx.hash };
      } catch (error) {
         const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
         console.error('Staking failed:', error);
         return { success: false, error: errorMessage };
      }
   };

   // Get user stakes
   const getUserStakes = async (): Promise<StakeInfo[]> => {
      try {
         if (!account || !provider) return [];

         const contract = new ethers.Contract(
            CONTRACT_ADDRESSES.LOT_STAKING,
            CONTRACT_ABIS.LOT_STAKING,
            signer || provider
         );

         const stakes: RawStake[] = await contract.getUserStakes(account);

         const formattedStakes: StakeInfo[] = stakes.map((stake, index) => ({
            id: index,
            amount: ethers.formatEther(stake.amount),
            poolId: stake.poolId.toString(),
            startTime: new Date(Number(stake.startTime) * 1000),
            endTime: new Date(Number(stake.endTime) * 1000),
            withdrawn: stake.withdrawn,
            poolInfo: STAKING_POOLS[
               stake.poolId.toString() as keyof typeof STAKING_POOLS
            ] as StakingPool,
         }));

         return formattedStakes;
      } catch (error) {
         console.error('Failed to get user stakes:', error);
         return [];
      }
   };

   const getPendingRewards = async (stakeId: number): Promise<string> => {
      try {
         if (!contracts.lotStaking || !account) return '0';

         const rewards: bigint =
            await contracts.lotStaking.calculatePendingRewards(
               account,
               stakeId
            );
         return ethers.formatEther(rewards);
      } catch (error) {
         console.error('Failed to get pending rewards:', error);
         return '0';
      }
   };

   const claimRewards = async (stakeId: number): Promise<TransactionResult> => {
      try {
         if (!contracts.lotStaking) {
            throw new Error('Staking contract not initialized');
         }

         const claimTx = await contracts.lotStaking.claimRewards(stakeId);
         await claimTx.wait();

         if (provider) {
            await loadBalances(account, provider);
         }

         return { success: true, txHash: claimTx.hash };
      } catch (error) {
         const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
         console.error('Claim rewards failed:', error);
         return { success: false, error: errorMessage };
      }
   };

   const unstakeTokens = async (
      stakeId: number
   ): Promise<TransactionResult> => {
      try {
         if (!contracts.lotStaking) {
            throw new Error('Staking contract not initialized');
         }

         const unstakeTx = await contracts.lotStaking.unstake(stakeId);
         await unstakeTx.wait();

         if (provider) {
            await loadBalances(account, provider);
         }

         return { success: true, txHash: unstakeTx.hash };
      } catch (error) {
         const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
         console.error('Unstaking failed:', error);
         return { success: false, error: errorMessage };
      }
   };

   const getContractStats = async (): Promise<Partial<ContractStats>> => {
      try {
         if (!contracts.lotStaking) return {};

         const stats: RawContractStats =
            await contracts.lotStaking.getContractStats();

         return {
            totalStaked: ethers.formatEther(stats.totalStaked_),
            totalRewards: ethers.formatEther(stats.totalRewardsDistributed_),
            totalBurned: ethers.formatEther(stats.totalFeesBurned_),
            contractBalance: ethers.formatEther(stats.contractBalance),
         };
      } catch (error) {
         console.error('Failed to get contract stats:', error);
         return {};
      }
   };

   return {
      account,
      balances,
      contracts,
      provider,
      signer,
      connectWallet,
      stakeTokens,
      getUserStakes,
      getPendingRewards,
      claimRewards,
      unstakeTokens,
      getContractStats,
      STAKING_POOLS,
      FEE_CONFIG,
   } as const;
};

export type LoteraaDePINHook = ReturnType<typeof useLoteraaDePIN>;
