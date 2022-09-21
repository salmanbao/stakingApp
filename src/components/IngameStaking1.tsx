import Card from "./Card";
import  { NumberInput } from "./Input";
import {  useState } from "react";
import { FiDownload, FiInfo } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";
import Button from "./Button";
import toast from "react-hot-toast";
import { useAllowance } from "../hooks/useAllowance";
import { contracts, DEFAULT_CHAINID } from "../utils/constants";
import { useApprove } from "../hooks/useApprove";
import { useTokenBalance } from "../hooks/useTokenBalance";
import {
  useIngameUserInfo,
  useStake,
  useUnstake,
} from "../hooks/useIngame";
import { parseEther } from "ethers/lib/utils";
import { useNFTPendings } from "../hooks/usePendings";


export default function IngameStaking1() {
  const stakingType = "smcw";
  const [enjinAddress, setEnjinAddress] = useState("");
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [unstakeAmount, setUnstakeAmount] = useState<string>("");
  const [claimAmount, setClaimAmount] = useState<string>("0");
  const [type, setType] = useState<"stake" | "unstake">("stake");
  const [isLoading, setIsLoading] = useState(false);

  const stake = useStake();
  const unstake = useUnstake();

  const { pendings,estimated } = useNFTPendings();
  const userInfo = useIngameUserInfo();
  const approve = useApprove(stakingType);
  const smcwBalance = useTokenBalance(stakingType,isLoading);
  const isApproved = useAllowance(
    stakingType,
    contracts[DEFAULT_CHAINID].nftStaking,
    isLoading
  );

  const handleStake = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await stake(parseEther(stakeAmount).toString());
    toast.success(`Stake Amount: ${stakeAmount}`);
    window.location.reload();
  };

  const handleUnstake = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await unstake(parseEther(unstakeAmount).toString());
    toast.success(`Unstake Amount: ${unstakeAmount}`);
    window.location.reload();
  };

  const handleClaim = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @note integrate enjin apis and then execute claim transaction
    try {
      if (enjinAddress.length !== 42) {
        toast.error("Address is not correct");
      }
      console.log(process.env.REACT_APP_SERVER_URL)
      // await claim(claimAmount);
      const result = await fetch(
        `${
          process.env.REACT_APP_SERVER_URL
        }/mint?walletId=${enjinAddress}&value=${claimAmount}`
      );
      if (result.status == 200) {
        const tx = await result.json();
        toast.success(`Claimed successfully with Transaction Id ${tx.id}`);
        // window.location.reload();
      }
    } catch (error) {
      console.log(error)
      toast.error("Please stake before claim");
    }
  };

  return (
    <Card className="flex-1">
      <div className="flex items-start lg:items-center justify-between gap-1 text-2xl font-semibold">
        <div className="flex items-center gap-2">
          <div className="card-icon-2">
            <img src="/images/icons/game1.png" alt="" />
          </div>
          <h2 className="text-base lg:text-2xl">
            Hidden data <br className="lg:hidden" /> (Telemetry of choice)
          </h2>
        </div>
        <div className="text-xs py-2 px-3 bg-design-darkBlue border border-design-blue rounded-lg leading-5">
          1000SMCW = 1/day
          <br />
          Max: 20/day
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4">
        <div className="border border-design-darkBlue rounded-xl overflow-hidden">
          <div className="flex gap-6 bg-design-darkBlue px-4 pt-1">
            <button
              className={`font-semibold py-3 ${
                type === "stake"
                  ? "link-active-2"
                  : "border-b-2 border-transparent"
              }`}
              onClick={() => setType("stake")}
            >
              Stake
            </button>
            <button
              className={`font-semibold py-3 ${
                type === "unstake"
                  ? "link-active-2"
                  : "border-b-2 border-transparent"
              }`}
              onClick={() => setType("unstake")}
            >
              Unstake
            </button>
          </div>
          {type === "stake" ? (
            <form
              onSubmit={(e) => handleStake(e)}
              className="grid grid-cols-1 gap-2 p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <h3>Stake Amount</h3>
                <p className="text-sm flex items-center text-design-grey">
                  Wallet Balance:
                  <img
                    src="/images/coin.png"
                    alt=""
                    className="w-4 h-4 object-contain object-center ml-2 mr-1"
                  />
                  <span className="text-white">{smcwBalance}</span>
                </p>
              </div>
              <NumberInput
                placeholder="1000 (min) 20000 (max)"
                value={stakeAmount}
                setValue={setStakeAmount}
                min={1000}
                max={99999999}
                step={1000}
                decimalpoints={0}
                required
              />
              <p className="flex items-center text-sm text-design-darkBlue2">
                <FiInfo className=" mr-2" /> Only multiples of 1000
              </p>

              {isApproved ? (
                <Button type="submit" className="gradient-1 button-3 mt-4">
                  Increase / Stake <HiOutlineExternalLink />
                </Button>
              ) : (
                <Button
                  className={`gradient-1 button-3 mt-4 ${
                    isLoading ? "opacity-50 pointer-events-none" : ""
                  }`}
                  type="button"
                  onClick={async () => {
                    setIsLoading(true);
                    await approve(contracts[DEFAULT_CHAINID].nftStaking);
                    setIsLoading(false);
                  }}
                >
                  {isLoading ? "Approving..." : "Approve"}
                </Button>
              )}

              <p className="flex items-center text-sm mt-4">
                <FiInfo className="text-design-darkBlue2 mr-2" /> If you Stake
                for the first time the first transaction is only to approve your
                SMCW, after that you can start staking
              </p>
            </form>
          ) : (
            <form
              onSubmit={(e) => handleUnstake(e)}
              className="grid grid-cols-1 gap-2 p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <h3>Unstake Amount</h3>
                <p className="text-sm flex items-center text-design-grey">
                  Wallet Balance:
                  <img
                    src="/images/coin.png"
                    alt=""
                    className="w-4 h-4 object-contain object-center ml-2 mr-1"
                  />
                  <span className="text-white">{smcwBalance}</span>
                </p>
              </div>
              <NumberInput
                placeholder="100 (min) 2000 (max)"
                value={unstakeAmount}
                setValue={setUnstakeAmount}
                min={100}
                max={99999999}
                step={100}
                decimalpoints={0}
                required
              />
              <p className="flex items-center text-sm text-design-darkBlue2">
                <FiInfo className=" mr-2" /> Only multiples of 100
              </p>
              <Button type="submit" className="gradient-1 button-3 mt-2">
                Decrease / Unstake <HiOutlineExternalLink />
              </Button>
              <p className="flex items-center text-sm mt-4">
                <FiInfo className="text-design-darkBlue2 mr-2" /> If you Stake
                for the first time the first transaction is only to approve your
                SMCW, after that you can start staking
              </p>
            </form>
          )}
        </div>
        <div className="card-3 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-1">
          <div className="grid grid-cols-1 gap-1.5 lg:gap-3">
            <h5 className="text-design-grey">Your Pool Staked SMCW</h5>
            <p className="flex items-center gap-2">
              <img
                src="/images/coin.png"
                alt=""
                className="w-5 h-5 object-contain object-center mr-1"
              />
              {userInfo.stakedAmount}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-1.5 lg:gap-3">
            <h5 className="text-design-grey">Pending Rewards</h5>
            <p className="flex items-center gap-2">
              <img
                src="/images/icons/game1.png"
                alt=""
                className="w-5 h-5 object-contain object-center mr-1"
              />
              {pendings}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-1.5 lg:gap-3">
            <h5 className="text-design-grey">Estimated Rewards</h5>
            <p className="flex items-center gap-2">{estimated}</p>
          </div>
        </div>
        <div className="input">
          <input
          disabled={parseInt(pendings) > 0 ? false :true }
            value={enjinAddress}
            onChange={(e) => setEnjinAddress(e.target.value)}
            type="text"
            placeholder="Put your Enjin Wallet Address Here"
          />
        </div>
        <form onSubmit={(e) => handleClaim(e)}>
          {/* <Select
            options={[
              {
                value: "",
                label: "Select Telemetry of choice",
              },
              {
                value: "Type 1",
                label: "Type 1",
              },
              {
                value: "Type 2",
                label: "Type 2",
              },
            ]}
            value={telemetryType}
            onChange={(e) => setTelemetryType(e.target.value)}
            required
          /> */}

          <h3 className="mb-1">Claim Amount</h3>
          <NumberInput
            placeholder="Amount of rewards to claim"
            value={claimAmount}
            setValue={setClaimAmount}
            min={0}
            max={99999999}
            step={1}
            decimalpoints={0}
            required
          />
          <Button
            type="submit"
            disabled={parseInt(pendings) > 0 ? false :true }
            className="gradient-2 button-3 mt-4 border border-design-blue"
          >
            Claim Rewards <FiDownload />
          </Button>
        </form>
      </div>
    </Card>
  );
}
