import { Signer } from "ethers";

import {
  Locker__factory,
  MasterChef__factory,
  Locker,
  MasterChef,
  ERC20,
  ERC20__factory,
  NFTRewards__factory,
  NFTRewards,
} from "../typechain";

import { contracts, DEFAULT_CHAINID } from "./constants";

export const getStakingPool01 = (
  singer: Signer
): MasterChef => {
  return MasterChef__factory.connect(contracts[DEFAULT_CHAINID].smcwTosmcw, singer);
};

export const getStakingPool02 = (
  singer: Signer,
): MasterChef => {
  return MasterChef__factory.connect(contracts[DEFAULT_CHAINID].lpTosmcw, singer);
};

export const getSMCW = (signer: Signer): ERC20 => {
  return ERC20__factory.connect(contracts[DEFAULT_CHAINID].smcw, signer);
};

export const getLP = (singer: Signer): ERC20 => {
  return ERC20__factory.connect(contracts[DEFAULT_CHAINID].lp, singer);
};

export const getVesting = (singer: Signer): Locker => {
  return Locker__factory.connect(contracts[DEFAULT_CHAINID].vesting, singer);
};
export const getIngamePool = (singer: Signer): NFTRewards => {
  return NFTRewards__factory.connect(contracts[DEFAULT_CHAINID].nftStaking, singer);
};

export const tokens: { [key: string]: any } = {
  smcw: getSMCW,
  lp: getLP,
};
