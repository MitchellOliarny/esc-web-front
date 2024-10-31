import React from "react";
import Image from "next/image";
import { FaRegQuestionCircle } from "react-icons/fa";
import { calculatePercentile } from "@/app/utils/helpers";

interface StatsScoreProps {
  userGames: UserGames[];
  valAverage: ValAverage[];
  isAgentBox: boolean;
}

const StatsScore = ({ userGames, valAverage, isAgentBox }: StatsScoreProps) => {

  const lineWidth = isAgentBox ? 'w-96' : 'w-0.5';
  const lineHeight = isAgentBox ? 'h-0.5' : 'h-48';
  const displayType = isAgentBox ? 'grid' : 'flex';
  const fontSize = isAgentBox ? '' : '';

  let totalWins = 0;
  let totalLosses = 0;

  //console.log(valAverage)
  const recentGames = userGames;
  // console.log(recentGames);

  const isWin = (game: UserGames) => {
    const playerTeam = game.team.toLowerCase();
    const otherTeam = playerTeam === "blue" ? "red" : "blue";
    // @ts-ignore
    if (game[playerTeam] - game[otherTeam] > 0) {
      return true;
    } else {
      return false;
    }
  };

  function normalize(val: number, min: number, max: number) {
    const delta = max - min;
    const output = (val - min) / delta;
    if (output < 0) {return 0;}
    if (output > 1) {return 1;}
    return output
  }

  const matchWinLowerThreshold = 35;
  const roundWinLowerThreshold = 40;
  const KADLowerThreshold = .9;
  const kastLowerThreshold = 50;
  const adrLowerThreshold = 90;
  const ddLowerThreshold = 0;

  const matchWinUpperThreshold = 65;
  const roundWinUpperThreshold = 55;
  const KADUpperThreshold = 1.75;
  const kastUpperThreshold = 80;
  const adrUpperThreshold = 180;
  const ddUpperThreshold = 20;

  const matchWinPoints = 30;
  const roundWinPoints = 25;
  const KADPoints = 10;
  const kastPoints = 10;
  const adrPoints = 20;
  const ddPoints = 5;

  let roundsWin = 0;
  let totalRounds = 0;
  let KAD = 0;
  let kastPercentage = 0;
  let adrPercentage = 0;
  let ddPercentage = 0;

  let ESCScore = 0;

  for (const x in recentGames) {
    const playerTeam = recentGames[x].team.toLowerCase();
    // const enemyTeam = playerTeam === "blue" ? "red" : "blue";
    // const careerHealth =

    isWin(recentGames[x]) ? totalWins++ : totalLosses++;
    // @ts-ignore
    roundsWin += recentGames[x][playerTeam];
    totalRounds += recentGames[x].rounds_played;
    KAD += (recentGames[x].stats.kills + recentGames[x].stats.assists) / recentGames[x].stats.deaths;
    adrPercentage += recentGames[x].stats.adr;
    kastPercentage += recentGames[x].kast;
    ddPercentage += recentGames[x].stats.dmgdelta;
  }

  //CALCULATING ESC Score
  const esc_match_points = normalize(((totalWins / (totalWins + totalLosses)) * 100), matchWinLowerThreshold, matchWinUpperThreshold );
  const esc_round_points = normalize(((roundsWin / totalRounds) * 100), roundWinLowerThreshold, roundWinUpperThreshold );
  const esc_kad_points = normalize((KAD / recentGames.length), KADLowerThreshold, KADUpperThreshold );
  const esc_kast_points = normalize((kastPercentage / recentGames.length), kastLowerThreshold, kastUpperThreshold );
  const esc_adr_points = normalize((adrPercentage / recentGames.length), adrLowerThreshold, adrUpperThreshold );
  const esc_dd_points = normalize((ddPercentage / recentGames.length), ddLowerThreshold, ddUpperThreshold )

  ESCScore = (esc_match_points * matchWinPoints) + (esc_round_points * roundWinPoints) + (esc_kad_points * KADPoints) + (esc_kast_points * kastPoints) + (esc_adr_points * adrPoints) + (esc_dd_points * ddPoints);

  //console.log('adr: ' + esc_adr_points + ' match:' + esc_match_points + ' round:' + esc_round_points + ' kad:' + esc_kad_points + ' kast:' + esc_kast_points)

  return (
    <>
      <div className={fontSize}>
        <div className="back-slate stat-box-border pt-4 px-4 h-full">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-2xl">EsportsClubs.gg Score</h1>
              <Image
                width={1000}
                height={1000}
                src="/dashboard/esc-score.png"
                className="w-auto h-8"
                alt="ESC Score Icon"
              />
            </div>
            <div
              className="tooltip"
              data-tip="ESC Score indicates how likely we think you will rank up using recent stat trends"
            >
              <FaRegQuestionCircle className="text-xl" />
            </div>
          </div>

          <div className="py-10">
            <div className={`${displayType} items-center`}>
              <div className="flex items-center gap-6 pl-2 pr-10 justify-center">
                <Image
                  width={1000}
                  height={1000}
                  alt="Score Star Icon"
                  src="/dashboard/score-star.png"
                  className="w-auto h-24"
                />
                <div>
                  <div
                    className="tooltip cursor-default"
                    data-tip="Likeliness to Rank Up"
                  >
                    <h2 className="font-medium text-2xl leading-none whitespace-nowrap">
                      ESC Score
                    </h2>
                  </div>

                  <p className="text-[#4DFFDD] font-bold text-5xl leading-none">
                    {(ESCScore * 10).toFixed(0)}
                    <span className="text-white text-2xl">/1000</span>
                  </p>
                  {/* <p className="font-bold">
                    Top{" "}
                    {(
                      calculatePercentile(
                        aveEscScore,
                        // @ts-ignore
                        valAverage?.median
                          .esc_score,
                        // @ts-ignore
                        valAverage?.min
                          .esc_score,
                        // @ts-ignore
                        valAverage?.max.esc_score
                      ).percentile * 100
                    ).toFixed(2)}
                    %
                  </p> */}
                </div>
              </div>

              <div className={`${lineWidth} ${lineHeight} bg-white m-auto`}></div>

              <div className="pl-10">
                <div className="grid grid-cols-3 gap-8 pb-6">
                <div>
                    <div
                      className="tooltip cursor-default"
                      data-tip="Overall Percentage of Matches Won"
                    >
                      <h3 className="font-bold text-sm">Match Win %</h3>
                    </div>
                    <p className="font-bold text-4xl text-[#4DFFDD]">
                      {((totalWins / (totalWins + totalLosses)) * 100).toFixed(1)}%
                    </p>
                    <p className="font-bold text-sm">
                      Top{" "}
                      {(
                        calculatePercentile(
                          (totalWins / (totalWins + totalLosses) * 100),
                          // @ts-ignore
                          valAverage?.median?.match_win_percent,
                          // @ts-ignore
                          valAverage?.min?.match_win_percent,
                          // @ts-ignore
                          valAverage?.max?.match_win_percent
                        ).percentile
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
                  <div>
                    <div
                      className="tooltip cursor-default"
                      data-tip="Overall Percentage of Rounds Won"
                    >
                      <h3 className="font-bold text-sm">Round Win %</h3>
                    </div>
                    <p className="font-bold text-4xl text-[#4DFFDD]">
                      {((roundsWin / totalRounds) * 100).toFixed(1)}%
                    </p>
                    <p className="font-bold text-sm">
                      Top{" "}
                      {(
                        calculatePercentile(
                          (roundsWin / totalRounds) * 100,
                          // @ts-ignore
                          valAverage?.median?.round_win_percent,
                          // @ts-ignore
                          valAverage?.min?.round_win_percent,
                          // @ts-ignore
                          valAverage?.max?.round_win_percent
                        ).percentile
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
                  <div>
                    <div
                      className="tooltip cursor-default"
                      data-tip="Overall Average Damage per Round"
                    >
                      <h3 className="font-bold text-sm">AD/R</h3>
                    </div>
                    <p className="font-bold text-4xl text-[#4DFFDD]">
                      {(adrPercentage / recentGames?.length).toFixed(0)}
                    </p>
                    <p className="font-bold text-sm">
                      Top{" "}
                      {(
                        calculatePercentile(
                          adrPercentage / recentGames?.length,
                          // @ts-ignore
                          valAverage?.median?.adr,
                          // @ts-ignore
                          valAverage?.min?.adr,
                          // @ts-ignore
                          valAverage?.max?.adr
                        ).percentile
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
     
                </div>

                <div className="grid grid-cols-3 gap-8">
                <div>
                    <div
                      className="tooltip cursor-default"
                      data-tip="Overall Kills, Assists, Survives, Trades Percentage"
                    >
                      <h3 className="font-bold text-sm">KAST%</h3>
                    </div>
                    <p className="font-bold text-4xl text-[#4DFFDD]">
                      {(kastPercentage / recentGames?.length).toFixed(1)}%
                    </p>
                    <p className="font-bold text-sm">
                      Top{" "}
                      {(
                        calculatePercentile(
                          kastPercentage / recentGames?.length,
                          // @ts-ignore
                          valAverage?.median?.kast,
                          // @ts-ignore
                          valAverage?.min?.kast,
                          // @ts-ignore
                          valAverage?.max?.kast
                        ).percentile
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
                  <div>
                    <div
                      className="tooltip cursor-default"
                      data-tip="Overall Kills + Assists / Deaths"
                    >
                      <h3 className="font-bold text-sm">KA/D</h3>
                    </div>
                    <p className="font-bold text-4xl text-[#4DFFDD]">
                      {(KAD / recentGames?.length).toFixed(2)}
                    </p>
                    <p className="font-bold text-sm">
                      Top{" "}
                      {(
                        calculatePercentile(
                          KAD / recentGames?.length,
                          // @ts-ignore
                          valAverage?.median?.kad,
                          // @ts-ignore
                          valAverage?.min?.kad,
                          // @ts-ignore
                          valAverage?.max?.kad
                        ).percentile
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
                  <div>
                    <div
                      className="tooltip cursor-default"
                      data-tip="AVG Net Damage / Round"
                    >
                      <h3 className="font-bold text-sm">DMG Delta</h3>
                    </div>
                    <p className="font-bold text-4xl text-[#4DFFDD]">
                      {(ddPercentage / recentGames?.length).toFixed(2)}
                    </p>
                    <p className="font-bold text-sm">
                      Top{" "}
                      {(
                        calculatePercentile(
                          ddPercentage / recentGames?.length,
                          // @ts-ignore
                          valAverage?.median?.dmgdelta,
                          // @ts-ignore
                          valAverage?.min?.dmgdelta,
                          // @ts-ignore
                          valAverage?.max?.dmgdelta
                        ).percentile
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
                  {/* { <div className="col-span-2">
                    <div
                      className="tooltip cursor-default"
                      data-tip="Overall Important Round Score"
                    >
                      <h3 className="font-bold text-sm">Key Round Score</h3>
                    </div>
                    <p className="font-bold text-4xl text-[#FF6F4D]">
                      {aveImportantRounds.toFixed(0)}
                    </p>
                    { <p className="font-bold text-sm">Top 80%</p> }
                  </div> } */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsScore;
