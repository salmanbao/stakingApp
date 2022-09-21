import Staking from "../Staking";
import Overlay from "../Overlay";
import { useApr } from "../../hooks/useApr";
import { useWeb3React } from "@web3-react/core";
import { useSigner } from "../../hooks/useSigner";
import { HiOutlineExternalLink } from "react-icons/hi";
import { contracts, DEFAULT_CHAINID, toHex } from "../../utils/constants";
import { getStakingPool01, getStakingPool02 } from "../../utils/contracts";

interface RefreshProps {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SMCW({ refresh, setRefresh }: RefreshProps) {
  const signer = useSigner();
  const { swcw, lp,pool1Avarage,pool2Avarage } = useApr();
  const { chainId ,active } = useWeb3React();


  const pool1 = getStakingPool01(signer);
  const pool2 = getStakingPool02(signer);

  return (
    <section className="max-w-screen-2xl mx-auto">
      <h1 className="section-heading-1">
        <img src="/images/coin.png" alt="" /> SMCW
      </h1>
      <p className="flex items-center gap-2 mt-4">
        SMCW Staking
        <button className="tag-1">
          BSC <img src="/images/Binance.png" alt="" />
        </button>
      </p>
      <div className="relative flex gap-6 mt-9 flex-col lg:flex-row">
        {(!active ||DEFAULT_CHAINID !== toHex(chainId)) && (
          <Overlay>
            <div className="flex flex-col justify-center items-center gap-4">
              <p>Not available yet</p>
              <p className="text-design-blue">
                Please Connect to
                <span className="tag-1 !inline-flex mx-1 text-white">
                  BSC <img src="/images/Binance.png" alt="" />
                </span>
                Network through your Connected Wallet
              </p>
              <a
                className="text-design-blue flex items-center gap-1"
                href="https://space-misfits.gitbook.io"
                target="_blank"
                rel="noreferrer"
              >
                Not sure how? Check our guides <HiOutlineExternalLink />
              </a>
            </div>
          </Overlay>
        )}
        <Staking
          refresh={refresh}
          setRefresh={setRefresh}
          apr={swcw}
          pool={pool1}
          avarage={pool1Avarage}
          poolAddress={contracts[DEFAULT_CHAINID].smcwTosmcw}
          title="SMCW Staking"
          defaultAmount="0.0"
          stakingType="smcw"
        />
        <Staking
          refresh={refresh}
          setRefresh={setRefresh}
          apr={lp}
          pool={pool2}
          avarage={pool2Avarage}
          poolAddress={contracts[DEFAULT_CHAINID].lpTosmcw}
          title="BUSD/SMCW LP"
          defaultAmount="0.0"
          stakingType="lp"
        />
      </div>
    </section>
  );
}
