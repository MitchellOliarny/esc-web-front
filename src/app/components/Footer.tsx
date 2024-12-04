"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaDiscord, FaEnvelope, FaTiktok } from "react-icons/fa";
import { usePathname } from "next/navigation";

// import { Orbitron } from "next/font/google";

// const orbitron = Orbitron({
//   subsets: ["latin"],
//   display: "swap",
//   adjustFontFallback: false,
// });

const Footer = () => {
  const pathname = usePathname();
  const excludePaths =
    !pathname.includes("login") &&
    !pathname.includes("signup")
    !pathname.includes("settings") &&
    !pathname.includes("forgot-password") &&
    !pathname.includes("reset-password");

  return excludePaths ? (
    <div>
      <div className="px-4 lg:px-10 back-graphite border-t border-slate-300 ">
        <div className="px-6 2xl:px-28 hidden lg:block relative mx-auto">
          <div className="grid xl:grid-cols-12 grid-cols-12 py-10 gap-2 w-full max-w-[1800px] mx-auto h-fit">
            <div className="2xl:col-start-2 col-span-6">
              <h2 className={`mb-4 text-3xl font-black`}>
                {/* Our Partners */}
              </h2>
              <div className="grid grid-cols-3 items-center gap-10">

                {/* <Link href="https://www.omnic.ai/" target="_blank">
                  <Image src="/omnic.png" alt="" width={1000} height={1000} className="w-24 h-auto"/>
                </Link> */}
              </div>
              <span className="text-lg text-center w-full">
                © 2024 Esports Clubs
              </span>
              <br></br>
              <span className="text-sm text-ash">
                * {"Esports Clubs is not endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc."}
              </span>
            </div>
            <div className="col-start-10 col-span-3 flex">
              <div className="flex flex-row gap-6 my-auto">
                <Link
                  href="mailto:hello@esportsclubs.gg"
                  className="xl:text-lg my-auto"
                >
                  <FaEnvelope className="text-5xl text-[#F5603C] my-auto" />
                </Link>
                <Link
                  href="https://www.tiktok.com/@Esportsclubs"
                  target="_blank"
                  className="my-auto"
                >
                  <FaTiktok className="text-4xl text-[#F5603C] my-auto" />
                </Link>
                <Link href="https://discord.gg/6ufMVF8n6u" target="_blank" className="my-auto">
                  <FaDiscord className="text-5xl text-[#F5603C] my-auto" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="2xl:px-28 border-t border-slate-300 lg:hidden">
          <div className="py-20 gap-2 w-full max-w-[1800px] my-0 mx-auto h-fit">
            <div className="col-span-6 mb-14">
              <h2
                className={`mb-4 text-2xl font-black text-center `}
              >
                {/* Our Partners */}
              </h2>
              <span className="text-lg text-center w-full">
                © 2024 Esports Clubs
              </span>
              <br></br>
              <span className="text-sm text-ash">
                * {"Esports Clubs is not endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc."}
              </span>
            </div>
            <div className="col-start-10 col-span-3 flex mx-auto w-full">
              <div className="flex flex-row gap-6 mx-auto">
                <Link
                  href="mailto:hello@esportsclubs.gg"
                  className="xl:text-lg my-auto"
                >
                  <FaEnvelope className="text-5xl text-[#F5603C] my-auto" />
                </Link>
                <Link
                  href="https://www.tiktok.com/@Esportsclubs"
                  target="_blank"
                  className="my-auto"
                >
                  <FaTiktok className="text-4xl text-[#F5603C] my-auto" />
                </Link>
                <Link href="https://discord.gg/6ufMVF8n6u" target="_blank" className="my-auto">
                  <FaDiscord className="text-5xl text-[#F5603C] my-auto" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  ) : null;
};

export default Footer;
