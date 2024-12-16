import React, { useEffect, useState } from "react";
import { FaX, FaExplosion, FaScrewdriverWrench, FaClock } from "react-icons/fa6";
import Rounds from "./Rounds";
import Minimap from "./Minimap";
import RoundEvents from "./roundEvents";
import { leapfrog } from "ldrs";

export default function Timeline({
  isLoading,
  roundInfo,
  players,
  mapInfo,
  user
}: {
  isLoading: boolean;
  roundInfo: any;
  players: any;
  mapInfo: any;
  user: any
}) {
  leapfrog.register();
  const [currentRound, setCurrentRound] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [currentEventInfo, setCurrentEventInfo] = useState({});
  const [selectedUser, setSelectedUser] = useState({})
  const [playerRoundStats, setPlayerRoundStats] = useState({});


  const round_end_icons = {
    'Eliminated_Red': <img className={`w-auto h-fit`} src={'/icons/elim_red.png'}></img>,
    'Eliminated_Blue': <img className={`w-auto h-fit`} src={'/icons/elim_blue.png'}></img>,
    'Bomb defused_Red': <img className={`w-auto h-fit`} src={'/icons/defuse_red.png'}></img>,
    'Bomb defused_Blue': <img className={`w-auto h-fit`} src={'/icons/defuse_blue.png'}></img>,
    'Bomb detonated_Red': <FaExplosion size={'1em'} />,
    'Bomb detonated_Blue': <FaExplosion size={'1em'} />,
    'Round timer expired_Red': <FaClock size={'1em'} />,
    'Round timer expired_Blue': <FaClock size={'1em'} />,
  }

  const GetRoundIcon = (endType: string, team: string) => {
    //@ts-ignore
    return round_end_icons[endType + '_' + team];
  }

  useEffect(() => {

    let temp = {}
    for (const x in roundInfo.round_data) {
      //@ts-ignore
      temp[x] = {};
      console.log(roundInfo.round_data[x])
      //set up a player slot
      roundInfo.round_data[x].player_stats.map((value: any, index: number) => {
        //@ts-ignore
        temp[x][value.player_puuid] = value;
        //@ts-ignore
        temp[x][value.player_puuid].assists = 0;
        //@ts-ignore
        temp[x][value.player_puuid].deaths = 0;
      })

      //Find any unknown stats
      roundInfo.round_data[x].player_stats.map((value: any, index: number) => {

        if (value.kill_events.length > 0) {
          value.kill_events.map((kill: any) => {
            if (kill.assistants.length > 0) {
              kill.assistants.map((assist: any) => {
                //@ts-ignore
                temp[x][assist.assistant_puuid].assists += 1
              })
            }
            //@ts-ignore
            temp[x][kill.victim_puuid].deaths += 1;
          })
        }
      })
    }
    //@ts-ignore
    setPlayerRoundStats(temp);
  }, [roundInfo])



  return (
    <>
      <div>
        <div style={{ display: isLoading ? 'flex' : 'none', fontSize: '2em', alignContent: 'flex-end', flexWrap: 'wrap-reverse' }}>Loading
          <l-leapfrog
            size="45"
            speed="1.75"
            color="#F5603C"
          ></l-leapfrog>
        </div>
        <div className="flex-col" style={!isLoading ? { display: 'flex' } : { display: 'none' }}>
          <div className="overflow-x-scroll thin-scrollbar pt-4 pb-4 px-1">
            <Rounds roundInfo={roundInfo} setRound={setCurrentRound} currentRound={currentRound} selected_stats={selectedUser} player_round_stats={playerRoundStats}/>
          </div>
          <div className="flex flex-col w-full h-auto mb-2">
            <p className="text-2xl text-center text-ash font-bold mt-4">Round {currentRound + 1}</p>
            <div className="flex flex-row gap-2 mx-auto items-baseline">
              <p className="text-2xl text-center text-frost font-bold mt-2">{roundInfo.round_data[currentRound].winning_team} Team Wins by {roundInfo.round_data[currentRound].end_type == 'Eliminated' ? 'Elimination' : roundInfo.round_data[currentRound].end_type == 'Bomb defused' ? 'Defusal' : roundInfo.round_data[currentRound].end_type == 'Bomb detonated' ? 'Detonation' : roundInfo.round_data[currentRound].end_type}</p>
              {
                GetRoundIcon(roundInfo.round_data[currentRound].end_type, roundInfo.round_data[currentRound].winning_team)
              }
            </div>
          </div>
          <div className="overflow-x-scroll thin-scrollbar pt-4 pb-4 px-1">
            <RoundEvents roundInfo={roundInfo.round_data[currentRound]} currentRound={currentRound} currentEvent={currentEvent} setEvent={setCurrentEvent} setEventInfo={setCurrentEventInfo} players={players} />
          </div>
          <p className="text-2xl text-white font-bold mt-4">Minimap Recreation</p>
          <div className="overflow-hidden h-auto">
            <Minimap roundInfo={roundInfo.round_data[currentRound]} players={players} map_id={roundInfo.map_id} eventInfo={currentEventInfo} mapInfo={mapInfo} selectHighlightUser={setSelectedUser} user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
