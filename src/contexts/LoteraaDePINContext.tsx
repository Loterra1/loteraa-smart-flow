import React, { createContext, useContext } from 'react';
import { useLoteraaDePIN, LoteraaDePINHook } from './LoteraaDePIN';

// Create context
const LoteraaDePINContext = createContext<LoteraaDePINHook | undefined>(
   undefined
);

// Provider
export const LoteraaDePINProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const loteraa = useLoteraaDePIN();
   return (
      <LoteraaDePINContext.Provider value={loteraa}>
         {children}
      </LoteraaDePINContext.Provider>
   );
};

// Hook for using the context
export const useLoteraaDePINContext = (): LoteraaDePINHook => {
   const ctx = useContext(LoteraaDePINContext);
   if (!ctx) {
      throw new Error(
         'useLoteraaDePINContext must be used within LoteraaDePINProvider'
      );
   }
   return ctx;
};
