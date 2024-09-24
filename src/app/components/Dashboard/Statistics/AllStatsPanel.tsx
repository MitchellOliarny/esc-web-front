import React from "react";
import StatsDistribution from "./StatsDistribution";
import { calculatePercentile } from "@/app/utils/helpers";

interface AllStatsPanelUIProps {
  userInfo: UserInfo;
  userGames: UserGames[];
  valAverage: ValAverage[];
  userData: {
    valorant_banner: string;
    isStudent: number;
  };
}

const AllStatsPanel = ({
  userInfo,
  userGames,
  valAverage,
  userData,
}: AllStatsPanelUIProps) => {
  let totalWins = 0;
  let totalLosses = 0;

  const recentGames = userGames;

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

  let roundsWin = 0;
  let totalRounds = 0;
  let hsPercentage = 0;
  let kastPercentage = 0;
  let adrPercentage = 0;
  let totalACS = 0;
  let totalDmgDealta = 0;
  let totalADR = 0;
  let totalKills = 0;
  let totalAssists = 0;
  let totalDeaths = 0;
  let totalClutchScore = 0;
  let totalCreditScore = 0;

  // REMOVE THE NUMBER OF GAMES IN THE FUTURE
  let totalImportantRounds = 0;
  let gamesWithImportantRounds = 0;
  let totalEscScore = 0;
  let gamesWithEscScore = 0;

  for (const x in recentGames) {
    const playerTeam = recentGames[x].team.toLowerCase();
    // const enemyTeam = playerTeam === "blue" ? "red" : "blue";
    // const careerHealth =

    isWin(recentGames[x]) ? totalWins++ : totalLosses++;
    // @ts-ignore
    roundsWin += recentGames[x][playerTeam];
    totalRounds += recentGames[x].rounds_played;
    hsPercentage += recentGames[x].stats.hs_percent;
    adrPercentage += recentGames[x].stats.adr;
    kastPercentage += recentGames[x].kast;
    totalACS += recentGames[x].stats.combat_score;
    totalDmgDealta += recentGames[x].stats.dmgdelta;
    totalADR += recentGames[x].stats.adr;
    totalKills += recentGames[x].stats.kills;
    totalAssists += recentGames[x].stats.assists;
    totalDeaths += recentGames[x].stats.deaths;

    // REMOVE THE IF STATEMENTS IN THE FUTURE
    if (
      recentGames[x].important_rounds &&
      recentGames[x].important_rounds.important_round_score
    ) {
      totalImportantRounds +=
        recentGames[x].important_rounds.important_round_score;
      gamesWithImportantRounds++;
    }

    if (recentGames[x].stats.esc_score) {
      totalEscScore += recentGames[x].stats.esc_score;
      gamesWithEscScore++;
    }

    if (recentGames[x].clutches.clutch_score) {
      totalClutchScore += recentGames[x].clutches.clutch_score;
    }

    if (recentGames[x].round_economy?.credit_score) {
      totalCreditScore += recentGames[x].round_economy.credit_score;
    }
  }

  let isStudent = true;
  // Temporary remove blur effect
  // userData.isStudent === 1 ? (isStudent = true) : (isStudent = false);

  // console.log(recentGames[0]);

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
  const currRank = recentGames[0].match_rank;
  const current_rank = currRank - (currRank%3);


  return (
    <>
      <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
        <StatsDistribution
          tooltip="Percentage of games won out of all games played"
          unit="percent"
          statsName="Match Win %"
          stat_code_name="match_win_percent"
          valAverage={valAverage}
          gamesLength={recentGames?.length}
          percentage={(totalWins / (totalWins + totalLosses)) * 100}
          difference={10}
          // @ts-ignore
          currRank={currRank}
          nextRank={currRank + (3 - (currRank % 3))}
          isStudent={true}
          dontAVG={true}
        />

        <StatsDistribution
          tooltip="Percentage of rounds won out of all rounds played"
          unit="percent"
          stat_code_name="round_win_percent"
          valAverage={valAverage}
          gamesLength={recentGames?.length}
          statsName="Round Win %"
          percentage={(roundsWin / totalRounds) * 100}
          difference={10}
          currRank={currRank}
          nextRank={currRank + (3 - (currRank % 3))}
          isStudent={true}
          dontAVG={true}
        />

        <StatsDistribution
          tooltip="Percentage of shots that were Headshots"
          unit="percent"
          stat_code_name="hs_percent"
          valAverage={valAverage}
          gamesLength={recentGames?.length}
          statsName="Headshot %"
          percentage={hsPercentage}
          difference={10}
          currRank={currRank}
          nextRank={currRank + (3 - (currRank % 3))}
          isStudent={isStudent}
          dontAVG={false}
        />

        <StatsDistribution
          tooltip="Percentage of Rounds you achieved a Kill, Assist, Surive, or Trade"
          unit="percent"
          stat_code_name="kast"
          statsName="KAST %"
          valAverage={valAverage}
          gamesLength={recentGames?.length}
          percentage={kastPercentage}
          difference={10}
          currRank={currRank}
          nextRank={currRank + (3 - (currRank % 3))}
          isStudent={isStudent}
          dontAVG={false}
        />

        <StatsDistribution
          tooltip="Average Combat Score over all games played"
          unit="decimal"
          stat_code_name="combat_score"
          valAverage={valAverage}
          gamesLength={recentGames?.length}
          statsName="AVG Combat Score"
          percentage={Number((totalACS)?.toFixed(1))}
          difference={10}
          currRank={currRank}
          nextRank={currRank + (3 - (currRank % 3))}
          isStudent={isStudent}
          dontAVG={false}
        />

        <StatsDistribution
          tooltip="Average NET (Given - Recieved) Damage each Round"
          unit="decimal"
          stat_code_name="dmgdelta"
          valAverage={valAverage}
          gamesLength={recentGames?.length}
         
          statsName="Damage &Delta;"
          percentage={Number(
            (totalDmgDealta)?.toFixed(2)
          )}
          difference={10}
          currRank={currRank}
          nextRank={currRank + (3 - (currRank % 3))}

          isStudent={isStudent}
          dontAVG={false}
        />

        <StatsDistribution
          tooltip="Average Damage Dealt each Round"
          unit="decimal"
          stat_code_name="adr"
          valAverage={valAverage}
          gamesLength={recentGames?.length}
          
          statsName="AD/R"
          percentage={Number((totalADR)?.toFixed(1))}
          difference={10}
          currRank={currRank}
          nextRank={currRank + (3 - (currRank % 3))}
          
          isStudent={isStudent}
          dontAVG={false}
        />

        <StatsDistribution
          tooltip="Average KAD (Kills+Assists / Deaths) each Game"
          unit="decimal"
          stat_code_name="kad"
          valAverage={valAverage}
          gamesLength={recentGames?.length}
          statsName="KA/D"
          percentage={Number(
            ((totalKills + totalAssists) / totalDeaths)?.toFixed(1)
          )}
          difference={10}
          currRank={currRank}
          nextRank={currRank + (3 - (currRank % 3))}
          isStudent={isStudent}
          dontAVG={true}
        />

        <StatsDistribution
          tooltip="Average Mechanical Performance (KAST, AD/R, KA/D,  HS%, Clutches) each Game"
          unit="decimal"
          stat_code_name="esc_score"
          valAverage={valAverage}
          gamesLength={recentGames?.length}
      
          statsName="Mechanic Score"
          percentage={Number((totalEscScore).toFixed(2))}
          difference={10}
          currRank={currRank}
          nextRank={currRank + (3 - (currRank % 3))}

          isStudent={isStudent}
          dontAVG={false}
        />

        {/* <StatsDistribution
          tooltip="Average Clutch Factor (75+ is Optimal) each Game"
          unit="decimal"
          stat_code_name="clutch_score"
          valAverage={valAverage}
          gamesLength={recentGames?.length}
         
          statsName="Clutch Score"
          percentage={Number((totalClutchScore / recentGames?.length).toFixed(1))}
          difference={10}
          currRank={currRank}
          nextRank={currRank + (3 - (currRank % 3))}
          isStudent={isStudent}
          dontAVG={false}
        /> */}

        {/* <StatsDistribution
          tooltip="Average Key Rounds Won (100+ is Optimal) each Game"
          unit="decimal"
          stat_code_name="important_round_score"
          valAverage={valAverage}
          gamesLength={recentGames?.length}
          statsName="Key Round Score"
          percentage={Number(
            (totalImportantRounds)?.toFixed(1)
          )}
          difference={10}
          currRank={currRank}
          nextRank={currRank + (3 - (currRank % 3))}
          isStudent={isStudent}
          dontAVG={false}
        /> */}

        {/* <StatsDistribution
          tooltip="Average Credit Score (Economy Performance) each Game"
          unit="decimal"
          stat_code_name="credit_score"
          valAverage={valAverage}
          gamesLength={recentGames?.length}
         
          statsName="Credit Score"
          percentage={Number(
            (totalCreditScore)?.toFixed(1)
          )}
          difference={10}
          currRank={currRank}
          nextRank={currRank + (3 - (currRank % 3))}
          isStudent={isStudent}
          dontAVG={false}
        /> */}
      </div>
    </>
  );
};

export default AllStatsPanel;
