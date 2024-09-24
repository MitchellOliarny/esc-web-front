import React from "react";
// import MainNavbar from "../MainNavbar";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";

const Header = () => {


  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: "url(/homepage-hero.png)",
        backgroundSize: "cover",
      }}
    >
      {/* <MainNavbar /> */}
      <div className="py-56 px-4 2xl:px-40 w-full max-w-[1800px] mx-auto text-center">
        <h1 className="text-white text-center text-4xl xl:text-4xl font-bold leading-snug">
          Where gaming is more than just a game. <br />
          Connect and compete on your path to pro!
        </h1>
        <p className="text-white text-center mt-6 sm:mt-4 text-xl font-medium">
        Esports Clubs is focused on creating valorant content and valorant competitions.
        <br></br>
        Signup for FREE to learn more about how you can collect medals!
        </p>
        <div className="flex justify-center gap-5 mt-12 sm:mt-10">
          <Link href="/dashboard">
            <button className="btn text-white font-semibold px-8 rounded-full bg-[#F5603C] hover:bg-[#AC442A] text-xl border-0 font-bold" style={{letterSpacing: '1px'}}>
              View Your Stats
            </button>
          </Link>
            {/* <Link href="#our-roadmap">
              <button className="btn text-white font-semibold py-4 px-8 rounded-full bg-transparent hover:bg-white/10 border-3 hover:border-white border-white">
                Learn More
              </button>
            </Link> */}
        </div>
        <div className="flex justify-center gap-5 mt-[20%] sm:mt-[20%]">
        <Link href="#our-roadmap" className="self-end">
                <BiChevronDown className="animate-bounce" size={'5em'}/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
