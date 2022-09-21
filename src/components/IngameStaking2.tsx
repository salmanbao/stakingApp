import Card from "./Card";
import { NumberInput } from "./Input";
import { useState } from "react";
import { FiDownload, FiInfo } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";
import Button from "./Button";
import toast from "react-hot-toast";
import { FaRegCheckSquare } from "react-icons/fa";
import Timer from "./Timer";

interface Props {
  title: string;
  remaining: number;
  image: string;
  locked?: boolean;
}

export default function IngameStaking2({
  title,
  remaining,
  image,
  locked = false,
}: Props) {
  const [stakeAmount, setStakeAmount] = useState<string>("");

  const handleStake = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success(`Stake Amount: ${stakeAmount}`);
  };

  const handleClaim = () => {
    toast.success("Claimed successfully");
  };

  return (
    <Card className="flex-1">
      <div className="flex items-start lg:items-center justify-between gap-3 text-2xl font-semibold">
        <div className="flex items-start lg:items-center gap-2">
          <div className="card-icon-2">
            <img src={image} alt="" />
          </div>
          <div>
            <h2 className="text-base lg:text-2xl h-12 lg:h-auto overflow-auto lg:overflow-hidden">
              {title}
            </h2>
            <p className="text-sm text-design-grey flex items-center mt-4 lg:mt-1 -ml-14 lg:ml-0">
              <span className="tag-3 mr-2">{remaining}</span> Remaining stake
              now
            </p>
          </div>
        </div>
        <div className="text-xs py-2 px-3 bg-design-darkBlue border border-design-blue rounded-lg leading-5">
          <p className="flex items-center justify-between">
            Stake
            <span className="flex items-center">
              <img
                src="/images/coin.png"
                alt=""
                className="w-3 h-3 object-contain object-center mx-1"
              />
              1000
            </span>
          </p>
          Lock 1 month (x1) <br />
          Total supply: (1000)
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4">
        {!locked && (
          <div>
            <p className="text-sm flex items-center justify-between">
              Your remaining time to claim{" "}
              <span className="text-design-grey text-xs font-semibold ml-1">
                76% completed
              </span>
            </p>
            <div className="bg-design-darkBlue w-full h-1.5 rounded-full overflow-hidden relative mt-2">
              <div className="absolute top-0 left-0 w-2/3 h-full gradient-4 rounded-full"></div>
            </div>
          </div>
        )}
        {locked && (
          <div className="card-3 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-1">
            <div className="flex flex-col items-center">
              <h4 className="text-design-grey mb-2 lg:mb-3">
                Whitelist unlocks in:
              </h4>
              <p className="flex items-center ml-0 lg:ml-1">
                <Timer targetDate={Date.now()} />
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-design-grey mb-2 lg:mb-3">
                Pool unlocks in:
              </h4>
              <Timer targetDate={Date.now()} />
              <p className="flex items-center ml-0 lg:ml-1"></p>
            </div>
          </div>
        )}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 mt-2 relative"
          style={{
            padding: locked ? "1rem" : "0 0 0 0",
          }}
        >
          <form
            onSubmit={(e) => handleStake(e)}
            className="grid grid-cols-1 gap-2"
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
                <span className="text-white">0.3</span>
              </p>
            </div>
            <NumberInput
              placeholder="1000 SMCW"
              value={stakeAmount}
              setValue={setStakeAmount}
              min={100}
              max={99999999}
              step={1}
              decimalpoints={0}
              required
            />
            <p className="flex items-center text-sm text-design-gold">
              <FiInfo className=" mr-2" /> You're staking for: (1 month)
            </p>
            <Button type="submit" className="gradient-1 button-3 mt-2">
              Stake <HiOutlineExternalLink />
            </Button>
            <p className="text-sm text-design-grey flex items-center mt-2">
              <span className="tag-3 mr-2">125</span> Remaining stake now
            </p>
            <p className="flex items-center text-sm mt-4">
              <FiInfo className="text-design-darkBlue2 mr-2 w-6" /> If you Stake
              for the first time the first transaction is only to approve your
              SMCW, after that you can start staking
            </p>
          </form>
          <div>
            <h3>Reward Claim / Unlock Stake</h3>
            <Button className="button-3 font-semibold border border-design-pink !bg-design-backgroundPink mt-2">
              Unlock SMCW{" "}
              <img src="/images/lock.png" alt="" className="!w-4 !h-4" />
            </Button>
            <p className="flex items-center text-sm mt-2 text-design-red">
              <FiInfo className="mr-2 w-6" /> Early unstake penalty, you won’t
              be able to claim your reward if you don’t complete your remaining
              period
            </p>
            <div className="card-2 !px-2.5 !py-1 text-sm mt-4">
              <p>Info</p>
              <table className="w-full">
                <tbody>
                  <tr key={"1"} className="grid grid-cols-2">
                    Min stake
                    <span className="flex items-center ml-1">
                      <img
                        src="/images/coin.png"
                        alt=""
                        className="w-3 h-3 object-contain object-center mr-1"
                      />
                      1000
                    </span>
                  </tr>
                  <tr key={"2"} className="grid grid-cols-2">
                    Period
                    <span className="flex items-center ml-1">1 month</span>
                  </tr>
                  <tr key={"3"} className="grid grid-cols-2">
                    Max claim
                    <span className="flex items-center ml-1">Remaining</span>
                  </tr>
                  <tr key={"4"} className="grid grid-cols-2">
                    1 unit
                    <span className="flex items-center ml-1">
                      125 uds. FCFS
                    </span>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Overlay */}
          {locked && (
            <div className="absolute top-0 left-0 w-full h-full grid place-items-center bg-design-background bg-opacity-90 border border-design-blue rounded-lg">
              <img src="/images/icons/lock.png" alt="" />
            </div>
          )}
        </div>
        {!locked && (
          <div className="card-3 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-1">
            <div>
              <h4 className="text-design-grey mb-2 lg:mb-3">Locked SMCW</h4>
              <p className="flex items-center ml-0 lg:ml-1">
                <img
                  src="/images/coin.png"
                  alt=""
                  className="w-5 h-5 object-contain object-center mr-2"
                />
                1000
              </p>
            </div>
            <div>
              <h4 className="text-design-grey mb-2 lg:mb-3">Pending Rewards</h4>
              <p className="flex items-center ml-0 lg:ml-1">
                <img
                  src="/images/icons/game2.png"
                  alt=""
                  className="w-5 h-5 object-contain object-center mr-2 rounded border border-design-darkBlue2"
                />
                0
              </p>
            </div>
            <div>
              <h4 className="text-design-grey mb-2 lg:mb-3">
                Estimated Reward
              </h4>
              <p className="flex items-center ml-0 lg:ml-1">
                1 x Santa Sleigh - Fighter Skin - 2021
              </p>
            </div>
          </div>
        )}
        {!locked && (
          <Button
            className="gradient-2 button-3 mt-2 border border-design-blue"
            onClick={() => handleClaim()}
          >
            Claim Rewards <FiDownload />
          </Button>
        )}
        {locked && (
          <>
            <Button
              className="gradient-2 button-3 mt-2 border border-design-blue"
              onClick={() => null}
            >
              YOU ARE WHITELISTED <FaRegCheckSquare />
            </Button>
            <a
              href="/"
              target="_blank"
              className="button-3 mt-1 !rounded-3xl !py-2 !font-light border border-design-blue"
            >
              How to get whitelisted? <HiOutlineExternalLink />
            </a>
          </>
        )}
      </div>
    </Card>
  );
}
