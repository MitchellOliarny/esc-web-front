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
}: {
  isLoading: boolean;
  roundInfo: any;
  players: any;
  mapInfo: any;
}) {
  leapfrog.register();
  const [currentRound, setCurrentRound] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [currentEventInfo, setCurrentEventInfo] = useState({});


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

    const GetRoundIcon = (endType: string, team: string)=>{
        //@ts-ignore
        return round_end_icons[endType+'_'+team];
    }

  console.log(roundInfo.round_data[currentRound])

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
            <Rounds roundInfo={roundInfo} setRound={setCurrentRound} currentRound={currentRound} />
          </div>
          <div className="flex flex-col w-full h-auto mb-2">
            <p className="text-2xl text-center text-ash font-bold mt-4">Round {currentRound + 1}</p>
            <div className="flex flex-row gap-2 mx-auto items-baseline">
            <p className="text-2xl text-center text-frost font-bold mt-2">{roundInfo.round_data[currentRound].winning_team} Team Wins by {roundInfo.round_data[currentRound].end_type == 'Eliminated' ? 'Elimination' : roundInfo.round_data[currentRound].end_type == 'Bomb defused' ? 'Defusal' : roundInfo.round_data[currentRound].end_type == 'Bomb detonated' ? 'Detonation' :  roundInfo.round_data[currentRound].end_type}</p>
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
            <Minimap roundInfo={roundInfo.round_data[currentRound]} players={players} map_id={roundInfo.map_id} eventInfo={currentEventInfo} mapInfo={mapInfo}/>
          </div>
        </div>
      </div>
    </>
  );
}
