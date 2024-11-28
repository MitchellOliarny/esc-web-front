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

  //console.log(pathname.split('/'))


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
        <RecNavbar user={user} rank={rank} riot={riot} pfp={pfp}>
          {children}
        </RecNavbar>
      ) : pathname.includes("login") ? (
        <FormMenu />
        //@ts-ignore
      ) : pathname.includes("forgot-password" && "reset-password") ? (
        <>{children}</>
      ) : (
        <nav className="flex my-8 lg:ml-[17.5%] overflow-x-hidden">
          <div className="w-full lg:w-[15vw] h-auto left-5 mr-16 rounded-lg fixed" style={{zIndex: 100}}>

            {/* full nav */}
            <div className="back-graphite w-full h-full max-w-[1800px] mx-auto hidden 2xl:block bg-none">

              <div className="grid nav-grid items-center h-auto rounded-lg">
                <div className="relative w-full h-full background-nav rounded-t-lg">
                  <div className="nav-gradient h-full w-full rounded-t-lg">
                    <Link href="/" className="grid">
                      <Image
                        src="/esports-clubs-logo-2.png"
                        alt="Esports Clubs Logo"
                        width={1000}
                        height={1000}
                        className="absolute self-center justify-self-center top-[-15%] h-[70%] w-auto"
                      />
                    </Link>
                  </div>
                </div>
                <div className="px-4">
                  <ul className="inline-grid w-full font-medium text-ash gap-1 pb-2">
                    {user ?
                      <Link href="/dashboard" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/dashboard' ? 'nav-active' : ''}`}>
                        <FaCircleUser />
                        <li className="">Dashboard</li>
                      </Link>
                      :
                      <Link href="/" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/' ? 'nav-active' : ''}`}>
                        <FaHome />
                        <li className="">Home</li>
                      </Link>
                    }
                    <Link href="/clubs" className={`coming-soon nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/clubs' ? 'nav-active' : ''}`}>
                      <FaUsers />
                      <li className="">Clubs</li>
                    </Link>
                    {/* <Link href="/recleague" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${url == 'recleague' ? 'nav-active' : ''}`}>
                      <li className="">Rec League</li>
                    </Link> */}
                    <Link href="/events" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname.split('/')[1] == 'events' ? 'nav-active' : ''}`}>
                      <FaCalendar />
                      <li className="">Events</li>
                    </Link>
                    <Link href="/tools" className={`coming-soon nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/tools' ? 'nav-active' : ''}`}>
                      <FaToolbox />
                      <li className="">Tools</li>
                    </Link>
                    <Link href="/about" className={`coming-soon nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/about' ? 'nav-active' : ''}`}>
                      <FaCircleInfo />
                      <li className="">About ESC</li>
                    </Link>
                    <Link href="/faq" className={`coming-soon nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/faq' ? 'nav-active' : ''}`}>
                      <FaQuestion />
                      <li className="">FAQ</li>
                    </Link>
                    <Link href="https://discord.gg/6ufMVF8n6u" target="_blank" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold`}>
                      <FaDiscord />
                      <li className="">Discord</li>
                    </Link>
                    {user ?
                      <Link href="/settings" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/settings' ? 'nav-active' : ''}`}
                      // ?view=My Teams"
                      >
                        <FaGear />
                        <li className="">Account</li>
                      </Link>
                      : ""}
                  </ul>
                </div>
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

            {/* Condensed Nav */}

            <div className="back-graphite w-full h-full max-w-[1800px] mx-auto hidden lg:block 2xl:hidden bg-none">

              <div className="grid nav-grid items-baseline h-auto rounded-lg">
                <div className="relative w-full h-full background-nav rounded-t-lg">
                  <div className="nav-gradient h-full w-full rounded-t-lg">
                    <Link href="/" className="grid">
                      <Image
                        src="/esports-clubs-logo-2.png"
                        alt="Esports Clubs Logo"
                        width={1000}
                        height={1000}
                        className="absolute self-center justify-self-center top-[-15%] h-[fit-content] w-auto"
                      />
                    </Link>
                  </div>
                </div>
                <div className="px-4">
                  <ul className="inline-grid w-full font-medium text-ash gap-1 pb-2">
                    {user ?
                      <Link href="/dashboard" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/dashboard' ? 'nav-active' : ''}`}>
                        <FaCircleUser />
                      </Link>
                      :
                      <Link href="/" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/' ? 'nav-active' : ''}`}>
                        <FaHome />
                      </Link>
                    }
                    <Link href="/clubs" className={`coming-soon nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/clubs' ? 'nav-active' : ''}`}>
                      <FaUsers />
                    </Link>
                    {/* <Link href="/recleague" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${url == 'recleague' ? 'nav-active' : ''}`}>
                      <li className="">Rec League</li>
                    </Link> */}
                    <Link href="/events" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname.split('/')[1] == 'events' ? 'nav-active' : ''}`}>
                      <FaCalendar />
                    </Link>
                    <Link href="/tools" className={`coming-soon nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/tools' ? 'nav-active' : ''}`}>
                      <FaToolbox />
                    </Link>
                    <Link href="/about" className={`coming-soon nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/about' ? 'nav-active' : ''}`}>
                      <FaCircleInfo />
                    </Link>
                    <Link href="/faq" className={`coming-soon nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/faq' ? 'nav-active' : ''}`}>
                      <FaQuestion />
                    </Link>
                    <Link href="https://discord.gg/6ufMVF8n6u" target="_blank" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold`}>
                      <FaDiscord />
                    </Link>
                    {user ?
                      <Link href="/settings" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/settings' ? 'nav-active' : ''}`}
                      // ?view=My Teams"
                      >
                        <FaGear />
                      </Link>
                      : ""}
                  </ul>
                </div>
                <div className="back-graphite rounded-b-lg flex justify-end h-auto w-full gap-2 px-4 nav-border-top">
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
            <div className="back-graphite mr-8 z-100 lg:hidden bg-none rounded-lg">
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
                <div className="drawer drawer-end justify-end text-frost">
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
                  <div className="drawer-side z-10 -mr-6">
                    <label
                      htmlFor="my-drawer-4"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                      onClick={() => setToggleDrawer((prev) => !prev)}
                    ></label>
                    <ul className="menu p-4 w-72 sm:w-96 gap-2 min-h-full back-graphite bg-base-200 text-base-content text-ash">
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
                      {user ?
                        <Link href="/dashboard" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/dashboard' ? 'nav-active' : ''}`}>
                          <FaCircleUser />
                          <li className="">Dashboard</li>
                        </Link>
                        :
                        <Link href="/" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/' ? 'nav-active' : ''}`}>
                          <FaHome />
                          <li className="">Home</li>
                        </Link>
                      }
                      <Link href="/clubs" className={`coming-soon nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/clubs' ? 'nav-active' : ''}`}>
                        <FaUsers />
                        <li className="">Clubs</li>
                      </Link>
                      {/* <Link href="/recleague" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${url == 'recleague' ? 'nav-active' : ''}`}>
                      <li className="">Rec League</li>
                    </Link> */}
                      <Link href="/events" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname.split('/')[1] == 'events' ? 'nav-active' : ''}`}>
                        <FaCalendar />
                        <li className="">Events</li>
                      </Link>
                      <Link href="/tools" className={`coming-soon nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/tools' ? 'nav-active' : ''}`}>
                        <FaToolbox />
                        <li className="">Tools</li>
                      </Link>
                      <Link href="/about" className={`coming-soon nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/about' ? 'nav-active' : ''}`}>
                        <FaCircleInfo />
                        <li className="">About ESC</li>
                      </Link>
                      <Link href="/faq" className={`coming-soon nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/faq' ? 'nav-active' : ''}`}>
                        <FaQuestion />
                        <li className="">FAQ</li>
                      </Link>
                      <Link href="https://discord.gg/6ufMVF8n6u" target="_blank" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold`}>
                        <FaDiscord />
                        <li className="">Discord</li>
                      </Link>
                      {user ?
                        <Link href="/settings" className={`nav-hover w-full h-12 flex items-center gap-2 p-2 rounded-lg font-bold ${pathname == '/settings' ? 'nav-active' : ''}`}
                        // ?view=My Teams"
                        >
                          <FaGear />
                          <li className="">Account</li>
                        </Link>
                        : ""}

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
          <div className="w-full">{children}</div>
        </nav>
      )}
    </>
  );
};

export default MainNavbar;
