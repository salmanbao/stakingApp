import { useMemo, useState } from "react";
import { BigNumber, Signer } from "ethers";
import { tokens } from "../utils/contracts";
import { getSigner } from "../utils/connectors";
import { ERC20 } from "../typechain";
import { useWeb3React } from "@web3-react/core";

export const useAllowance = (stakingToken:string,pool:string,loading:boolean) => {
  const [isApproved, setIsApproved] = useState(false);
  const { account } = useWeb3React();
  useMemo(async () => {
    const signer:Signer = await getSigner();
    const token: ERC20 = tokens[stakingToken](signer);
    const allowance = await token.allowance(
      await signer.getAddress(),
      pool
    );
    if (allowance.eq(BigNumber.from(0))) setIsApproved(false);
    else setIsApproved(true);
  }, [isApproved,loading,account]);
  return isApproved;
};
