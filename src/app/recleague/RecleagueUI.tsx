import React from "react";
import Image from "next/image";

// import { Orbitron } from "next/font/google";

// const orbitron = Orbitron({
//   subsets: ["latin"],
//   display: "swap",
//   adjustFontFallback: false,
// });

const JoinTheFun = () => {
  return (
    <>
        
      <section
        id="join-the-fun"
        className="px-6 2xl:!px-40 py-20 w-full max-w-[1800px] mx-auto"
      >
        <div className="flex items-center w-full mb-4">
          <h1
            className={`text-[#5ECCBA] text-3xl font-bold xl:text-4xl uppercase font-orbitron border-l-[12px] border-t border-r border-b border-[#5ECCBA] w-fit py-5 px-8 whitespace-nowrap`}
          >
            Join The Fun
          </h1>
          <div className="hidden sm:flex items-center w-full ml-5">
            <div className="w-2 h-2 rounded-full bg-[#5ECCBA] mr-1"></div>
            <div className="w-full h-0.5 bg-[#5ECCBA]"></div>
          </div>
        </div>

        <p className="text-white mt-5">
          Our events are designed to support players on their path to pro!
          Regardless on where you are starting on your journey in gaming. We
          have something for you; We are starting with a $10,000 VALORANT lan
          tournament in Las Vegas. if you can’t make it out to Las Vegas, dont
          worry! We will be hosting online events very soon, express your
          interest below in the skill group you want to play in!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-10">
          <div className="card flex-1 w-full rounded-t-lg shadow-lg hover:-translate-y-1 transition-all">
            <Image
              height={1000}
              width={1000}
              src="/recleague/rec-division-a.png"
              alt=""
              className="rounded-t-lg"
            />
            <div className="card-body p-4 bg-[#132136] rounded-b-lg">
              <h2 className="card-title text-white text-2xl font-orbitron">
                Division A
              </h2>
              <p className="text-white mb-4">
                Our highest level of competition. Broadcasted games &
                professional stakes. Games for aspiring pro players.
              </p>

              <p className="font-bold flex items-end">
                Suggested Skill Group:
                <br /> Ascendant+
              </p>
              <div className="card-actions justify-end">
                <button className="notifyMe btn btn-ghost text-white bg-[#F5603C] hover:bg-[#AC442A] rounded-full w-full justify-center mt-4">
                  Notify Me
                </button>
              </div>
            </div>
          </div>

          <div className="card w-full rounded-t-lg shadow-lg hover:-translate-y-1 transition-all">
            <Image
              height={1000}
              width={1000}
              src="/recleague/rec-division-b.png"
              alt=""
              className="rounded-t-lg"
            />
            <div className="card-body p-4 bg-[#132136] rounded-b-lg">
              <h2 className="card-title text-white text-2xl font-orbitron">
                Division B
              </h2>
              <p className="text-white mb-4">
                Where players realize they have a chance of becoming a top
                player.
              </p>

              <p className="font-bold flex items-end">
                Suggested Skill Group:
                <br />
                Platinum-Diamond
              </p>
              <div className="card-actions justify-end">
                <button className="notifyMe btn btn-ghost text-white bg-[#F5603C] hover:bg-[#AC442A] rounded-full w-full mt-4">
                  Notify Me
                </button>
              </div>
            </div>
          </div>

          <div className="card w-full rounded-t-lg shadow-lg hover:-translate-y-1 transition-all">
            <Image
              height={1000}
              width={1000}
              src="/recleague/rec-division-c.png"
              alt=""
              className="rounded-t-lg"
            />
            <div className="card-body p-4 bg-[#132136] rounded-b-lg">
              <h2 className="card-title text-white text-2xl font-orbitron">
                Division C
              </h2>
              <p className="text-white mb-4">
                For players looking for a casually competitive environment to
                experience gaming beyond matchmaking.
              </p>

              <p className="font-bold flex items-end">
                Suggested Skill Group:
                <br /> Silver-Gold
              </p>
              <div className="card-actions justify-end">
                <button className="notifyMe btn btn-ghost text-white bg-[#F5603C] hover:bg-[#AC442A] rounded-full w-full mt-4">
                  Notify Me
                </button>
              </div>
            </div>
          </div>

          <div className="card w-full rounded-t-lg shadow-lg hover:-translate-y-1 transition-all">
            <Image
              height={1000}
              width={1000}
              src="/recleague/rec-division-d.png"
              alt=""
              className="rounded-t-lg"
            />
            <div className="card-body p-4 bg-[#132136] rounded-b-lg">
              <h2 className="card-title text-white text-2xl font-orbitron">
                Division D
              </h2>
              <p className="text-white mb-4">
                Where players exploring gaming start. an easy way to learn how
                to play in a social setting.
              </p>

              <p className="font-bold flex items-end">
                Suggested Skill Group:
                <br /> Iron-Bronze
              </p>
              <div className="card-actions justify-end">
                <button className="notifyMe btn btn-ghost text-white bg-[#F5603C] hover:bg-[#AC442A] rounded-full w-full mt-4">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JoinTheFun;
