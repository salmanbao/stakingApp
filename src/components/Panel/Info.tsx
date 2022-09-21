import Card from "../Card";
import Button from "../Button";
import Overlay from "../Overlay";
import { BigNumber } from "ethers";
import toast from "react-hot-toast";
import { BiLock } from "react-icons/bi";
import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useWeb3React } from "@web3-react/core";
import { useStaked } from "../../hooks/useStaked";
import { useVesting } from "../../hooks/useVesting";
import { Link, useLocation } from "react-router-dom";
import { usePendings } from "../../hooks/usePendings";
import { useTimeDiff } from "../../hooks/useCountdown";
import { HiOutlineExternalLink } from "react-icons/hi";
import { usePrice, TokenInfo } from "../../hooks/usePrice";
import { useVestingPanel } from "../../hooks/useVestingPanel";
import { contracts, DEFAULT_CHAINID, toHex } from "../../utils/constants";
import { useTokenBalance } from "../../hooks/useTokenBalance";

interface RefreshProps {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Info({ refresh, setRefresh }: RefreshProps) {
  const vestRewards = useVesting();
  const { pathname } = useLocation();
  const { locked } = useVestingPanel();
  const tokenInfo: TokenInfo = usePrice();
  const lpBalance = useTokenBalance("lp",refresh);
  const smcwBalance = useTokenBalance("smcw",refresh);
  const { chainId, active,account } = useWeb3React();
  const [isInfoOpen, setInfoOpen] = useState(true);
  const [showLocked, setShowLocked] = useState(false);
  const { smcw_Rewards, lp_rewards, total } = usePendings();
  const { smcw_staked, lp_staked, total_staked } = useStaked();
  const [isTotalRewardsOpen, setTotalRewardsOpen] = useState(true);
  const { days, hours, minutes, seconds } = useTimeDiff(
    locked.length ? locked[locked.length - 1][3] : BigNumber.from("0")
  );
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1280) {
        setTotalRewardsOpen(true);
        setInfoOpen(true);
      }
    });
    if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
      setShowLocked(true);
    }
    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth >= 1280) {
          setTotalRewardsOpen(true);
          setInfoOpen(true);
        }
      });
    };
  }, [refresh, locked, days, chainId,account]);

  const vest = async () => {
    try {
      await vestRewards();
      window.location.reload();
    } catch (error: any) {
      toast.error(error.reason);
    }
  };

  return (
    <section className="max-w-screen-2xl mx-auto">
      {/* Staking Pools */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <h1 className="section-heading-1">Info Panel</h1>
        <div className="text-sm flex flex-col lg:flex-row items-start lg:items-center gap-2 w-full lg:w-auto overflow-hidden">
          <p className="text-design-grey whitespace-nowrap">Staking pools:</p>
          <div className="w-full overflow-auto card-1 !bg-transparent !border-0 lg:!border lg:!bg-design-background2 !rounded-none lg:!rounded-3xl !p-0 lg:!p-1 flex items-center gap-3 lg:gap-0">
            <Link
              to="/"
              className={
                pathname === "/" ? "button-pools-active" : "button-pools"
              }
            >
              <img src="/images/coin.png" alt="" />
              SMCW
            </Link>
            <Link
              to="/ingame"
              className={
                pathname === "/ingame" ? "button-pools-active" : "button-pools"
              }
            >
              <img src="/images/logo.png" alt="" />
              INGAME
            </Link>
            <Link
              to="/"
              className="button-pools opacity-50 pointer-events-none"
            >
              <img src="/images/handshake.png" alt="" />
              PARTNER
            </Link>
            <Link
              to="/"
              className="button-pools opacity-50 pointer-events-none"
            >
              <img src="/images/star.png" alt="" />
              EVENTS
            </Link>
          </div>
          <Link
            to="/vesting"
            className="gradient-1 button-3 mt-3 lg:mt-0 lg:ml-3 !w-fit whitespace-nowrap !px-6"
          >
            CLAIM / VESTING PANEL <HiOutlineExternalLink />
          </Link>
        </div>
      </div>
      <div className="flex justify-between flex-col xl:flex-row gap-8 mt-6">
        {/* SMCW Rewards */}

        <Card className="flex-1">
          {(!active || DEFAULT_CHAINID !== toHex(chainId)) && (
            <Overlay>Connect your wallet to access this panel.</Overlay>
          )}
          <Button
            onClick={() => setTotalRewardsOpen(!isTotalRewardsOpen)}
            className="text-xl flex xl:hidden justify-between items-center gap-4 w-full"
          >
            <h3 className="card-heading-1">Total SMCW Rewards</h3>
            <FiChevronDown />
          </Button>
          <h3 className="card-heading-1 !hidden xl:!block">
            Total SMCW Rewards
          </h3>
          <div
            className="overflow-hidden"
            style={{
              maxHeight: isTotalRewardsOpen ? "2000px" : "0px",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-6">
              <div className="balance-item">
                <h4 className="card-heading-4">Available in Wallet</h4>
                <p className="balance-1">
                  <img src="/images/coin.png" alt="" />
                  {smcwBalance}
                </p>
              </div>
              <div className="balance-item">
                <h4 className="card-heading-4">Staked Tokens</h4>
                <p className="balance-1">
                  <img src="/images/coin.png" alt="" />
                  {smcw_staked}
                </p>
              </div>
              <div className="balance-item">
                <h4 className="card-heading-4">Pending Rewards</h4>
                <p className="balance-1">
                  <img src="/images/coin.png" alt="" />
                  {smcw_Rewards}
                </p>
              </div>
            </div>
            {/* LP Rewards */}
            <div className="gradient-1 p-px rounded-2xl lg:rounded-lg mt-4">
              <div className="bg-design-background5 py-3 px-3 rounded-2xl lg:rounded-lg">
                <h3 className="card-heading-3 !mb-2">
                  <img src="/images/lp.png" alt="" />
                  Rewards
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                  <div className="balance-item">
                    <h4 className="card-heading-4">Available in Wallet</h4>
                    <p className="balance-1">
                      <img src="/images/lp.png" alt="" />
                      {lpBalance}
                    </p>
                  </div>
                  <div className="balance-item">
                    <h4 className="card-heading-4">Staked Tokens</h4>
                    <p className="balance-1">
                      <img src="/images/lp.png" alt="" />
                      {lp_staked}
                    </p>
                  </div>
                  <div className="balance-item">
                    <h4 className="card-heading-4">Pending Rewards</h4>
                    <p className="balance-1">
                      <img src="/images/coin.png" alt="" />
                      {lp_rewards}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="balance-item mt-4">
              <h4 className="card-heading-4 justify-end">
                Total Pending Rewards
              </h4>
              <p className="balance-1 justify-end">
                <img src="/images/coin.png" alt="" />
                {parseFloat(total)}
              </p>
            </div>
            <p className="mt-4 text-center lg:text-left">
              *You can claim rewards once/week. Rewards must vest for 1 month.{" "}
              <Link to="/vesting" className="external-link">
                Vesting LOG
              </Link>
            </p>
            {/* Todo: Add a locked state here */}
            {showLocked ? (
              <Button className="gradient-1 button-3 mt-3 cursor-not-allowed">
                <BiLock className="text-xl" /> Locked: {days}d {hours}h{" "}
                {minutes}m {seconds}s (Remaining Time)
              </Button>
            ) : (
              <Button onClick={vest} className="gradient-1 button-3 mt-3">
                VEST SMCW REWARDS NOW (1 month) <HiOutlineExternalLink />
              </Button>
            )}
          </div>
        </Card>

        {/* SMCW Info */}

        <Card className="flex-1">
          <Button
            onClick={() => setInfoOpen(!isInfoOpen)}
            className="text-xl flex xl:hidden justify-between items-center gap-4 w-full"
          >
            <h3 className="card-heading-1">SMCW Info</h3>
            <FiChevronDown />
          </Button>
          <h3 className="card-heading-1 !hidden xl:!block">SMCW Info</h3>
          <div
            className="overflow-hidden"
            style={{
              maxHeight: isInfoOpen ? "2000px" : "0px",
            }}
          >
            <div className="flex items-start lg:items-center flex-col lg:flex-row mt-6 gap-4 max-w-full">
              <p className="tag-1">
                BSC <img src="/images/Binance.png" alt="" />
              </p>
              <p className="flex items-center w-full max-w-full">
                Contract
                <span
                  className="inline-block text-design-pink ml-3 truncate"
                  style={{
                    maxWidth: "68%",
                  }}
                >
                  {tokenInfo.platform.token_address}
                </span>
                <button
                  className="min-w-fit ml-3"
                  onClick={() => {
                    window.navigator.clipboard.writeText(
                      contracts[DEFAULT_CHAINID].smcw
                    );
                    toast.success("Copied to clipboard");
                  }}
                >
                  <img src="/images/link.png" alt="" />
                </button>
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-3">
              <div className="grid grid-cols-2 gap-1">
                <p className="text-design-grey">Total Staked in DApp</p>
                <div className="flex items-start lg:items-center">
                  <img
                    src="/images/coin.png"
                    alt=""
                    className="w-5 h-5 object-contain object-center mr-2 mt-0.5 lg:mt-0"
                  />
                  <p className="flex flex-col lg:flex-row items-start lg:items-end leading-5">
                    {total_staked}
                    <span className="text-design-grey text-xs mt-1 lg:mt-0 lg:ml-2">
                      ${" "}
                      {(
                        parseFloat(total_staked) * tokenInfo.quote?.USD?.price
                      ).toFixed(4)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <p className="text-design-grey">Total Supply</p>
                <div className="flex items-center">
                  <img
                    src="/images/coin.png"
                    alt=""
                    className="w-5 h-5 object-contain object-center mr-2"
                  />
                  <p className="flex items-end leading-5">
                    {tokenInfo.max_supply}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <p className="text-design-grey">Circulating Supply</p>
                <div className="flex items-center">
                  <img
                    src="/images/coin.png"
                    alt=""
                    className="w-5 h-5 object-contain object-center mr-2"
                  />
                  <p className="flex items-end leading-5">
                    {tokenInfo.max_supply}
                  </p>
                </div>
              </div>
            </div>
            {/* Buy */}
            <div className="grid grid-cols-1 md:grid-cols-4 mt-8 md:mt-24">
              <div className="mb-4 lg:mb-0">
                <h4 className="card-heading-4 !border-b-2 !pb-1.5 !mb-3">
                  Buy SMCW
                </h4>
                <div className="flex items-center gap-2">
                  <a
                    href="https://pancakeswap.finance/swap?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&&outputCurrency=0xb2ea51BAa12C461327d12A2069d47b30e680b69D"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/images/icons/1.png" alt="" />
                  </a>
                  <a
                    href="https://www.huobi.com/en-us/exchange/smcw_usdt/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/images/icons/2.png" alt="" />
                  </a>
                  <a
                    href="https://www.mexc.com/exchange/SMCW_USDT"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/images/icons/3.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="mb-4 lg:mb-0">
                <h4 className="card-heading-4 !border-b-2 !pb-1.5 !mb-3">
                  Price tracking
                </h4>
                <div className="flex items-center gap-2">
                  <a
                    href="https://coinmarketcap.com/currencies/space-misfits/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/images/icons/4.png" alt="" />
                  </a>
                  <a
                    href="https://www.coingecko.com/en/coins/space-misfits"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/images/icons/5.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="mb-4 lg:mb-0">
                <h4 className="card-heading-4 !border-b-2 !pb-1.5 !mb-3">
                  Whitepaper
                </h4>
                <div className="flex items-center gap-2">
                  <a
                    href="https://space-misfits.gitbook.io/whitepaper/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/images/icons/6.png" alt="" />
                  </a>
                </div>
              </div>
              <div>
                <h4 className="card-heading-4 !border-b-2 !pb-1.5 !mb-3">
                  Audit
                </h4>
                <div className="flex items-center gap-2">
                  <a
                    href="https://staking.spacemisfits.com/static/media/20220418_Paladin_SpaceMisfitsStaking_Final_Report.8ae6fb80860aeb7ca8d8.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/images/icons/7.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
