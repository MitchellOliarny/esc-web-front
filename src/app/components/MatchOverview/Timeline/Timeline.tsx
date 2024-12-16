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
    Eliminated: <FaX size={'1.5em'} />,
    Bomb_defused: <FaScrewdriverWrench size={'1.5em'} />,
    Bomb_detonated: <FaExplosion size={'1.5em'} />,
    Time_expired: <FaClock size={'1.5em'} />
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
          <p className="text-2xl text-white font-bold mt-4">Rounds</p>
          <div className="overflow-x-scroll thin-scrollbar">
            <Rounds roundInfo={roundInfo} setRound={setCurrentRound} currentRound={currentRound} />
          </div>
          <div className="flex flex-col w-full h-auto">
            <p className="text-2xl text-center text-ash font-bold mt-4">Round {currentRound + 1}</p>
            <p className="text-2xl text-center text-frost font-bold mt-2">{roundInfo.round_data[currentRound].winning_team} Team Wins by {roundInfo.round_data[currentRound].end_type == 'Eliminated' ? 'Elimination' : roundInfo.round_data[currentRound].end_type == 'Bomb defused' ? 'Defusal' : roundInfo.round_data[currentRound].end_type == 'Bomb detonated' ? 'Detonation' :  roundInfo.round_data[currentRound].end_type}</p>
          </div>
          <div className="overflow-x-scroll thin-scrollbar">
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
