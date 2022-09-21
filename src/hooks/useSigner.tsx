import { useWeb3React } from "@web3-react/core";
import { ethers, Signer } from "ethers";
import { useMemo, useState } from "react";
import { DEFAULT_CHAINID } from "../utils/constants";

export const useSigner = () => {
  const [signer, setSigner] = useState<any>();

  useMemo(async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      setSigner(provider.getSigner());
    } catch (error) {
      console.log(error);
    }
  }, []);
  return signer;
};
