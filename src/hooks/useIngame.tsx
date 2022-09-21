import { useCallback, useMemo, useState } from "react";
import { Signer, utils } from "ethers";
import { getIngamePool } from "../utils/contracts";
import { getSigner } from "../utils/connectors";
import { useWeb3React } from "@web3-react/core";
const { formatUnits } = utils;


export const useStake = () => {
  return useCallback(async (claimAmount: string) => {
    const signer: Signer = await getSigner();
    const pool = getIngamePool(signer);
    const tx = await pool.stake(claimAmount);
    await tx.wait()
  }, []);
};

export const useUnstake = () => {
  return useCallback(async (claimAmount: string) => {
    const signer: Signer = await getSigner();
    const pool = getIngamePool(signer);
    const tx = await pool.unstake(claimAmount);
    await tx.wait()
  }, []);
};

export const useClaim = () => {
  return useCallback(async (claimAmount: string) => {
    const signer: Signer = await getSigner();
    const pool = getIngamePool(signer);
    const tx = await pool.claim(claimAmount);
    await tx.wait()
  }, []);
};

export const useIngameUserInfo = () => {
  const { account } = useWeb3React();
  const [userRewards, setRewards] = useState("0");
  const [stakedAmount, setStakedAmount] = useState("0");

  useMemo(async () => {
    const signer: Signer = await getSigner();
    const pool = getIngamePool(signer);
    let {amount,rewards} = await pool.poolStakers(await signer.getAddress())
    setRewards(rewards.toString())
    setStakedAmount(formatUnits(amount.toString(),"ether"))
  }, [userRewards,stakedAmount,account]);
  return { stakedAmount,userRewards };
};
