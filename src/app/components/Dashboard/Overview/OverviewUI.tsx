import React, { useState, useEffect } from "react";
import MatchHistoryUI from "../MatchHistory/MatchHistoryUI";
import AgentBoxV2 from "../Agents/AgentBoxV2";
import StatsScore from "../Statistics/StatsScore";
import CareerHealth from "../Statistics/CareerHealth";
import StatsPanel from "../Statistics/StatsPanel";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FiRefreshCcw } from "react-icons/fi";
import doFindGames from "@/app/dashboard/dashboardActions/doFindGames";
import doSearchGames from "@/app/dashboard/dashboardActions/doFilterGames";
import { toast } from "react-hot-toast";
import { revalidatePath } from "next/cache";
import { Spinner } from "@nextui-org/react";

interface StatsUIProps {
  userInfo: UserInfo;
  userGames: UserGames[];
  valMaps: ValMaps[];
  valAgents: ValAgents[];
  valAverage: ValAverage[];
  userData: {
    valorant_banner: string;
    isStudent: number;
  };
  topAgentGames: any;
  topAgentId: string;
  topAgentName: string;
  isAdmin: boolean;
  gamemode: string;
  onSearch: (valGames: Object) => void;
}

const OverviewUI = ({
  userInfo,
  userGames,
  valMaps,
  valAgents,
  valAverage,
  userData,
  topAgentGames,
  topAgentId,
  topAgentName,
  isAdmin,
  gamemode,
  onSearch
}: StatsUIProps) => {
  const [canClick, setCanClick] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFindGames = async () => {
    try {
      setCanClick(false);
      const response = await doFindGames();
      //@ts-ignore
      if (response.success == true) {
        const games = await doSearchGames('', 'Competitive');
        setIsLoading(false);
        toast.success("Games are now up to date.");
        onSearch(games)
        if (!isAdmin) {
          setTimeout(() => {
            setCanClick(true);
          }, 5 * 60 * 1000);
        }
        else {
          setCanClick(true);
        }
      } else {
        setIsLoading(false);
        toast.error(response.error_message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error)
      toast.error("ERROR: Please try again later");
    }
  };

  let agent_array: { [key: string]: any } = {};
  for (const x in valAgents) {
    agent_array[valAgents[x].name] = valAgents[x];
  }
  let maps_array: { [key: string]: any } = {};
  for (const x in valMaps) {
    maps_array[valMaps[x].name] = valMaps[x];
  }


  const recentGames = userGames?.slice(0, 10);

  // REMOVE THE NUMBER OF GAMES IN THE FUTURE
  let totalImportantRounds = 0;
  let gamesWithImportantRounds = 0;
  let totalEscScore = 0;
  let gamesWithEscScore = 0;

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
  const currRank = userGames ? userGames[0]?.match_rank : 0;
  const current_rank = currRank - (currRank % 3);

  // console.log("Clutches:", JSON.stringify(clutchesTotals));


  // console.log(clutches);

  // console.log(topAgent.length);

  //console.log(valAverage)

  const aveImportantRounds =
    gamesWithImportantRounds > 0
      ? totalImportantRounds / gamesWithImportantRounds
      : 0;

  const aveEscScore =
    gamesWithEscScore > 0 ? totalEscScore / gamesWithEscScore : 0;


  return (
    <>
      {userGames ?
        <div className="mt-4">

          <h2 className="text-4xl font-bold py-4 col-span-4">Stats</h2>
          <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-4 mb-4">
            {/* @ts-ignore */}
            <StatsScore userGames={userGames} valAverage={valAverage ? valAverage[ranks[current_rank]]?.all : null} isAgentBox={windowWidth < 1000 ? true : false}/>
            <div>
              {recentGames?.length > 0 && (
                // @ts-ignore
                <AgentBoxV2 agentGames={topAgentGames} agentAverages={valAverage && valAverage[ranks[current_rank]] ? valAverage[ranks[current_rank]][topAgentName] : {}} agentId={topAgentId} agentInfo={agent_array[topAgentName]} maps={maps_array} isMobile={windowWidth < 1000 ? true : false}/>
              )}
            </div>
          </div>

          <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-4 mb-4">
            <div className="grid cols-span-12">
              <StatsPanel
                userInfo={userInfo}
                userGames={userGames}
                valAverage={valAverage}
                userData={userData}

              />
            </div>
            <div className="grid cols-span-12 gap-4 mb-4 h-full">
              <CareerHealth userGames={userGames} />
            </div>
          </div>

          <div>
            <div className="grid grid-cols-12 gap-4">
              <div className="py-4 col-span-12 flex items-center gap-3">
                <h2 className="text-4xl font-bold">Match History</h2>
                {recentGames?.length && (
                  <Button
                    onClick={() => {
                      handleFindGames();
                      setCanClick(false);
                      setIsLoading(true);
                    }}
                    className={`${canClick
                      ? "bg-[#F5603C] text-white"
                      : "btn-disabled bg-[#F5603C]/40 text-slate-500"
                      }  min-w-fit h-fit p-1.5 rounded-lg flex items-center cursor-pointer`}
                  >
                    {isLoading ? (
                      <Spinner color="default" size="sm" />
                    ) : (
                      <FiRefreshCcw className="text-2xl" />
                    )}
                  </Button>
                )}
              </div>

            </div>

            <div className="grid grid-cols-12 gap-4 lg:overflow-x-visible overflow-x-scroll">
              <div className="col-span-12">
                {recentGames?.length > 0 ? (
                  <MatchHistoryUI
                    userGames={recentGames}
                    valMaps={valMaps}
                    valAgents={valAgents}
                    gamemode={gamemode}
                  />
                ) : (
                  <div>
                    <p>
                      You either don&apos;t have a valid Riot Account connected or
                      you don&apos;t have any recent games.
                    </p>
                    <Link href="/settings?view=Connections">
                      <Button className="bg-[#F5603C] text-white font-medium rounded-md mt-2 mb-4">
                        Connect your Riot Account
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

            </div>
          </div>
          </div>
          :
          <div>
            <h2 className="text-2xl font-medium">No Game Information Found. Make sure your Riot information is correct <Link className="font-bolder" style={{color:'#F5603C'}} href='/settings?view=Connections'>HERE</Link></h2>
          </div>
        }
    </>
  );
};

export default OverviewUI;
