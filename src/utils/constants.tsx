import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";

interface Addresses {
  [key:string]:{
    smcw:string,
    lp:string,
    vesting:string,
    smcwTosmcw:string,
    lpTosmcw:string,
    nftStaking:string,
  }
}
export const contracts :Addresses=  {
  "0x3": {
    smcw: "0x84912D20fe615764843cf634d3b25039e6F9f2A7",
    lp: "0x48C4Ec7045c7AFdd4cCF62f61720bb030B629B96",
    vesting: "0x0B2f2b8f94b6b38251f90b116E20fdD20fd7c52D",
    smcwTosmcw: "0x8b9d5494cCA034a0D584d4017b5E49d1a75BeAaC",
    lpTosmcw: "0x48802c713ba983869a3b40F4E2885F84d6796492",
    nftStaking: "0x1E1FEEbB22918eD9E82dE7891A784DBf4cf119ed",
  },
  "0x61": {
    smcw: "0xDfcF651Aca3938422a00d82Ed2a5BE9D3d8Eb9df",
    lp: "0xEf5bFde4e28f30d3b904f376e11D40E2771EBB02",
    vesting: "0x9082EB30d9256310c05f3EE627cD423474fB4BAd",
    smcwTosmcw: "0x1Eb3BdfD727f16B02E9d04CAA2ae44ea7b13C375",
    lpTosmcw: "0x43f8cF443d67A301Af1fBd99737b17E2fD745CF2",
    nftStaking: "0xA2170D4D66Ef9acB157FF868272e77b449FAb584",
  },
};

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ETH_DECIMAL = parseEther("1");
export const PERCENT = BigNumber.from("100");

// export const REWARDS_PER_BLOCK = BigNumber.from("0.3475");

// estimated blocks per year
export const TOTAL_BLOCK_PER_YEAR =BigNumber.from("2370675");

export const DEFAULT_CHAINID = "0x3" ;



export const toHex = function(chainId:number|undefined):string {
  return "0x".concat(chainId?.toString(16) || "3")
}