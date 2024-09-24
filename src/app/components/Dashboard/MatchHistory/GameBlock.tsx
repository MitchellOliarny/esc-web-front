import React, { useEffect, useImperativeHandle, useState } from "react";
import Image from "next/image";
import LargeMatchHistory from "./LargeMatchHistory";
import SmallMatchHistory from "./SmallMatchHistory";

interface GameBlockUIProps {
  game: any;
  maps: any;
  agents: any;
  totalMultiKills: number;
  totalClutches: number;
  forceLarge: any;
  gamemode: string;
}

const GameBlock = ({
  game,
  maps,
  agents,
  totalMultiKills,
  totalClutches,
  forceLarge,
  gamemode
}: GameBlockUIProps) => {
  const nth = (number: number) => {
    return ["st", "nd", "rd"][((((number + 90) % 100) - 10) % 10) - 1] || "th";
  };

  const [smallActive, setSmallActive] = useState("block");
  const [largeActive, setLargeActive] = useState("none");

  const hoverHandler = () => {
    // console.log("hover");
    setLargeActive("block");
    setSmallActive("none");
  };

  const hoverExitHandler = () => {
    setLargeActive("none");
    setSmallActive("block");
  };


  useEffect(() => {
    forceLarge ? hoverHandler() : hoverExitHandler();
  }, []);

  return (
    <>
      <div
        onMouseEnter={() => hoverHandler()}
        onMouseLeave={() => hoverExitHandler()}
        onClick={() => {
          window.open(
            '/match/'+game.match_id,
            '_blank' // <- This is what makes it open in a new window.
          );
        }}
        style={{cursor: 'pointer'}}
      >
        <div
          style={{ display: `${smallActive}`, transition: "ease-in-out 2s" }}
        >
          <SmallMatchHistory
            mmr_change={game.mmr_change?.mmr_change}
            mapId={maps[game.map].id}
            agentId={agents[game.agent].id}
            rank={game.match_rank}
            mapName={game.map}
            playerTeam={
              game.team.toLowerCase() === "blue" ? game.blue : game.red
            }
            enemyTeam={
              game.team.toLowerCase() === "blue" ? game.red : game.blue
            }
            lbPosition={game.stats.lb_position + nth(game.stats.lb_position)}
            headshotPercentage={game.stats.hs_percent.toFixed(2)}
            acs={game.stats.combat_score.toFixed(2)}
            kills={game.stats.kills}
            deaths={game.stats.deaths}
            assists={game.stats.assists}
            kastPercentage={game.kast.toFixed(2)}
            esc_score={
              game.stats.esc_score ? game.stats.esc_score.toFixed(0) : 0
            }
            showRank={gamemode == 'Competitive' || gamemode == 'Premier' ? true: false}
          />
        </div>
        <div
          style={{ display: `${largeActive}`, transition: "ease-in-out 2s" }}
        >
          <LargeMatchHistory
            mmr_change={game.mmr_change?.mmr_change}
            mapId={maps[game.map].id}
            agentId={agents[game.agent].id}
            rank={game.match_rank}
            mapName={game.map}
            playerTeam={
              game.team.toLowerCase() === "blue" ? game.blue : game.red
            }
            enemyTeam={
              game.team.toLowerCase() === "blue" ? game.red : game.blue
            }
            lbPosition={game.stats.lb_position + nth(game.stats.lb_position)}
            headshotPercentage={game.stats.hs_percent.toFixed(2)}
            acs={game.stats.combat_score.toFixed(2)}
            kills={game.stats.kills}
            deaths={game.stats.deaths}
            assists={game.stats.assists}
            adr={game.stats.adr.toFixed(2)}
            first_kills={game.f_kills_deaths.fKills}
            first_deaths={game.f_kills_deaths.fDeaths}
            kastPercentage={game.kast.toFixed(2)}
            multi_kills={totalMultiKills}
            clutches={totalClutches}
            ability1={game.stats.ability_casts.ability1}
            ability2={game.stats.ability_casts.ability2}
            grenade={game.stats.ability_casts.grenade}
            ultimate={game.stats.ability_casts.ultimate}
            esc_score={
              game.stats.esc_score ? game.stats?.esc_score.toFixed(0) : 0
            }
            credit_score={game.stats?.credit_score?.toFixed(0)}
            showRank={gamemode == 'Competitive' || gamemode == 'Premier' ? true: false}
          />
        </div>
      </div>
    </>
  );
};
1;

export default GameBlock;
