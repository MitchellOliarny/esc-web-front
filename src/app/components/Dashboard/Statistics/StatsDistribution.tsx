import React, { useState } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import { CircularProgress } from "@nextui-org/react";
import { FaLock } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import { FaRegQuestionCircle } from "react-icons/fa";
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
  return (
    <>
      <div className="bg-[#102B3D] stat-box-border px-4 py-4 flex flex-col justify-center items-center relative">
        <div className="flex justify-center w-full items-center mb-2">
          <h3 className=" font-bold text-2xl text-center flex-grow">
            {statsName}
          </h3>
          <div className="tooltip" data-tip={tooltip}>
            <FaRegQuestionCircle className="text-xl" />
          </div>
        </div>
        <CircularProgress
          classNames={{
            svg: "w-40 h-40 drop-shadow-md",
            indicator: "stroke-[#5ECCBA]",
            track: "stroke-[#F5603C] stroke-1",
            value: "text-4xl font-bold text-white",
          }}
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
                  <h4 className="font-bold text-center text-sm mb-1">
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
                    <div className="flex flex-col justify-center items-center text-sm font-medium">
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
                <progress
                  className="progress w-full bg-white/20 stats-percentile-bar"
                  value={calculatePercentile(
                    (percentage / (dontAVG ? 1 : gamesLength)),
                    // @ts-ignore
                    valAverage[ranks[current_rank]]?.all.median[stat_code_name],
                    // @ts-ignore
                    valAverage[ranks[current_rank]]?.all.min[stat_code_name],
                    // @ts-ignore
                    valAverage[ranks[current_rank]]?.all.max[stat_code_name]
                  ).barPercent}
                  max="100"
                ></progress>
                <p className="text-xs text-center">You are in the</p>
                <p className="text-sm text-center font-bold text-[#FFD80E]">
                  Top {
                    (calculatePercentile(
                      (percentage / (dontAVG ? 1 : gamesLength)),
                      // @ts-ignore
                      valAverage[ranks[current_rank]]?.all.median[stat_code_name],
                      // @ts-ignore
                      valAverage[ranks[current_rank]]?.all.min[stat_code_name],
                      // @ts-ignore
                      valAverage[ranks[current_rank]]?.all.max[stat_code_name]
                    ).percentile
                    ) < 100 ? (calculatePercentile(
                      (percentage / (dontAVG ? 1 : gamesLength)),
                      // @ts-ignore
                      valAverage[ranks[current_rank]]?.all.median[stat_code_name],
                      // @ts-ignore
                      valAverage[ranks[current_rank]]?.all.min[stat_code_name],
                      // @ts-ignore
                      valAverage[ranks[current_rank]]?.all.max[stat_code_name]
                    ).percentile
                    ).toFixed(2) : '100'}%
                </p>
              </div>

              <div className="flex justify-center items-center">
                <FaArrowRight className="text-4xl" />
              </div>

              <div>
                <div>
                  <h4 className="font-bold text-center text-sm mb-1">
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
                    <div className="flex flex-col justify-center items-center text-sm font-medium">
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
                <progress
                  className="progress w-full bg-white/20 stats-percentile-bar"
                  value={calculatePercentile(
                    (percentage / (dontAVG ? 1 : gamesLength)),
                    // @ts-ignore
                    valAverage[ranks[nextRank]]?.all.median[stat_code_name],
                    // @ts-ignore
                    valAverage[ranks[nextRank]]?.all.min[stat_code_name],
                    // @ts-ignore
                    valAverage[ranks[nextRank]]?.all.max[stat_code_name]
                  ).barPercent}
                  color="black"
                  max="100"
                ></progress>
                <p className="text-xs text-center">You are in the</p>
                <p className="text-sm text-center font-bold text-[#FF5C16]">
                  Top {(calculatePercentile(
                    (percentage / (dontAVG ? 1 : gamesLength)),
                    // @ts-ignore
                    valAverage[ranks[nextRank]]?.all.median[stat_code_name],
                    // @ts-ignore
                    valAverage[ranks[nextRank]]?.all.min[stat_code_name],
                    // @ts-ignore
                    valAverage[ranks[nextRank]]?.all.max[stat_code_name]
                  ).percentile
                  ) < 100 ? (calculatePercentile(
                    percentage / (dontAVG ? 1 : gamesLength),
                    // @ts-ignore
                    valAverage[ranks[nextRank]]?.all.median[stat_code_name],
                    // @ts-ignore
                    valAverage[ranks[nextRank]]?.all.min[stat_code_name],
                    // @ts-ignore
                    valAverage[ranks[nextRank]]?.all.max[stat_code_name]
                  ).percentile
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
