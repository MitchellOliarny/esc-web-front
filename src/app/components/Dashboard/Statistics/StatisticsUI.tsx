import React, {useEffect, useState} from "react";
import StatsScore from "./StatsScore";
import CareerHealth from "./CareerHealth";
import StatsPanel from "./StatsPanel";
import AllStatsPanel from "./AllStatsPanel";

interface StatisticsUIProps {
  userInfo: UserInfo;
  userGames: UserGames[];
  valAverage: ValAverage[];
  userData: {
    valorant_banner: string;
    isStudent: number;
  };
}

const StatisticsUI = ({
  userInfo,
  userGames,
  valAverage,
  userData,
}: StatisticsUIProps) => {
  // console.log(userGames);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  const current_rank = userGames[0]?.match_rank - (userGames[0]?.match_rank%3);

  return (
    <>
      <div className="grid xl:grid-cols-2 grid-cols-1 pb-4 gap-4 mt-4">
        {/* @ts-ignore */}
        <StatsScore userGames={userGames} valAverage={ valAverage && valAverage[ranks[current_rank]] ? valAverage[ranks[current_rank]].all : null} isAgentBox={windowWidth < 1000 ? true : false}/>
        <CareerHealth userGames={userGames} />
      </div>

      <div>
        <AllStatsPanel
          userInfo={userInfo}
          userGames={userGames}
          valAverage={valAverage}
          userData={userData}
        />
      </div>
    </>
  );
};

export default StatisticsUI;
