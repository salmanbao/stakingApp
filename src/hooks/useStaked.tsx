import { useMemo, useState } from "react";
import { ethers, Signer } from "ethers";
import { getIngamePool, getStakingPool01, getStakingPool02 } from "../utils/contracts";
import { getSigner } from "../utils/connectors";
import { useWeb3React } from "@web3-react/core";

export const useStaked = () => {
  const { account } = useWeb3React();
  const [lp_staked, setlpStaked] = useState("0");
  const [smcw_staked, setsmceStaked] = useState("0");
  const [total_staked, setTotalStaked] = useState("0");

  useMemo(async () => {
    const signer: Signer = await getSigner();
    const pool1 = getStakingPool01(signer);
    const pool2 = getStakingPool02(signer);
    const pool3 = getIngamePool(signer);
    let amount0 = await pool1.getCurrentStaked(await signer.getAddress());
    let amount1 = await pool2.getCurrentStaked(await signer.getAddress());
    // TODO: Also add the current staked amount in the total staked in dapp
    let amount3 = await pool3.getCurrentStaked();
    
    setsmceStaked(
      ethers.utils.formatUnits(amount0.toString(), "ether")
    );
    setlpStaked(
      ethers.utils.formatUnits(amount1.toString(), "ether")
    );
    setTotalStaked(
      ethers.utils.formatUnits(amount0.add(amount1).add(amount3).toString(),"ether")
    )
  }, [account]);
  return {smcw_staked,lp_staked,total_staked};
};
