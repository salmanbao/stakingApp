import { useMemo, useState } from "react";
import { tokens } from "../utils/contracts";
import { ethers, Signer } from "ethers";
import { ERC20 } from "../typechain";
import { getSigner } from "../utils/connectors";
import { useWeb3React } from "@web3-react/core";

export const useTokenBalance = (name: string,isLoading:boolean) => {
  const [balance, setBalance] = useState("");
  const { account } = useWeb3React();
  useMemo(async () => {
    const signer:Signer = await getSigner();
    let token: ERC20 = tokens[name](signer);
    let b = await token.balanceOf(await signer.getAddress())
    setBalance(ethers.utils.formatUnits(b,"ether"));
  }, [name,isLoading,account]);
  return balance;
};


export const useTokenSupply = (name: string) => {
  const [supply, setSupply] = useState("");
  useMemo(async () => {
    const signer:Signer = await getSigner();
    let token: ERC20 = tokens[name](signer);
    let b = await token.totalSupply()
    setSupply(ethers.utils.formatUnits(b,"ether"));
  }, [name]);
  return supply;
};
