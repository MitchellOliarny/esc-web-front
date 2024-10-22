"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RecNavbar from "./RecNavbar";
import NavbarUser from "./User";
import FormMenu from "../login/page";
import LogInBtn from "./Buttons/LogInBtn";
import SignUpBtn from "./Buttons/SignUpBtn";
import { FaCalendar, FaDiscord, FaHome, FaQuestion, FaToolbox, FaUser, FaUsers } from "react-icons/fa";
import { FaCircleInfo, FaCircleUser, FaGear } from "react-icons/fa6";

interface MainNavbarProps {
  user: string;
  riot: string;
  pfp: string;
  children: React.ReactNode;
  rank: string | number;
}

const MainNavbar: React.FC<MainNavbarProps> = ({ user, riot, pfp, children, rank }) => {
  const pathname = usePathname();
  const [toggleDrawer, setToggleDrawer] = useState(false);


  const handleLoginClick = () => {
    localStorage.setItem("previousPath", pathname);
    window.location.href = "/login?form=Log-In";
  };

  const handleSignUpClick = () => {
    localStorage.setItem("previousPath", pathname);
    window.location.href = "/login?form=Sign-Up";
  };

  return (
    <>
      {pathname.includes("recleague") ? (
        <RecNavbar user={user} rank={rank}>
          {children}
        </RecNavbar>
      ) : pathname.includes("login") ? (
        <FormMenu />
        //@ts-ignore
      ) : pathname.includes("forgot-password" && "reset-password") ? (
        <>{children}</>
      ) : (
        <nav className="flex my-8 ml-[17.5%] overflow-x-hidden">
          <div className="back-graphite w-[15vw] h-auto left-5 mr-16 rounded-lg fixed z-10">
            <div className="w-full h-full max-w-[1800px] mx-auto hidden lg:block bg-none">
              <div className="grid nav-grid items-center h-auto rounded-lg">
                <div className="relative w-full h-full background-nav rounded-t-lg">
                  <div className="nav-gradient h-full w-full">
                    <Link href="/">
                      <Image
                        src="/esports-clubs-logo-2.png"
                        alt="Esports Clubs Logo"
                        width={1000}
                        height={1000}
                        className="absolute self-center top-[-15%] scale-[.75]"
                      />
                    </Link>
                  </div>
                </div>
                {user ?
                  <div className="px-4">
                    <ul className="inline-grid w-full font-medium text-ash gap-1">
                      <Link href="/dashboard" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/dashboard' ? 'nav-active' : ''}`}>
                        <FaCircleUser />
                        <li className="">Dashboard</li>
                      </Link>
                      <Link href="/clubs" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/clubs' ? 'nav-active' : ''}`}>
                        <FaUsers />
                        <li className="">Clubs</li>
                      </Link>
                      {/* <Link href="/recleague" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${url == 'recleague' ? 'nav-active' : ''}`}>
                      <li className="">Rec League</li>
                    </Link> */}
                      <Link href="/events" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/events' ? 'nav-active' : ''}`}>
                        <FaCalendar />
                        <li className="">Events</li>
                      </Link>
                      <Link href="/tools" className={`coming-soon nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/tools' ? 'nav-active' : ''}`}>
                        <FaToolbox />
                        <li className="">Tools</li>
                      </Link>
                      <Link href="/about" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/about' ? 'nav-active' : ''}`}>
                        <FaCircleInfo />
                        <li className="">About ESC</li>
                      </Link>
                      <Link href="/faq" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/faq' ? 'nav-active' : ''}`}>
                        <FaQuestion />
                        <li className="">FAQ</li>
                      </Link>
                      <Link href="https://discord.gg/6ufMVF8n6u" target="_blank" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold`}>
                        <FaDiscord />
                        <li className="">Discord</li>
                      </Link>
                      <Link href="/settings" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/settings' ? 'nav-active' : ''}`}
                      // ?view=My Teams"
                      >
                        <FaGear />
                        <li className="">Account</li>
                      </Link>
                    </ul>
                  </div>
                  :
                  <div className="px-4">
                    <ul className="inline-grid w-full font-medium text-ash gap-1">
                    <Link href="/" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/' ? 'nav-active' : ''}`}>
                        <FaHome />
                        <li className="">Home</li>
                      </Link>
                      <Link href="/clubs" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/clubs' ? 'nav-active' : ''}`}>
                        <FaUsers />
                        <li className="">Clubs</li>
                      </Link>
                      {/* <Link href="/recleague" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${url == 'recleague' ? 'nav-active' : ''}`}>
                      <li className="">Rec League</li>
                    </Link> */}
                      <Link href="/events" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/events' ? 'nav-active' : ''}`}>
                        <FaCalendar />
                        <li className="">Events</li>
                      </Link>
                      <Link href="/tools" className={`coming-soon nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/tools' ? 'nav-active' : ''}`}>
                        <FaToolbox />
                        <li className="">Tools</li>
                      </Link>
                      <Link href="/about" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/about' ? 'nav-active' : ''}`}>
                        <FaCircleInfo />
                        <li className="">About ESC</li>
                      </Link>
                      <Link href="/faq" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/faq' ? 'nav-active' : ''}`}>
                        <FaQuestion />
                        <li className="">FAQ</li>
                      </Link>
                      <Link href="https://discord.gg/6ufMVF8n6u" target="_blank" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold`}>
                        <FaDiscord />
                        <li className="">Discord</li>
                      </Link>
                    </ul>
                  </div>
                }
                <div className="flex justify-end w-full gap-2 self-end px-4 nav-border-top">
                  <NavbarUser
                    user={user}
                    riot={riot}
                    pfp={pfp}
                    rank={rank}
                    toggleDrawer={toggleDrawer}
                    setToggleDrawer={setToggleDrawer}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden bg-[#0C131D]">
              <div className="flex items-center w-full mx-auto my-0 py-4 px-6">
                <Link href="/">
                  <Image
                    height={1000}
                    width={1000}
                    src="/esports-clubs-logo-2.png"
                    alt="Esports Clubs Logo"
                    className="w-36 h-auto"
                  />
                </Link>
                <div className="drawer drawer-end justify-end">
                  <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                    checked={toggleDrawer}
                    readOnly
                  />
                  <div
                    className="drawer-content"
                    onClick={() => setToggleDrawer((prev) => !prev)}
                  >
                    <label
                      htmlFor="my-drawer-4"
                      className="drawer-button cursor-pointer"
                    >
                      <div className="w-10 h-1 bg-slate-300 mb-2"></div>
                      <div className="w-10 h-1 bg-slate-300 mb-2"></div>
                      <div className="w-10 h-1 bg-slate-300"></div>
                    </label>
                  </div>
                  <div className="drawer-side z-10">
                    <label
                      htmlFor="my-drawer-4"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                      onClick={() => setToggleDrawer((prev) => !prev)}
                    ></label>
                    <ul className="menu p-4 w-72 sm:w-96 min-h-full bg-base-200 text-base-content">
                      <div
                        id="user2"
                        className="flex align middle items-center mb-5"
                      >
                        {user && (
                          <NavbarUser
                            user={user}
                            rank={rank}
                            riot={riot}
                            pfp={pfp}
                            toggleDrawer={toggleDrawer}
                            setToggleDrawer={setToggleDrawer}
                          />
                        )}
                      </div>
                      {/* <li
                        className="!font-sans !text-white !font-medium"
                        onClick={() => setToggleDrawer((prev) => !prev)}
                      >
                        <Link href="/recleague">Rec League</Link>
                      </li> */}
                      <li
                        className="!font-sans !text-white !font-medium"
                        onClick={() => setToggleDrawer((prev) => !prev)}
                      >
                        <Link href="/events">Events</Link>
                      </li>
                      <li
                        className="!font-sans !text-white !font-medium"
                        onClick={() => setToggleDrawer((prev) => !prev)}
                      >
                        <Link href="/dashboard">Stats</Link>
                      </li>
                      {user && (
                        <li
                          className="!font-sans !text-white !font-medium"
                          onClick={() => setToggleDrawer((prev) => !prev)}
                        >
                          <Link id="myTeam2" href="/settings"
                          // ?view=My Teams"
                          >
                            Settings
                          </Link>
                        </li>
                      )}

                      {!user && (
                        <div
                          id="navBtnCont2"
                          className="flex flex-col items-center justify-center !gap-4 mt-10"
                        >
                          <LogInBtn onClick={handleLoginClick} />

                          <SignUpBtn onClick={handleSignUpClick} />
                        </div>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>{children}</div>
        </nav>
      )}
    </>
  );
};

export default MainNavbar;
