import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { ethers, Signer } from "ethers";

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 80001, 57, 97],
});

const walletconnect = new WalletConnectConnector({
  qrcode: true,
  bridge: "https://bridge.walletconnect.org",
  rpc: { 1: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}` },
});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
};

export const getSigner = async (): Promise<Signer> => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  return provider.getSigner();
};


interface Chains {
  [key:string]:{
    chainId:string,
    rpcUrls:[string],
    chainName:string,
    nativeCurrency:{
      name:string,
      decimals:number,
      symbol:string
    },
    blockExplorerUrls:[string]
  }
}
export const chains:Chains = {
  "0x61": {
    chainId: "0x61",
    rpcUrls: [`https://data-seed-prebsc-1-s1.binance.org:8545`],
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: { name: "tBNB", decimals: 18, symbol: "tBNB" },
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
  "0x3": {
    chainId: "0x3",
    rpcUrls: [`https://ropsten.infura.io/v3/${process.env.INFURA_KEY}`],
    chainName: "Ropsten Test Network",
    nativeCurrency: { name: "ETH", decimals: 18, symbol: "ETH" },
    blockExplorerUrls: ["https://ropsten.etherscan.io"],
  },
};
