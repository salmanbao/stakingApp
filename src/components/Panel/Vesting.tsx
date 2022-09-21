import Card from "../Card";
import Button from "../Button";
import Select from "../Select";
import Overlay from "../Overlay";
import { useState } from "react";
import { parseEther } from "ethers/lib/utils";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useVestingPanel } from "../../hooks/useVestingPanel";
import { Locker, MasterChef, NFTRewards } from "../../typechain";

interface VestingTypes {
  icon: string;
  pool: string;
  type: string;
  amount: string;
  weight: number;
  reward: string;
  poolInstance: NFTRewards | MasterChef;
  dateStaked: string;
  unlocksIn: string;
  percentage?: number;
  isClaimed: boolean;
  action: string;
  disabled: boolean;
}

export default function Vesting() {
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const { PoolStakes } = useVestingPanel();

  const handleClaim = async (
    amount: string,
    type: string,
    poolInstance: Locker | MasterChef
  ) => {
    if (type == "stake"){
      let tx = await (poolInstance as MasterChef).claim(parseEther(amount));
      await tx.wait()
    }
    else if(type == "vest"){
      let tx = await (poolInstance as Locker).claimVestedTokens(parseEther(amount))
      await tx.wait()
    }
    window.location.reload();
  };

  return (
    <section>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end">
        <div>
          <h1 className="section-heading-1">
            <img src="/images/unlock.png" alt="" /> Vesting Panel
          </h1>
          <p className="flex items-center gap-2 mt-4">
            SMCW Staking
            <button className="tag-1">
              BSC <img src="/images/Binance.png" alt="" />
            </button>
          </p>
        </div>
        <div className="flex items-center gap-2 mt-5 lg:mt-0">
          <Select
            className="select-alt"
            options={[
              {
                label: "Filter",
                value: "",
              },
            ]}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Select
            className="select-alt"
            options={[
              {
                label: "Sort by",
                value: "",
              },
            ]}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-6 flex-1">
        <Card className="card-1 !pb-2 overflow-auto w-full empty-vesting">
        {PoolStakes.length === 0 &&(
            <Overlay>You don't have any vesting period 
            available.</Overlay>
          )}
          <table
            className="text-sm grid grid-cols-1 vesting-table"
            style={{
              minWidth: "1200px",
            }}
          >
            <thead className="grid grid-cols-1">
              <tr className="text-left !border-b">
                <th>Pools</th>
                <th>Amount</th>
                <th>Weight</th>
                <th>Reward</th>
                <th>Date staked</th>
                <th>Unlocks in</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-base">
              {PoolStakes.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={`/images/${item.icon}.png`} alt="" /> {item.pool}
                  </td>
                  <td>{item.amount}</td>
                  <td>{item.weight}</td>
                  <td>{item.reward}</td>
                  <td>{item.timestamp}</td>
                  {item.percentage < 100 ? (
                    <td>
                      {item.unlocksIn} days
                      {item.percentage && (
                        <div className="progress-wrapper">
                          <svg
                            preserveAspectRatio="none"
                            strokeDasharray={`${item.percentage} 100`}
                          >
                            <circle cx="50%" cy="50%" r="50%" />
                          </svg>
                          <p>{item.percentage}%</p>
                        </div>
                      )}
                    </td>
                  ) : item.isClaimed ? (
                    <td>Claimed</td>
                  ) : (
                    <td>Available Now</td>
                  )}

                  <td>
                    {item.percentage >= 100 ? (
                      <Button
                        onClick={async () =>
                          await handleClaim(
                            item.amount,
                            item.type,
                            item.poolInstance
                          )
                        }
                        className="gradient-2 button-3 border border-design-blue !py-2"
                      >
                        {item.action} <HiOutlineExternalLink />
                      </Button>
                    ) : (
                      <Button
                        className="button-3 border border-design-pink !bg-design-backgroundPink !py-2 cursor-not-allowed"
                        disabled
                      >
                        {item.state} <img src="/images/lock.png" alt="" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </section>
  );
}
