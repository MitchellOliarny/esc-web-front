import React, { useEffect, useState } from "react";
import Image from "next/image";

interface DateBlockHistoryUIProps {
  date: string;
  wins: number;
  losses: number;
  roundWin: number;
  adr: number;
  kast: number;
  headshot: number;
  acs: number;
  kad: number;
  mechScore: number;
  medalsProgress: any;
  days_since: string;
}

const DateBlock = ({ date, days_since, wins, losses, roundWin, adr, kast, headshot, acs, kad, mechScore, medalsProgress}: DateBlockHistoryUIProps) => {

  const [completedMedals, setCompletedMedals] = useState([]);

  const FindCompletedMedals = () => {
    let temp = [];
    for (const x in medalsProgress) {
      for(const i in medalsProgress[x].tiers) {
        if(medalsProgress[x].tiers[i].isComplete == true) {
          temp.push({tier: (Number(i)+1), medal: x+"_"+(Number(i)+1)})
        }
      }
    }
    //@ts-ignore
    temp.sort((a, b) => b.tier - a.tier);
    //@ts-ignore
    setCompletedMedals(temp);
  }
  useEffect(()=>{
    FindCompletedMedals();
  },[])
 

  return (
    <>
      <div className="h-24 mb-4 ">
        <div className="grid grid-cols-12 grid-rows-1 back-slate rounded-lg h-full content-center">
          <div className="col-span-2 flex flex-col w-full h-full game-border-r pl-4 justify-center">
            <h3 className="text-frost text-lg font-bold text-left"> {days_since} <span className="text-ash">• {date}</span></h3>
            <div className="flex font-bold text-xl text-left">
              <p className="text-frost">{wins} <span className="text-win">Wins</span></p>
              &nbsp;<span className="text-ash">•</span>&nbsp;
              <p className="text-frost">{losses} <span className="text-loss">Losses</span></p>
            </div>
          </div>

          <div className="col-span-6 grid grid-cols-7 content-center flex-wrap px-8 w-full h-full">
            {
              completedMedals.length > 0 ?
              completedMedals.slice(0, 7).map((value) => {
                return (
                  //@ts-ignore
                  <img key={value.medal} src={value.medal + '.png'} alt={value.medal}></img>
                )
              })
              :
              <p className="text-ash font-bold">No Medals Earned</p>
            }
          </div>

          <div className="col-span-4 flex justify-between content-center flex-wrap w-full h-full px-8">
            {/* <div>
              <h3 className="font-bold ">Round Win%</h3>
              <p className="font-bold text-2xl text-[#4DFFDD]">{roundWin}%</p>
            </div> */}

            {/* <div>
              <h3 className="font-bold">AD/R</h3>
              <p className="font-bold text-2xl text-[#4DFFDD]">{adr}</p>
            </div> */}

            <div>
              <h3 className="font-[600] text-ash text-sm">AVG KA/D</h3>
              <p className="font-bold text-xl text-frost">{kad}</p>
            </div>

            <div>
              <h3 className="font-[600] text-ash text-sm">AVG ACS</h3>
              <p className="font-bold text-xl text-frost">{acs}</p>
            </div>

            <div>
              <h3 className="font-[600] text-ash text-sm">AVG HS%</h3>
              <p className="font-bold text-xl text-frost">{headshot}%</p>
            </div>

            <div>
              <h3 className="font-[600] text-ash text-sm">AVG KAST%</h3>
              <p className="font-bold text-xl text-frost">{kast}%</p>
            </div>


            {/* <div>
              <h3 className="font-bold">Mech Score</h3>
              <p className="font-bold text-2xl text-[#4DFFDD]">{mechScore}</p>
            </div> */}

          </div>
        </div>
      </div>
    </>
  );
};
1;

export default DateBlock;
