import { useMemo, useState } from "react";
import { Signer } from "ethers";
import {
  getIngamePool,
  getStakingPool01,
  getStakingPool02,
  getVesting,
} from "../utils/contracts";
import { getSigner } from "../utils/connectors";
import { formatUnits } from "ethers/lib/utils";
import { useWeb3React } from "@web3-react/core";

function ToFixed(amount: string) {
  return parseFloat(amount).toFixed(4);
}

export const useVestingPanel = () => {
  const { account } = useWeb3React();
  const [Locked, setAllLocked] = useState<any[]>([]);
  const [PoolStakes, setAllStakes] = useState<any[]>([]);
  const [InGameLocks, setInGameLocker] = useState<any[]>([]);

  useMemo(async () => {
    const signer: Signer = await getSigner();
    const vesting = getVesting(signer);
    const pool1 = getStakingPool01(signer);
    const pool2 = getStakingPool02(signer);
    let stakes01 = await pool1.getStakes(await signer.getAddress());
    let stakes02 = await pool2.getStakes(await signer.getAddress());
    let locks = await vesting.getUserClaims(await signer.getAddress());
    function diffDays(time: number) {
      let current = Date.now() / 1000;
      if (time < current) return -1;
      return ((time - current) / 86400).toFixed(0);
    }

    function timePercentage(timestamp: number, time: number) {
      let current = Date.now() / 1000;
      let totalDays = (time - timestamp) / 86400;
      let currentDays = (current - timestamp) / 86400;
      if (time < current) return -1;
      return ((currentDays / totalDays) * 100).toFixed(0);
    }
    let stakes1 = stakes01.map((s, i) => {
      let date: Date = new Date(Math.ceil(s.timestamp.toNumber() * 1000));
      return {
        index: i,
        type: "stake",
        icon: "coin",
        pool: "SMCW",
        reward: "SMCW",
        action: "Unstake",
        state: "Locked",
        poolInstance: pool1,
        amount: ToFixed(formatUnits(s.amount, "ether")),
        weight: formatUnits(s.weight, "ether"),
        stakeFor: s.stakeFor,
        unlocksIn: diffDays(s.stakeUntill.toNumber()),
        timestamp: `${date.toLocaleString("en-GB", { timeZone: "UTC" })}`,
        percentage: timePercentage(
          s.timestamp.toNumber(),
          s.stakeUntill.toNumber()
        ),
      };
    });

    let stakes2 = stakes02.map((s, i) => {
      let date: Date = new Date(Math.ceil(s.timestamp.toNumber() * 1000));
      return {
        index: i,
        icon: "lp",
        type: "stake",
        pool: "SMCW LP",
        reward: "SMCW",
        action: "Unstake",
        state: "Locked",
        poolInstance: pool2,
        amount: ToFixed(formatUnits(s.amount, "ether")),
        weight: formatUnits(s.weight, "ether"),
        stakeFor: s.stakeFor,
        unlocksIn: diffDays(s.stakeUntill.toNumber()),
        timestamp: `${date.toLocaleString("en-GB", { timeZone: "UTC" })}`,
        percentage: timePercentage(
          s.timestamp.toNumber(),
          s.stakeUntill.toNumber()
        ),
      };
    });
    let formatLocks = locks.map((s, i) => {
      let date: Date = new Date(Math.ceil(s.vestingTime.toNumber() * 1000));

      return {
        index: i,
        icon: "coin",
        type: "vest",
        weight: "N/A",
        pool: "SMCW",
        reward: "SMCW",
        action: "Claim NOW",
        state: "Vesting",
        poolInstance: vesting,
        isClaimed: s.isClaimed,
        amount: ToFixed(formatUnits(s.amount, "ether")),
        unlocksIn: diffDays(s.vestingDuration.toNumber()),
        timestamp: `${date.toLocaleString("en-GB", { timeZone: "UTC" })}`,
        percentage: timePercentage(
          s.vestingTime.toNumber(),
          s.vestingDuration.toNumber()
        ),
      };
    });

    setInGameLocker([formatLocks]);
    setAllLocked(locks);
    setAllStakes([...stakes1, ...stakes2, ...formatLocks]);
  }, [account]);
  return {
    PoolStakes,
    InGameLocks,
    locked: Locked,
  };
};
