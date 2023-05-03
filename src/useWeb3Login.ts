// src/useWeb3Login.ts
import { useState, useCallback } from "react";

export type WalletType = "metamask" | "phantom";

async function connectToWallet(walletType: WalletType): Promise<string | null> {
  // @ts-ignore
  if (walletType === "metamask" && typeof window.ethereum !== "undefined") {
    try {
      // @ts-ignore
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0] || null;
    } catch {
      return null;
    }
  } else if (walletType === "phantom" && (window as any).solana) {
    try {
      // @ts-ignore
      const solana = (window as any).solana;
      if (solana.isPhantom) {
        await solana.connect();
        return solana.publicKey.toString();
      }
    } catch {
      return null;
    }
  }

  return null;
}

export function useWeb3Login() {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const connect = useCallback(async (walletType: WalletType) => {
    try {
      const connectedAccount = await connectToWallet(walletType);
      if (connectedAccount) {
        setAccount(connectedAccount);
        setError(null);
      } else {
        throw new Error(`Failed to connect to ${walletType}`);
      }
    } catch (err) {
      setError(err as Error);
    }
  }, []);

  return { account, error, connect };
}
