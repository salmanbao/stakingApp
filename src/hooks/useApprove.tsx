import { useCallback, useState } from "react";
import { MaxUint256 } from "@ethersproject/constants";
import {  tokens } from "../utils/contracts";
import { getSigner } from "../utils/connectors";
import { Signer } from "ethers";
import { ERC20 } from "../typechain";

export const useApprove = (name:string) => {
  const [txResponse , setResponse] = useState<any>(null)
  return useCallback(
    async ( to: string): Promise<void> => {
      const signer:Signer = await getSigner();
      let token: ERC20 = tokens[name](signer);
      try {
        const tx = await token.approve(to, MaxUint256.toString())
        let res = await tx.wait()
        setResponse(res)
      } catch (error) {
        console.log(error);
      }
    },
    [name,txResponse]
  );
};
