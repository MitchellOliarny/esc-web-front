import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import ChartComponent from "./ChartComponenet";

interface CareerHealthUIProps {
  userGames: UserGames[];
}

const CareerHealth = ({ userGames }: CareerHealthUIProps) => {
  const labels = [
    "13 - 9",
    "8 - 5",
    "4 - 1",
    "Draws",
    "1 - 4",
    "5 - 8",
    "9 - 13",
  ];

  //array
  let scores = [0, 0, 0, 0, 0, 0, 0];

  const FindScoreDifference = (playerScore: number, enemyScore: number) => {
    const difference = playerScore - enemyScore;
    switch (true) {
      case difference == 0:
        //This is a draw
        scores[3]++;
        break;
      case 1 <= difference && difference <= 4:
        scores[2]++;
        break;
      case 5 <= difference && difference <= 8:
        scores[1]++;
        break;
      case 9 <= difference && difference <= 13:
        scores[0]++;
        break;
      case -1 >= difference && difference >= -4:
        scores[4]++;
        break;
      case -5 >= difference && difference >= -8:
        scores[4]++;
        break;
      case -9 >= difference && difference >= -13:
        scores[4]++;
        break;
    }
  };

  for (const x in userGames) {
    const playerTeam = userGames[x].team.toLowerCase();
    const enemyTeam = playerTeam === "blue" ? "red" : "blue";

    // @ts-ignore
    const playerScore = userGames[x][playerTeam];
    const enemyScore = userGames[x][enemyTeam];

    FindScoreDifference(playerScore, enemyScore);
    // console.log(playerScore);
  }

  let chartHeight = scores.slice().sort((a, b) => b - a);
  // console.log(chartHeight);
  return (
    <>
      <div>
        <div className="stat-box rounded-lg p-4 h-full">
          <div className="flex items-center gap-2 justify-between">
            <h1 className="font-bold text-2xl">Career Health</h1>
            <div className="tooltip" data-tip="A break down of how many rounds you win or lose by">
              <FaRegQuestionCircle className="text-xl" />
            </div>
          </div>
          <div className="grid grid-cols-2 w-full pt-4">
              <p className="text-sm font-bold text-[#B0AEAE]">
                Match Wins by Round Difference
              </p>
              <p className="text-sm ml-[4.5em] font-medium text-[#B0AEAE]">
                Match Losses by Round Difference
              </p>
            </div>
          <div className="flex flex-col items-center h-64 pt-4" style={{contain: 'inline-size'}}>
            <ChartComponent data={scores} labels={labels} chartHeight={chartHeight}/>
          </div>
          {/* <p className="text-center font-bold pt-8">
            Player is on an upward trend with a good overall spread of Match
            Health
          </p> */}
        </div>
      </div>
    </>
  );
};

export default CareerHealth;
