import React from "react";
import StatsDistribution from "./StatsDistribution";
import { calculatePercentile } from "@/app/utils/helpers";

interface StatsPanelUIProps {
  userInfo: UserInfo;
  userGames: UserGames[];
  valAverage: ValAverage[];
  userData: {
    valorant_banner: string;
    isStudent: number;
  };
}

const StatsPanel = ({
  userInfo,
  userGames,
  valAverage,
  userData,
}: StatsPanelUIProps) => {
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

  let kills = 0;

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
    kills += recentGames[x].stats.kills;

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
  }

  let isStudent = true;
  // Temporary remove blur effect
  // userData.isStudent === 1 ? (isStudent = true) : (isStudent = false);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {/* <StatsDistribution
          tooltip="Percentage of games won out of all games played"
          unit="percent"
          maxValue={
            // @ts-ignore
            valAverage[Object.keys(valAverage)[0]]?.all.max?.match_win_percent
          }
          minValue={
            // @ts-ignore
            valAverage[Object.keys(valAverage)[0]]?.all.min?.match_win_percent
          }
          statsName="Match Win %"
          percentage={(totalWins / (totalWins + totalLosses)) * 100}
          difference={10}
          currRank={userInfo?.player_rank}
          nextRank={userInfo?.player_rank + (3 - (userInfo?.player_rank % 3))}
          currRankAverage={valAverage[
            // @ts-ignore
            Object.keys(valAverage)[0]
          ]?.all.median?.match_win_percent.toFixed(2)}
          nextRankAverage={valAverage[
            // @ts-ignore
            Object.keys(valAverage)[1]
          ]?.all.median?.match_win_percent.toFixed(2)}
          barPercentage={
            calculatePercentile(
              (totalWins / (totalWins + totalLosses)) * 100,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[0]]?.all.median
                ?.match_win_percent,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[0]]?.all.min
                ?.match_win_percent,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[0]]?.all.max?.match_win_percent
            ).barPercent * 100
          }
          percentile={(
            calculatePercentile(
              (totalWins / (totalWins + totalLosses)) * 100,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[0]]?.all.median
                ?.match_win_percent,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[0]]?.all.min
                ?.match_win_percent,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[0]]?.all.max?.match_win_percent
            ).percentile * 100
          ).toFixed(2)}
          nextBarPercentage={
            calculatePercentile(
              (totalWins / (totalWins + totalLosses)) * 100,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[1]]?.all.median
                ?.match_win_percent,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[1]]?.all.min
                ?.match_win_percent,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[1]]?.all.max?.match_win_percent
            ).barPercent * 100
          }
          nextPercentile={(
            calculatePercentile(
              (totalWins / (totalWins + totalLosses)) * 100,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[1]]?.all.median
                ?.match_win_percent,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[1]]?.all.min
                ?.match_win_percent,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[1]]?.all.max?.match_win_percent
            ).percentile * 100
          ).toFixed(2)}
          isStudent={true}
        />

        <StatsDistribution
          tooltip="Percentage of rounds won out of all rounds played"
          unit="percent"
          maxValue={
            // @ts-ignore
            valAverage[Object.keys(valAverage)[0]]?.all.max?.round_win_percent
          }
          minValue={
            // @ts-ignore
            valAverage[Object.keys(valAverage)[0]]?.all.min?.round_win_percent
          }
          statsName="Round Win %"
          percentage={(roundsWin / totalRounds) * 100}
          difference={10}
          currRank={userInfo?.player_rank}
          nextRank={userInfo?.player_rank + (3 - (userInfo?.player_rank % 3))}
          currRankAverage={valAverage[
            // @ts-ignore
            Object.keys(valAverage)[0]
          ]?.all.median?.round_win_percent.toFixed(2)}
          nextRankAverage={valAverage[
            // @ts-ignore
            Object.keys(valAverage)[1]
          ]?.all.median?.round_win_percent.toFixed(2)}
          barPercentage={
            calculatePercentile(
              (roundsWin / totalRounds) * 100,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[0]]?.all.median
                ?.round_win_percent,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[0]]?.all.min
                ?.round_win_percent,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[0]]?.all.max?.round_win_percent
            ).barPercent * 100
          }
          percentile={(
            calculatePercentile(
              (roundsWin / totalRounds) * 100,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[0]]?.all.median
                ?.round_win_percent,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[0]]?.all.min
                ?.round_win_percent,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[0]]?.all.max?.round_win_percent
            ).percentile * 100
          ).toFixed(2)}
          nextBarPercentage={
            calculatePercentile(
              (roundsWin / totalRounds) * 100,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[1]]?.all.median
                ?.round_win_percent,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[1]]?.all.min
                ?.round_win_percent,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[1]]?.all.max?.round_win_percent
            ).barPercent * 100
          }
          nextPercentile={(
            calculatePercentile(
              (roundsWin / totalRounds) * 100,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[1]]?.all.median
                ?.round_win_percent,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[1]]?.all.min
                ?.round_win_percent,
              // @ts-ignore
              valAverage[Object.keys(valAverage)[1]]?.all.max?.round_win_percent
            ).percentile * 100
          ).toFixed(2)}
          isStudent={true}
        /> */}

        <StatsDistribution
          tooltip="Percentage of Games Won"
          unit="percent"
          stat_code_name="match_win_percent"
          valAverage={valAverage}
          gamesLength={recentGames?.length}
          statsName={`Match Win % (${totalWins}W / ${totalLosses}L)`}
          percentage={(totalWins / (totalWins + totalLosses)) * 100}
          difference={10}
          currRank={recentGames[0]?.match_rank}
          nextRank={recentGames[0]?.match_rank + (3 - (recentGames[0]?.match_rank % 3))}
          isStudent={isStudent}
          dontAVG={true}
        />

        <StatsDistribution
          tooltip="The average amount of kills achieved in a game"
          unit="decimal"
          stat_code_name="kills"
          statsName="AVG Kills / Game"
          valAverage={valAverage}
          gamesLength={recentGames?.length}
          percentage={kills}
          difference={10}
          currRank={recentGames[0]?.match_rank}
          nextRank={recentGames[0]?.match_rank + (3 - (recentGames[0]?.match_rank % 3))}
          isStudent={isStudent}
          dontAVG={false}
        />
      </div>
    </>
  );
};

export default StatsPanel;
