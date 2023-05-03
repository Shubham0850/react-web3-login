# React Web3 Login

A lightweight and easy-to-use React hook for connecting to multiple Web3 wallets like MetaMask and Phantom. Seamlessly integrate Web3 wallet authentication into your React applications with minimal configuration.

## Installation

Install the package using npm:

```sh
npm install react-web3-login
```

## Usage

To use the `useWeb3Login` hook, simply import it and call it within your React component:

```typescript
import React from 'react';
import { useWeb3Login, WalletType } from 'react-web3-login';

function App() {
  const { account, error, connect } = useWeb3Login();

  const handleConnect = async (walletType: WalletType) => {
    await connect(walletType);
  };

  return (
    <div>
      <button onClick={() => handleConnect('metamask')}>Connect to MetaMask</button>
      <button onClick={() => handleConnect('phantom')}>Connect to Phantom</button>
      {account && <p>Connected with address: {account}</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default App;
```

## API

The `useWeb3Login` hook returns the following properties and functions:

- `account` (string | null): The connected wallet address, or `null` if not connected.
- `error` (Error | null): An error object if an error occurred during the connection process, or `null` if no error.
- `connect(walletType: WalletType)`: A function to initiate the connection process. Takes a `walletType` parameter, which can be `'metamask'` or `'phantom'`.

## License

MIT