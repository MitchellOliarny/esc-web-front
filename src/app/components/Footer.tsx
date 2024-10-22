"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaDiscord, FaTiktok } from "react-icons/fa";
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
    !pathname.includes("settings") &&
    !pathname.includes("forgot-password") &&
    !pathname.includes("reset-password");

  return excludePaths ? (
    <div>
      <div className="px-4 lg:px-10">
        <div className="px-6 2xl:px-28 border-t border-slate-300 hidden lg:block relative mx-auto">
          <div className="grid xl:grid-cols-12 grid-cols-12 py-20 gap-2 w-full max-w-[1800px] mx-auto h-fit">
            <div className="2xl:col-start-2 col-span-6">
              <h2 className={`mb-4 text-3xl font-black  `}>
                Our Partners
              </h2>
              <div className="grid grid-cols-3 items-center gap-10">

                <Link href="https://www.omnic.ai/" target="_blank">
                  <Image src="/omnic.png" alt="" width={1000} height={1000} className="w-24 h-auto"/>
                </Link>
              </div>
            </div>
            <div className="col-start-10 col-span-3">
              <h2 className={`mb-4 text-3xl font-black `}>
                Contact Us
              </h2>
              <div className="flex flex-col gap-2">
                <Link
                  href="mailto:hello@esportsclubs.gg"
                  className="xl:text-lg"
                >
                  hello@esportsclubs.gg
                </Link>
                <Link href="tel:(206) 200-4487" className="mb-2 xl:text-lg">
                  &#40;206&#41; 200-4487
                </Link>
              </div>

              <div className="flex gap-6 items-center">
                <Link
                  href="https://www.tiktok.com/@Esportsclubs"
                  target="_blank"
                >
                  <FaTiktok className="text-4xl text-[#F5603C]" />
                </Link>
                <Link href="https://discord.gg/6ufMVF8n6u" target="_blank">
                  <FaDiscord className="text-5xl text-[#F5603C]" />
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
                Our Partners
              </h2>
              <div className="grid grid-cols-3 items-center gap-4">
                {/* <Link href="https://www.alliedesports.gg/">
                  <Image
                    src="/allied-esports.png"
                    alt=""
                    width={1000}
                    height={1000}
                  />
                </Link>

                <Link href="https://hyperxarenalasvegas.com/">
                  <Image src="/hyperx.png" alt="" width={1000} height={1000} />
                </Link> */}

                <Link href="https://www.omnic.ai/">
                  <Image src="/omnic.png" alt="" width={1000} height={1000} />
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h2 className={`mb-4 text-2xl font-black `}>
                Contact Us
              </h2>
              <div className="flex flex-col items-center gap-2">
                <Link
                  href="mailto:hello@esportsclubs.gg"
                  className="xl:text-lg"
                >
                  hello@esportsclubs.gg
                </Link>
                <Link href="tel:(206) 200-4487" className="mb-2 xl:text-lg">
                  &#40;206&#41; 200-4487
                </Link>
              </div>

              <div className="flex gap-6 items-center">
                <Link href="https://www.tiktok.com/@Esportsclubs">
                  <FaTiktok className="text-4xl text-[#F5603C]" />
                </Link>
                <Link href="https://discord.gg/6ufMVF8n6u">
                  <FaDiscord className="text-5xl text-[#F5603C]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#AC442A] py-1 text-center text-white">
        <span className="text-sm">
          © 2024 Esports Clubs LLC | All Rights Reserved
        </span>
      </div>
    </div>
  ) : null;
};

export default Footer;
