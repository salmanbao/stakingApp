import { Signer } from "ethers";
import { useCallback } from "react";
import { getSigner } from "../utils/connectors";
import { getVesting } from "../utils/contracts";

export const useVesting = () => {
  return useCallback(async (): Promise<void> => {
        const signer: Signer = await getSigner();
        const vesting = getVesting(signer);
        const tx = await vesting.vest()
        await tx.wait()
  }, []);
};
