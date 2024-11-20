import React, { useState } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import { CircularProgress } from "@nextui-org/react";
import { FaLock } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import { FaRegQuestionCircle, FaQuestionCircle, FaChevronRight } from "react-icons/fa";
import { calculatePercentile } from "@/app/utils/helpers";

interface StatsDistributionUIProps {
  statsName: string;
  percentage: number;
  difference: number;
  currRank: number;
  nextRank: number;
  isStudent: boolean;
  unit: string;
  tooltip: string;
  gamesLength: number;
  stat_code_name: string;
  valAverage: any;
  dontAVG: boolean;


  show_head_stat: boolean;

  left_head_stat: number;
  right_head_stat: number;

  left_head_name: string;
  right_head_name: string;
}

const StatsDistribution = ({
  statsName,
  percentage,
  difference,
  currRank,
  nextRank,
  isStudent,
  unit,
  tooltip,
  gamesLength,
  stat_code_name,
  valAverage,
  dontAVG,
  show_head_stat,
  left_head_name,
  right_head_name,
  left_head_stat,
  right_head_stat
}: StatsDistributionUIProps) => {
  let [showUnlockStats, setShowUnlockStats] = useState(false);

  const ranks = {
    0: 'unranked',
    3: 'iron',
    6: 'bronze',
    9: 'silver',
    12: 'gold',
    15: 'platinum',
    18: 'diamond',
    21: 'ascendant',
    24: 'immortal',
    27: 'radiant'
  }
  const current_rank = currRank - (currRank % 3);

  const curr_rank_percentile = calculatePercentile(
    (percentage / (dontAVG ? 1 : gamesLength)),
    // @ts-ignore
    valAverage[ranks[current_rank]]?.all.median[stat_code_name],
    // @ts-ignore
    valAverage[ranks[current_rank]]?.all.min[stat_code_name],
    // @ts-ignore
    valAverage[ranks[current_rank]]?.all.max[stat_code_name]
  );

  const next_rank_percentile = calculatePercentile(
    (percentage / (dontAVG ? 1 : gamesLength)),
    // @ts-ignore
    valAverage[ranks[nextRank]]?.all.median[stat_code_name],
    // @ts-ignore
    valAverage[ranks[nextRank]]?.all.min[stat_code_name],
    // @ts-ignore
    valAverage[ranks[nextRank]]?.all.max[stat_code_name]
  );

  return (
    <>
      <div className="stat-box rounded-lg px-4 py-4 flex flex-col justify-center items-center relative">
        <div className="flex w-full items-center mb-2 relative">
          <h3 className=" font-bold text-2xl text-left flex-grow">
            {statsName}
          </h3>
          {
            show_head_stat ?
          <div className="absolute top-10 flex gap-2 font-bold">
            <div className="text-center">
              <p className="text-xl">{left_head_stat}</p>
              <p className="text-xs text-win">{left_head_name}</p>
            </div>
            <hr className="back-slate w-6 my-auto h-0.5 rounded-md border-none"></hr>
            <div className="text-center">
              <p className="text-xl">{right_head_stat}</p>
              <p className="text-xs text-loss">{right_head_name}</p>
            </div>
          </div>
          :
          ""
        }
          <div className="tooltip" data-tip={tooltip}>
            <FaQuestionCircle className="text-xl text-ash w-8" />
          </div>
        </div>
        <CircularProgress
          classNames={{
            svg: "w-40 h-40 drop-shadow-md",
            indicator: "stroke-[#5ECCBA] stroke-2",
            track: "stroke-[#222830] stroke-1",
            value: "text-4xl font-bold text-white",
          }}
          className="mt-4"
          aria-label="Waiting..."
          value={dontAVG ? Number((percentage).toFixed(1)) : Number((percentage / gamesLength).toFixed(1))}
          //@ts-ignore
          maxValue={valAverage ? valAverage[ranks[current_rank]]?.all.max[stat_code_name] : 100}
          //@ts-ignore
          minValue={valAverage ? valAverage[ranks[current_rank]]?.all.min[stat_code_name] : 0}
          // @ts-ignore
          formatOptions={{ style: unit }}
          color="warning"
          showValueLabel={true}
        />
        <div>
          {valAverage && currRank ? (
            <div id="paidContents" className={`flex gap-4 mt-4`}>
              <div>
                <div>
                  <h4 className="font-bold text-left text-ash text-sm mb-1">
                    Current Rank
                  </h4>
                  <div className="flex">
                    <Image
                      src={`https://api.esportsclubs.gg/images/ranks/${currRank}`}
                      className="w-auto h-10 mr-2"
                      alt="user next rank"
                      width={100}
                      height={100}
                    />
                    <div className="flex flex-col justify-center items-start text-sm font-bold">
                      <p>Rank Avg</p>
                      <p>
                        {(valAverage[
                          // @ts-ignore
                          ranks[current_rank]
                        ]?.all.median[stat_code_name]) ? (valAverage[
                          // @ts-ignore
                          ranks[current_rank]
                        ]?.all.median[stat_code_name]).toFixed(2) : 0}
                        {unit === "percent" ? "%" : ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="cut-corner-45-special">
                  <progress
                    className="progress-rust w-full h-2"
                    value={curr_rank_percentile.barPercent}
                    max="100"
                  ></progress>
                </div>
                <p className={`text-xs text-left font-bold text-frost back-darkslate rounded-md p-1 pl-2 text-${curr_rank_percentile.color}`}>
                  Top {
                    (curr_rank_percentile.percentile
                    ) < 100 ? (curr_rank_percentile.percentile
                    ).toFixed(2) : '100'}%
                </p>
              </div>

              <div className="flex justify-around items-center">
                <FaChevronRight className="text-4xl" />
                <FaChevronRight className="text-4xl -ml-4" />
              </div>

              <div>
                <div>
                  <h4 className="font-bold text-left text-sm mb-1 text-ash">
                    Next Rank
                  </h4>
                  <div className="flex">
                    <Image
                      src={`https://api.esportsclubs.gg/images/ranks/${nextRank}`}
                      className="w-auto h-10 mr-2"
                      alt="user next rank"
                      width={100}
                      height={100}
                    />
                    <div className="flex flex-col justify-center items-start text-sm font-bold">
                      <p>Rank Avg</p>
                      <p>
                        {valAverage[
                          // @ts-ignore
                          ranks[nextRank]
                        ]?.all.median[stat_code_name] ? valAverage[
                          // @ts-ignore
                          ranks[nextRank]
                        ]?.all.median[stat_code_name].toFixed(2) : 0}
                        {unit === "percent" ? "%" : ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="cut-corner-45-special">
                  <progress
                    className="progress-rust w-full h-2"
                    value={next_rank_percentile.barPercent}
                    color="black"
                    max="100"
                  ></progress>
                </div>
                <p className={`text-xs text-left font-bold text-frost back-darkslate rounded-md p-1 pl-2 text-${next_rank_percentile.color}`}>
                  Top {(next_rank_percentile.percentile
                  ) < 100 ? (next_rank_percentile.percentile
                  ).toFixed(2) : '100'}%
                </p>
              </div>
            </div>
          ) : (
            ''
            // <div className="border border-slate-400 rounded-lg relative mt-4">
            //   <div
            //     className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 cursor-pointer"
            //     onMouseEnter={() => setShowUnlockStats(true)}
            //     onMouseLeave={() => setShowUnlockStats(false)}
            //   >
            //     <FaLock
            //       className={`text-2xl transition-opacity duration-300 ${showUnlockStats ? "opacity-0" : "opacity-100"
            //         }`}
            //     />
            //     <div
            //       className={`absolute inset-0 flex items-center justify-center text-white z-10 transition-opacity duration-300 ${showUnlockStats ? "opacity-100" : "opacity-0"
            //         }`}
            //     >
            //       <Button className="bg-[#F5603C] rounded-md text-white font-medium mt-2">
            //         Unlock Stats
            //       </Button>
            //     </div>
            //   </div>
            //   <div id="paidContents" className={`flex gap-4 blur-sm`}>
            //     <div>
            //       <div>
            //         <h4 className="font-bold text-center text-sm mb-1">
            //           Current Rank
            //         </h4>
            //         <div className="flex">
            //           <Image
            //             src={`https://api.esportsclubs.gg/images/ranks/${currRank}`}
            //             className="w-auto h-10 mr-2"
            //             alt="user next rank"
            //             width={100}
            //             height={100}
            //           />
            //           <div className="flex flex-col justify-center items-center text-sm font-medium">
            //             <p>Rank Avg</p>
            //             <p>{valAverage[
            //               // @ts-ignore
            //               ranks[current_rank]
            //             ]?.all.median[stat_code_name].toFixed(2)}%</p>
            //           </div>
            //         </div>
            //       </div>
            //       <progress
            //         className="progress w-full"
            //         value={calculatePercentile(
            //           percentage / (dontAVG ? 1 : gamesLength),
            //           // @ts-ignore
            //           valAverage[ranks[current_rank]]?.all.median[stat_code_name],
            //           // @ts-ignore
            //           valAverage[ranks[current_rank]]?.all.min[stat_code_name],
            //           // @ts-ignore
            //           valAverage[ranks[current_rank]]?.all.max[stat_code_name]
            //         ).barPercent}
            //         max="100"
            //       ></progress>
            //       <p className="text-xs text-center">You are in the</p>
            //       <p className="text-sm text-center font-bold text-[#FFD80E]">
            //         Top {(calculatePercentile(
            //           percentage / (dontAVG ? 1 : gamesLength),
            //           // @ts-ignore
            //           valAverage[ranks[current_rank]]?.all.median[stat_code_name],
            //           // @ts-ignore
            //           valAverage[ranks[current_rank]]?.all.min[stat_code_name],
            //           // @ts-ignore
            //           valAverage[ranks[current_rank]]?.all.max[stat_code_name]
            //         ).percentile
            //         ).toFixed(2)}%
            //       </p>
            //     </div>

            //     <div className="flex justify-center items-center">
            //       <FaArrowRight className="text-4xl" />
            //     </div>

            //     <div>
            //       <div>
            //         <h4 className="font-bold text-center text-sm mb-1">
            //           Next Rank
            //         </h4>
            //         <div className="flex">
            //           <Image
            //             src={`https://api.esportsclubs.gg/images/ranks/${nextRank}`}
            //             className="w-auto h-10 mr-2"
            //             alt="user next rank"
            //             width={100}
            //             height={100}
            //           />
            //           <div className="flex flex-col justify-center items-center text-sm font-medium">
            //             <p>Rank Avg</p>
            //             <p>{valAverage[
            //               // @ts-ignore
            //               ranks[nextRank]
            //             ]?.all.median[stat_code_name].toFixed(2)}%</p>
            //           </div>
            //         </div>
            //       </div>
            //       <progress
            //         className="progress w-full"
            //         value={calculatePercentile(
            //           (percentage / (dontAVG ? 1 : gamesLength)),
            //           // @ts-ignore
            //           valAverage[ranks[nextRank]]?.all.median[stat_code_name],
            //           // @ts-ignore
            //           valAverage[ranks[nextRank]]?.all.min[stat_code_name],
            //           // @ts-ignore
            //           valAverage[ranks[nextRank]]?.all.max[stat_code_name]
            //         ).barPercent}
            //         max="100"
            //       ></progress>
            //       <p className="text-xs text-center">You are in the</p>
            //       <p className="text-sm text-center font-bold text-[#FF5C16]">
            //         Top {(
            //           calculatePercentile(
            //             (percentage / (dontAVG ? 1 : gamesLength)),
            //             // @ts-ignore
            //             valAverage[ranks[nextRank]]?.all.median[stat_code_name],
            //             // @ts-ignore
            //             valAverage[ranks[nextRank]]?.all.min[stat_code_name],
            //             // @ts-ignore
            //             valAverage[ranks[nextRank]]?.all.max[stat_code_name]
            //           ).percentile
            //         ).toFixed(2)}%
            //       </p>
            //     </div>
            //   </div>
            // </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StatsDistribution;
