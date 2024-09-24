import React from "react";
import Image from "next/image";
import Link from "next/link";
// import { Orbitron } from "next/font/google";
import { Metadata } from "next";

// const orbitron = Orbitron({
//   subsets: ["latin"],
//   display: "swap",
//   adjustFontFallback: false,
// });

export const metadata: Metadata = {
  title: "Rec League",
};

const JoinTheFun = () => {
  return (
    <>
      <div className="h-screen relative">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full"
          >
            <source
              src="/video/video-background-recleague.webm"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
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
      <section
        id="where-we-play"
        className="hidden lg:block px-6 2xl:!px-40 py-20 w-full max-w-[1800px] mx-auto"
      >
        <div className="flex items-center w-full mb-10">
          <h1
            className={`text-[#5ECCBA] text-3xl font-bold xl:text-4xl uppercase font-orbitron border-l-[12px] border-t border-r border-b border-[#5ECCBA] w-fit py-5 px-8 whitespace-nowrap`}
          >
            Where We Play
          </h1>
          <div className="flex items-center w-full ml-5">
            <div className="w-2 h-2 rounded-full bg-[#5ECCBA] mr-1"></div>
            <div className="w-full h-0.5 bg-[#5ECCBA]"></div>
          </div>
        </div>

        <div className="grid grid-cols-12 mb-6 items-center">
          <div className="col-span-5">
            <Image
              height={1000}
              width={1000}
              src="/recleague/rec-where-we-play-2.png"
              alt=""
            />
          </div>
          <div className="pl-6 col-start-6 col-span-7">
            <h2 className="text-3xl text-white text-center font-bold mb-5">
              We Partnered with the
              <br />
              Hyperx Arena for all of our local events!
            </h2>

            <p className="text-white text-center mb-5">
              This is the ultimate gaming experience! Make your way to the main
              stage to play where the pros play or watch your friends compete in
              a weekly tournament while you explore great bar and dining
              options. Three VIP Rooms are available for private gatherings.
            </p>
            <div className="flex flex-col items-center justify-center">
              <Link href="https://hyperxarenalasvegas.com/" target="_blank">
                <button
                  id="check-them-out"
                  className="btn btn-ghost text-white font-bold bg-[#E21936] hover:bg-[#c03147] rounded-full capitalize px-16 my-4"
                >
                  Check them out!
                </button>
              </Link>

              <div className="flex gap-4 mt-4">
                <Link
                  href="https://www.tiktok.com/@hyperxarena"
                  target="_blank"
                >
                  <Image
                    height={1000}
                    width={1000}
                    src="/logos/tiktok.png"
                    alt=""
                    className="w-12 h-auto"
                  />
                </Link>
                <Link
                  href="https://www.facebook.com/HyperXArena/"
                  target="_blank"
                >
                  <Image
                    height={1000}
                    width={1000}
                    src="/logos/facebook.png"
                    alt=""
                    className="w-12 h-auto"
                  />
                </Link>
                <Link
                  href="https://www.instagram.com/hyperxarena"
                  target="_blank"
                >
                  <Image
                    height={1000}
                    width={1000}
                    src="/logos/instagram.png"
                    alt=""
                    className="w-12 h-auto"
                  />
                </Link>
                <Link
                  href="https://www.twitch.tv/alliedesports"
                  target="_blank"
                >
                  <Image
                    height={1000}
                    width={1000}
                    src="/logos/twitch.png"
                    alt=""
                    className="w-12 h-auto"
                  />
                </Link>
                <Link href="https://www.twitch.tv/hyperxarena" target="_blank">
                  <Image
                    height={1000}
                    width={1000}
                    src="/logos/twitch.png"
                    alt=""
                    className="w-12 h-auto"
                  />
                </Link>
                <Link href="https://twitter.com/hyperxarena" target="_blank">
                  <Image
                    height={1000}
                    width={1000}
                    src="/logos/twitter-x.png"
                    alt=""
                    className="w-12 h-auto"
                  />
                </Link>
                <Link
                  href="https://www.youtube.com/@hyperxarenaLV"
                  target="_blank"
                >
                  <Image
                    height={1000}
                    width={1000}
                    src="/logos/youtube.png"
                    alt=""
                    className="w-12 h-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 items-center">
          <div className="col-span-5 flex flex-col justify-center">
            <h3 className="text-white font-bold text-center text-3xl mb-4 font-orbitron">
              FEATURES
            </h3>
            <div className="flex justify-center">
              <ul className="list-disc">
                <li className="text-white font-medium text-xl">
                  30,000 square-foot 2-level arena
                </li>
                <li className="text-white font-medium text-xl">
                  3 VIP Rooms + Boss Level Suite
                </li>
                <li className="text-white font-medium text-xl">
                  1,400 square-foot stage
                </li>
                <li className="text-white font-medium text-xl">
                  70-seat Telescopic Stadium Seating
                </li>
                <li className="text-white font-medium text-xl">
                  50-foot LED Wall
                </li>
                <li className="text-white font-medium text-xl">
                  Full-service Catering
                </li>
              </ul>
            </div>
          </div>
          <Image
            height={1000}
            width={1000}
            src="/recleague/rec-where-we-play-1.png"
            alt=""
            className="pl-4 col-start-6 col-span-7 w-full max-w-[868px]"
          />
        </div>
      </section>
      <section
        id="where-we-play"
        className="lg:hidden px-6 2xl:!px-40 pt-20 pb-20 w-full"
      >
        <div className="flex items-center w-full mb-8">
          <h1
            className={`text-[#5ECCBA] font-bold text-3xl xl:text-4xl uppercase font-orbitron border-l-[12px] border-t border-r border-b border-[#5ECCBA] w-fit py-5 px-8 whitespace-nowrap`}
          >
            Where We Play
          </h1>
          <div className="hidden sm:flex items-center w-full ml-5">
            <div className="w-2 h-2 rounded-full bg-[#5ECCBA] mr-1"></div>
            <div className="w-full h-0.5 bg-[#5ECCBA]"></div>
          </div>
        </div>

        <div className="mb-6">
          <div className="w-full">
            <h2 className="text-2xl text-white font-bold mb-4">
              We Partnered with the
              <br />
              Hyperx Arena for all of our local events!
            </h2>

            <p className="text-white mb-4">
              This is the ultimate gaming experience! Make your way to the main
              stage to play where the pros play or watch your friends compete in
              a weekly tournament while you explore great bar and dining
              options. Three VIP Rooms are available for private gatherings.
            </p>
            <Image
              height={1000}
              width={1000}
              src="/recleague/rec-where-we-play-2.png"
              alt=""
            />
            <div className="flex my-4 items-center">
              <h3 className="text-white font-bold text-2xl mt-4 md:mt-0 mr-4 font-orbitron">
                FEATURES
              </h3>
            </div>
            <div className="flex">
              <ul className="ml-6 mr-10 mb-4 list-disc">
                <li className="text-white font-medium text-lg">
                  30,000 square-foot
                </li>
                <li className="text-white font-medium text-lg">
                  3 VIP Rooms + Boss Level Suite
                </li>
                <li className="text-white font-medium text-lg">
                  1,400 square-foot stage
                </li>
                <li className="text-white font-medium text-lg">
                  70-seat Telescopic Stadium Seating
                </li>
                <li className="text-white font-medium text-lg">
                  50-foot LED Wall
                </li>
                <li className="text-white font-medium text-lg">
                  Full-service Catering
                </li>
              </ul>
            </div>
            <div className="flex gap-4 mt-4">
              <Link href="https://www.tiktok.com/@hyperxarena" target="_blank">
                <Image
                  height={1000}
                  width={1000}
                  src="/logos/tiktok.png"
                  alt=""
                  className="w-12 h-auto"
                />
              </Link>
              <Link
                href="https://www.facebook.com/HyperXArena/"
                target="_blank"
              >
                <Image
                  height={1000}
                  width={1000}
                  src="/logos/facebook.png"
                  alt=""
                  className="w-12 h-auto"
                />
              </Link>
              <Link
                href="https://www.instagram.com/hyperxarena"
                target="_blank"
              >
                <Image
                  height={1000}
                  width={1000}
                  src="/logos/instagram.png"
                  alt=""
                  className="w-12 h-auto"
                />
              </Link>
              <Link href="https://www.twitch.tv/alliedesports" target="_blank">
                <Image
                  height={1000}
                  width={1000}
                  src="/logos/twitch.png"
                  alt=""
                  className="w-12 h-auto"
                />
              </Link>
              <Link href="https://www.twitch.tv/hyperxarena" target="_blank">
                <Image
                  height={1000}
                  width={1000}
                  src="/logos/twitch.png"
                  alt=""
                  className="w-12 h-auto"
                />
              </Link>
              <Link href="https://twitter.com/hyperxarena" target="_blank">
                <Image
                  height={1000}
                  width={1000}
                  src="/logos/twitter-x.png"
                  alt=""
                  className="w-12 h-auto"
                />
              </Link>
              <Link
                href="https://www.youtube.com/@hyperxarenaLV"
                target="_blank"
              >
                <Image
                  height={1000}
                  width={1000}
                  src="/logos/youtube.png"
                  alt=""
                  className="w-12 h-auto"
                />
              </Link>
            </div>
            <Link href="https://hyperxarenalasvegas.com/" target="_blank">
              <button className="btn btn-ghost text-white bg-[#E21936] hover:bg-[#c03147] rounded-full capitalize mt-6 px-6 w-full">
                Check them out!
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full">
          <Image
            height={1000}
            width={1000}
            src="/recleague/rec-where-we-play-1.png"
            alt=""
          />
        </div>
      </section>
    </>
  );
};

export default JoinTheFun;
