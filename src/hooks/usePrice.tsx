import { useMemo, useState } from "react";

interface Platform {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  token_address: string;
}

interface Info {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: null;
  last_updated: string;
}

export interface TokenInfo {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: string[];
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  platform: Platform;
  is_active: number;
  cmc_rank: number;
  is_fiat: number;
  self_reported_circulating_supply: number;
  self_reported_market_cap: number;
  tvl_ratio: null;
  last_updated: string;
  quote: {
    USD: Info;
  };
}

const DEFAULT_VALUE: TokenInfo = {
  id: 0,
  name: "Space Misfits",
  symbol: "SMCW",
  slug: "space-misfits",
  num_market_pairs: 3,
  date_added: "2022-01-03T03:58:28.000Z",
  tags: ["collectibles-nfts", "gaming", "ethereum-ecosystem", "play-to-earn"],
  max_supply: 200000000,
  circulating_supply: 0,
  total_supply: 200000000,
  platform: {
    id: 1839,
    name: "BNB",
    symbol: "BNB",
    slug: "bnb",
    token_address: "0xb2ea51BAa12C461327d12A2069d47b30e680b69D",
  },
  is_active: 1,
  cmc_rank: 4023,
  is_fiat: 0,
  self_reported_circulating_supply: 12214476,
  self_reported_market_cap: 487704.02951344335,
  tvl_ratio: null,
  last_updated: "2022-07-02T11:43:00.000Z",
  quote: {
    USD: {
      price: 0,
      volume_24h: 67343.53455423,
      volume_change_24h: -28.9032,
      percent_change_1h: 0.01485443,
      percent_change_24h: 0.18992648,
      percent_change_7d: -5.45794101,
      percent_change_30d: -34.47879546,
      percent_change_60d: -52.83405972,
      percent_change_90d: -87.80201594,
      market_cap: 0,
      market_cap_dominance: 0,
      fully_diluted_market_cap: 7985672.57,
      tvl: null,
      last_updated: "2022-07-02T11:43:00.000Z",
    },
  },
};
export const usePrice = (): TokenInfo => {
  const [price, setPrice] = useState<TokenInfo>(DEFAULT_VALUE);
  useMemo(async () => {
    try {
        const res = await fetch(new URL("/price/", process.env.REACT_APP_SERVER_URL));
        const data:TokenInfo = await res.json();
        setPrice({...data});
    } catch (error) {
        
    }
   
  }, []);
  return price;
};
