import React from "react";
import Image from "next/image";
import Link from "next/link";
// import { Orbitron } from "next/font/google";

// const orbitron = Orbitron({
//   subsets: ["latin"],
//   display: "swap",
//   adjustFontFallback: false,
// });

const OurRoadmap = () => {
  return (
    <div id="our-roadmap" className="pt-40 pb-20">
      <div className="px-4 2xl:px-40 w-full max-w-[1800px] mx-auto">
        <div className="text-center flex flex-col justify-center items-center">
          <h2
            className={`text-5xl font-bold pb-4 border-b-4 w-fit uppercase`}
          >
            Our Roadmap
          </h2>
          <p className="pt-4 text-lg">
            A platform for players to connect and compete
          </p>
        </div>

        {/* <div className="hidden lg:grid grid-cols-2 gap-20 py-20">
          <div>
            <div className="flex items-center gap-2 pb-2">
              <div className="w-8 h-0.5 bg-[#5ECCBA]"></div>
              <p className="text-[#5ECCBA]">
                Connect and Compete - Local Events
              </p>
            </div>
            <h3 className="text-4xl font-semibold leading-snug">
              Hosting local events to foster
              <br />
              connection & friendships!
            </h3>
            <p className="py-8">
              Gaming is more than just competition, its a lifestyle. Players who
              are looking to get the most out of gaming need to connect just as
              much as they need to compete. Esports and gaming are competitive
              connections, our events are meant for players looking to find
              friends and foes alike!
            </p>
            <button className="btn text-white font-semibold py-4 px-8 rounded-full bg-[#F5603C] hover:bg-[#AC442A]">
              Our Events
            </button>
          </div>
          <div className="flex justify-end">
            <Image
              src="/homepage/landing-connect-1.png"
              alt=""
              width={1000}
              height={1000}
            />
          </div>
        </div> */}

        {/* <div className="py-20 items-center lg:hidden">
          <div>
            <div className="flex items-center gap-2 pb-2">
              <div className="w-8 h-0.5 bg-[#5ECCBA]"></div>
              <p className="text-[#5ECCBA]">
                Connect and Compete - Local Events
              </p>
            </div>
            <h3 className="text-4xl mb-4 font-semibold leading-snug">
              Hosting local events to foster connection & friendships!
            </h3>
            <div className="flex justify-end">
              <Image
                src="/homepage/landing-connect-1.png"
                alt=""
                width={1000}
                height={1000}
              />
            </div>
            <p className="py-8">
              Gaming is more than just competition, its a lifestyle. Players who
              are looking to get the most out of gaming need to connect just as
              much as they need to compete. Esports and gaming are competitive
              connections, our events are meant for players looking to find
              friends and foes alike!
            </p>
            <button className="btn text-white font-semibold py-4 px-8 rounded-full bg-[#F5603C] hover:bg-[#AC442A] w-full">
              Our Events
            </button>
          </div>
        </div> */}
        <div className="hidden lg:grid grid-cols-2 gap-20 py-20">
          <div>
            <div className="flex items-center gap-2 pb-2">
              <div className="w-8 h-0.5 bg-[#5ECCBA]"></div>
              <p className="text-[#5ECCBA]">
                Collect Medals while playing VALORANT!
              </p>
            </div>
            <h3 className="text-4xl font-semibold leading-snug">
              Display your in-game achievements on your
              EsportsClubs.gg profile
            </h3>
            <p className="py-8">
              Gun medals are achievements centered on all 19 weapons in VALORANT.
              Track your stats for each weapon and show off when you pop off!
              Game event medals; win a game 13-0, clutch 3vs1, defuse the spike with less than 1 second left and many more!
              Agent medals are something we are still putting together.
              Imagine updrafting on jett with bladestorm active and getting 2 kills mid air!
              We are partnering with Omnic.ai to create a way to analyze your gameplay and reward you for your achievements!
            </p>
            <Link id="myTeam2" href="/dashboard?view=medals">
            <button className="btn text-white font-semibold py-4 px-8 rounded-full bg-[#F5603C] hover:bg-[#AC442A]">
            Start Collecting
            </button>
            </Link>
          </div>
          <div className="flex justify-end h-fit">
            <Image
            style={{width: '100%', height: 'auto', border: '2px white solid'}}
            className="stat-box-border"
              src="/homepage/medals.png"
              alt=""
              width={1000}
              height={1000}
            />
          </div>
        </div>


        <div className="py-20 items-center lg:hidden">
          <div>
            <div className="flex items-center gap-2 pb-2">
              <div className="w-8 h-0.5 bg-[#5ECCBA]"></div>
              <p className="text-[#5ECCBA]">
              Collect Medals while playing VALORANT!
              </p>
            </div>
            <h3 className="text-4xl mb-4 font-semibold leading-snug">
            Display your in-game achievements on your
            EsportsClubs.gg profile
            </h3>
            <div className="flex justify-end">
              <Image
              style={{width: '100%', height: 'auto', border: '2px white solid'}}
            className="stat-box-border"
                src="/homepage/medals.png"
                alt=""
                width={1000}
                height={1000}
              />
            </div>
            <p className="py-8">
            Gun medals are achievements centered on all 19 weapons in VALORANT.
              Track your stats for each weapon and show off when you pop off!
              Game event medals; win a game 13-0, clutch 3vs1, defuse the spike with less than 1 second left and many more!
              Agent medals are something we are still putting together.
              Imagine updrafting on jett with bladestorm active and getting 2 kills mid air!
              We are partnering with Omnic.ai to create a way to analyze your gameplay and reward you for your achievements!
            </p>
            <button className="btn text-white font-semibold py-4 px-8 rounded-full bg-[#F5603C] hover:bg-[#AC442A] w-full">
              Start Collecting
            </button>
          </div>
        </div>





        <div className="hidden lg:grid grid-cols-2 gap-20 py-20">
          <div className="flex justify-start">
            <Image
              src="/homepage/landing-building-tools-4.png"
              alt=""
              width={1000}
              height={1000}
            />
          </div>
          <div>
            <div className="flex items-center gap-2 pb-2">
              <div className="w-8 h-0.5 bg-[#F5603C]"></div>
              <p className="text-[#F5603C]">Analyze Your Gameplay for Unique Insights</p>
            </div>
            <h3 className="text-4xl font-semibold leading-snug">
              Beyond the Valorant API - Omnic.AI
            </h3>
            <p className="py-8">
              We’ve partnered with{" "}
              <Link className="text-[#3EB4E4]" href="https://www.omnic.ai/">
                Omnic.ai
              </Link>{" "}
              to leverage AI video processing to combine all the data into a powerful data stream of unique information that cannot be acquired anywhere else! Unique insights and information available to help you on your VALORANT Journey.

            </p>
            <button className="btn btn-disabled !text-white/40 font-semibold py-4 px-8 rounded-full bg-[#F5603C] hover:bg-[#AC442A]">
              Coming Soon
            </button>
          </div>

        </div>

        <div className="py-20 items-center lg:hidden">
          <div>
            <div className="flex items-center gap-2 pb-2">
              <div className="w-8 h-0.5 bg-[#F5603C]"></div>
              <p className="text-[#F5603C]">Analyze Your Gameplay for Unique Insights</p>
            </div>
            <h3 className="text-4xl mb-4 font-semibold leading-snug">
              Beyond the Valorant API - Omnic.AI
            </h3>
            <div className="flex justify-start">
              <Image
                src="/homepage/landing-building-tools-4.png"
                alt=""
                width={1000}
                height={1000}
              />
            </div>
            <p className="py-8">
              We’ve partnered with{" "}
              <Link className="text-[#3EB4E4]" href="https://www.omnic.ai/">
                Omnic.ai
              </Link>{" "}
              to leverage AI video processing to combine all the data into a powerful data stream of unique information that cannot be acquired anywhere else! Unique insights and information available to help you on your VALORANT Journey.

            </p>
            <button className="btn btn-disabled !text-white/40 font-semibold py-4 px-8 rounded-full bg-[#F5603C] hover:bg-[#AC442A] w-full">
              Coming Soon
            </button>
          </div>
        </div>



        <div className="hidden lg:grid grid-cols-2 gap-20 py-20">
          <div>
            <div className="flex items-center gap-2 pb-2">
              <div className="w-8 h-0.5 bg-[#5ECCBA]"></div>
              <p className="text-[#5ECCBA]">
              Connect and Compete - Online Events
              </p>
            </div>
            <h3 className="text-4xl font-semibold leading-snug">
              Beyond Online
              Matchmaking
            </h3>
            <p className="py-8">
            Become a member and join us for leaderboard tournaments, clip contests, medal bounties! Earn VALORANT points and other prizes when participating.

            </p>
            <button className="btn btn-disabled !text-white/40 font-semibold py-4 px-8 rounded-full bg-[#F5603C] hover:bg-[#AC442A]">
              Coming Soon
            </button>
          </div>
          <div className="flex justify-start">
            <Image
              src="/homepage/landing-connect-2.png"
              alt=""
              width={1000}
              height={1000}
            />
          </div>
        </div>

        <div className="py-20 items-center lg:hidden">
          <div>
            <div className="flex items-center gap-2 pb-2">
              <div className="w-8 h-0.5 bg-[#5ECCBA]"></div>
              <p className="text-[#5ECCBA]">
              Connect and Compete - Online Events
              </p>
            </div>
            <h3 className="text-4xl mb-4 font-semibold leading-snug">
              Beyond Online Matchmaking
            </h3>
            <div className="flex justify-start">
              <Image
                src="/homepage/landing-connect-2.png"
                alt=""
                width={1000}
                height={1000}
              />
            </div>
            <p className="py-8">
            Become a member and join us for leaderboard tournaments, clip contests, medal bounties! Earn VALORANT points and other prizes when participating.

            </p>
            <button className="btn btn-disabled !text-white/40 font-semibold py-4 px-8 rounded-full bg-[#F5603C] hover:bg-[#AC442A] w-full">
              Coming Soon
            </button>
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-2 gap-20 py-20">
          <div className="flex justify-start">
            <Image
            style={{width: '100%', height: 'auto', border: '2px white solid'}}
            className="stat-box-border"
              src="/homepage/gameplay.jpg"
              alt=""
              width={1000}
              height={1000}
            />
          </div>
          <div>
            <div className="flex items-center gap-2 pb-2">
              <div className="w-8 h-0.5 bg-[#F5603C]"></div>
              <p className="text-[#F5603C]">Broadcasted Events</p>
            </div>
            <h3 className="text-4xl font-semibold leading-snug">
            A Broadcasted VALORANT Recreation League
            </h3>
            <p className="py-8">
            An online gaming community focused on making every game a good game. Go beyond matchmaking and play against teams within your division and celebrate valorant together through the live stream! Earn prizes and form a team and meet new players!
            </p>
            <button className="btn btn-disabled !text-white/40 font-semibold py-4 px-8 rounded-full bg-[#F5603C] hover:bg-[#AC442A]">
              Coming Soon
            </button>
          </div>
        </div>

        <div className="py-20 items-center lg:hidden">
          <div>
            <div className="flex items-center gap-2 pb-2">
              <div className="w-8 h-0.5 bg-[#F5603C]"></div>
              <p className="text-[#F5603C]">Broadcasted Events</p>
            </div>
            <h3 className="text-4xl mb-4 font-semibold leading-snug">
            A Broadcasted VALORANT Recreation League
            </h3>
            <div className="flex justify-start">
              <Image
              style={{width: '100%', height: 'auto', border: '2px white solid'}}
            className="stat-box-border"
                src="/homepage/gameplay.jpg"
                alt=""
                width={1000}
                height={1000}
              />
            </div>
            <p className="py-8">
            An online gaming community focused on making every game a good game. Go beyond matchmaking and play against teams within your division and celebrate valorant together through the live stream! Earn prizes and form a team and meet new players!
            </p>
            <button className="btn btn-disabled !text-white/40 font-semibold py-4 px-8 rounded-full bg-[#F5603C] hover:bg-[#AC442A] w-full">
              Coming Q3 of 2024
            </button>
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-2 gap-20 py-20">
          <div>
            <div className="flex items-center gap-2 pb-2">
              <div className="w-8 h-0.5 bg-[#5ECCBA]"></div>
              <p className="text-[#5ECCBA]">Learn to play</p>
            </div>
            <h3 className="text-4xl font-semibold leading-snug">
            Video Guides and Blogs to Educate and Support new players!

            </h3>
            <p className="py-8">
            Supporting players of all skill levels by providing tutorials and instructional content for players to study strategy and tactics. As well as guides about core concepts of VALORANT esports focused on preparing players. All meant to help players discover new and old ways of competing!
            </p>
            <button className="btn btn-disabled !text-white/40 font-semibold py-4 px-8 rounded-full bg-[#5ECCBA] hover:bg-[#AC442A]">
              Coming Soon
            </button>
          </div>
          <div className="flex justify-start">
            <Image
              src="/homepage/landing-building-tools-1.png"
              alt=""
              width={1000}
              height={1000}
            />
          </div>
        </div>

        <div className="py-20 items-center lg:hidden">
          <div>
            <div className="flex items-center gap-2 pb-2">
              <div className="w-8 h-0.5 bg-[#5ECCBA]"></div>
              <p className="text-[#5ECCBA]">Learn to play</p>
            </div>
            <h3 className="text-4xl mb-4 font-semibold leading-snug">
            Video Guides and Blogs to Educate and Support new players!

            </h3>
            <div className="flex justify-start">
              <Image
                src="/homepage/landing-building-tools-1.png"
                alt=""
                width={1000}
                height={1000}
              />
            </div>
            <p className="py-8">
            Supporting players of all skill levels by providing tutorials and instructional content for players to study strategy and tactics. As well as guides about core concepts of VALORANT esports focused on preparing players. All meant to help players discover new and old ways of competing!
            </p>
            <button className="btn btn-disabled !text-white/40 font-semibold py-4 px-8 rounded-full bg-[#5ECCBA] hover:bg-[#AC442A] w-full">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurRoadmap;
