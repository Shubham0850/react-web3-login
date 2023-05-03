// useMetaMask.js
import { useState, useCallback } from "react";

function useMetaMask() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const connectToMetaMask = useCallback(async () => {
	// @ts-ignore
    if (typeof window.ethereum !== "undefined") {
      try {
		// @ts-ignore
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const currentAccount = accounts[0];
        setAccount(currentAccount);
        setError(null);
        return currentAccount;
      } catch (err) {
        setError(`${err}`);
        return null;
      }
    } else {
      setError("MetaMask is not installed.");
      return null;
    }
  }, []);

  return { account, error, connectToMetaMask };
}

export default useMetaMask;
