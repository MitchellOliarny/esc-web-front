import React from "react";
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
}

const DateBlock = ({ date, wins, losses, roundWin, adr, kast, headshot, acs, kad, mechScore }: DateBlockHistoryUIProps) => {
  return (
    <>
      <div className="gameRowLeftLineTop">
        <div className="grid grid-cols-12 items-center bg-[#102B3D] p-2 rounded-lg mb-4">
          <div className="col-span-3 flex flex-col items-center text-center">
            <h3 className="text-white text-2xl font-bold">{date}</h3>
            <div className="flex font-bold text-lg">
              <p className="text-[#5ECCBA]">{wins} W</p>&nbsp;:&nbsp;
              <p className="text-[#F5603C]">{losses} L</p>
            </div>
          </div>

          <div className="col-span-9 flex justify-between pr-10">
            <div>
              <h3 className="font-bold ">Round Win%</h3>
              <p className="font-bold text-2xl text-[#4DFFDD]">{roundWin}%</p>
            </div>

            <div>
              <h3 className="font-bold">AD/R</h3>
              <p className="font-bold text-2xl text-[#4DFFDD]">{adr}</p>
            </div>

            <div>
              <h3 className="font-bold">KAST%</h3>
              <p className="font-bold text-2xl text-[#4DFFDD]">{kast}%</p>
            </div>

            <div>
              <h3 className="font-bold">HS%</h3>
              <p className="font-bold text-2xl text-[#4DFFDD]">{headshot}%</p>
            </div>

            <div>
              <h3 className="font-bold">ACS</h3>
              <p className="font-bold text-2xl text-[#4DFFDD]">{acs}</p>
            </div>

            <div>
              <h3 className="font-bold">KA/D</h3>
              <p className="font-bold text-2xl text-[#4DFFDD]">{kad}</p>
            </div>

            <div>
              <h3 className="font-bold">Mech Score</h3>
              <p className="font-bold text-2xl text-[#4DFFDD]">{mechScore}</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
1;

export default DateBlock;
