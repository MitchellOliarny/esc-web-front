import React, { useState } from "react";
import LargeMatchHistory from "./LargeMatchHistory";
import SmallMatchHistory from "./SmallMatchHistory";
import GameBlock from "./GameBlock";
import DateBlock from "./DateBlock";
import { Button } from "@nextui-org/react";
import { MeasureMemoryMode } from "vm";
import { daysSince, formatDateYear, formatDateYearShort, shortDate } from "../../../utils/helpers"

interface MatchHistoryUIProps {
  userGames: UserGames[];
  valMaps: ValMaps[];
  valAgents: ValAgents[];
  gamemode: string;
}

const MatchHistoryUI = ({
  userGames,
  valMaps,
  valAgents,
  gamemode
}: MatchHistoryUIProps) => {
  // @ts-nocheck
  const [displayedGames, setDisplayedGames] = useState(10);

  let maps: { [key: string]: any } = {};
  let agents: { [key: string]: any } = {};
  let GamesByDate: {[key: string]: {games: [any], stats: {}, medal_progress: {}, rr_sum: 0}} = {};
  let gameStats: {[key: string]: {clutches: number, multikills: number}} = {};

  const [currentHover, setCurrentHover] = useState(null);

  for (const x in valMaps) {
    maps[valMaps[x].name] = valMaps[x];
  }

  for (const x in valAgents) {
    agents[valAgents[x].name] = valAgents[x];
  }

  const nth = (number: number) => {
    return ["st", "nd", "rd"][((((number + 90) % 100) - 10) % 10) - 1] || "th";
  };

  const DateBlockStatAverages = (stats: any, date: string) => {
    for (const i in stats) {
      if(typeof stats[i] === 'object')
          DateBlockStatAverages(stats[i], date);
      else
        //@ts-ignore
        GamesByDate[date].stats[i] ? GamesByDate[date].stats[i] += stats[i] : GamesByDate[date].stats[i] = stats[i];
    }
  }

  const SortGamesByDate = (x: any) => {
    const formattedDate = shortDate(x.date);
    //const dateSeparated = formattedDate?.replace(',', '').split(' ');
    //@ts-ignore
    const gameDate = formattedDate //(dateSeparated[0]) + '-' + (dateSeparated[1]) + '-' + dateSeparated[2];
    GamesByDate[gameDate] ?
      GamesByDate[gameDate].games.push(x) :
      GamesByDate[gameDate] = {'games': [x], 'stats': {wins: 0, losses: 0, round_wins: 0, round_losses: 0, kast: 0, clutches: 0, multikills: 0}, 'medal_progress': {}, rr_sum: 0};
    //@ts-ignore
    x[x.team] > x[x.team == 'blue' ? 'red' : 'blue'] ? GamesByDate[gameDate].stats.wins += 1 : x['blue'] != x['red'] ? GamesByDate[gameDate].stats.losses += 1 : '';
    //@ts-ignore
    GamesByDate[gameDate].stats.round_wins += x[x.team];
    //@ts-ignore
    GamesByDate[gameDate].stats.round_losses += x[x.team == 'blue' ? 'red' : 'blue'];
    DateBlockStatAverages(x.stats, gameDate);
    //@ts-ignore
    GamesByDate[gameDate].stats.kast += x.kast;

    GamesByDate[gameDate].rr_sum += x.mmr_change.mmr_change

    gameStats[x.match_id] = {clutches: 0, multikills: 0};

    for (const i in x?.multikills) {
      if (i !== "1k") {
         //@ts-ignore
        GamesByDate[gameDate].stats.multikills += Number(x.multikills[i]);
         //@ts-ignore
        gameStats[x.match_id].multikills += Number(x.multikills[i]);
      }
    }
    for (const i in x?.clutches.won) {
       //@ts-ignore
       GamesByDate[gameDate].stats.clutches += Number(x.clutches.won[i]);
        //@ts-ignore
       gameStats[x.match_id].clutches += Number(x.clutches.won[i]);
    }

    for(const i in x?.medal_progress){
      //@ts-ignore
      if(GamesByDate[gameDate].medal_progress[i]){
        //@ts-ignore
        GamesByDate[gameDate].medal_progress[i].progress += x.medal_progress[i].progress;
        for(const j in x.medal_progress[i].tiers){
          if(x.medal_progress[i].tiers[j].isComplete == true) {
            //@ts-ignore
            GamesByDate[gameDate].medal_progress[i].tiers[j] = x.medal_progress[i].tiers[j];
          }
        }
      }
      else {
        //@ts-ignore
        GamesByDate[gameDate].medal_progress[i] = x.medal_progress[i];
      }
    }
  }

  if (userGames) {
    for (const x in userGames) {
      SortGamesByDate(userGames[x]);
    }
  }

  const loadMoreGames = () => {
    setDisplayedGames(displayedGames + 10);
  };


  //console.log(gameStats);
  //console.log(GamesByDate)
  //console.log(userGames);

  return (
    <>
      <div className="mt-4">
        <div className="col-span-9">
        {Object.keys(GamesByDate).map(index => (
          <div className="mb-12 gameRowLeftLineMiddle" key={index}>
            <DateBlock 
            //@ts-ignore
              date={formatDateYearShort(index)}
              //@ts-ignore
              headshot = {(GamesByDate[index]?.stats.hs_percent / GamesByDate[index]?.games.length).toFixed(2)}
              //@ts-ignore
              adr = {(GamesByDate[index]?.stats.adr / GamesByDate[index]?.games.length).toFixed(2)}
              //@ts-ignore
              wins = {GamesByDate[index]?.stats.wins}
              //@ts-ignore
              losses = {GamesByDate[index]?.stats.losses}
              //@ts-ignore
              roundWin={(GamesByDate[index]?.stats.round_wins / (GamesByDate[index]?.stats.round_wins + GamesByDate[index]?.stats.round_losses)*100).toFixed(2)}
              //@ts-ignore
              kast={(GamesByDate[index]?.stats.kast / GamesByDate[index]?.games.length).toFixed(2)}
              //@ts-ignore
              acs={(GamesByDate[index]?.stats.combat_score / GamesByDate[index]?.games.length).toFixed(2)}
              //@ts-ignore
              kad={((GamesByDate[index]?.stats.kills + GamesByDate[index]?.stats.assists)/ GamesByDate[index]?.stats.deaths).toFixed(2)}
              //@ts-ignore
              mechScore={(GamesByDate[index]?.stats.esc_score / GamesByDate[index]?.games.length).toFixed(2)}
              //@ts-ignore
              medalsProgress={(GamesByDate[index]?.medal_progress)}
              //@ts-ignore
              days_since={daysSince(index)}

              rr_sum={GamesByDate[index]?.rr_sum}
            />
          {GamesByDate[index]?.games.map((game, count) => (
            <div className={`mb-4`} key={index+""+count} >
              <GameBlock 
                forceLarge = {count === 0 && index === Object.keys(GamesByDate)[0] ? true: false}
                game = {game}
                maps = {maps}
                agents = {agents}
                totalMultiKills={gameStats[game.match_id].multikills}
                totalClutches={gameStats[game.match_id].clutches}  
                gamemode={gamemode}
              />
            </div>
          ))}
          </div>
        ))}
          {displayedGames < userGames?.length && (
            <Button
              onClick={loadMoreGames}
              className="bg-[#F5603C] text-white font-medium rounded-md flex mx-auto"
            >
              Load More
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default MatchHistoryUI;
