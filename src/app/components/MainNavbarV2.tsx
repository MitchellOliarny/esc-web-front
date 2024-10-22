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

interface MainNavbarProps {
  user: string;
  children: React.ReactNode;
  rank: string | number;
}

const MainNavbar: React.FC<MainNavbarProps> = ({ user, children, rank }) => {
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
        <nav className="flex my-8">
          <div className="back-graphite w-72 h-full ml-8 mr-16 rounded-lg">
            <div className="px-4 w-full max-w-[1800px] mx-auto hidden lg:block bg-none">
              <div className="grid grid-rows-3 items-center">
                <div className="w-40 h-auto">
                  <Link href="/">
                    <Image
                      src="/esports-clubs-logo-2.png"
                      alt="Esports Clubs Logo"
                      width={1000}
                      height={1000}
                    />
                  </Link>
                </div>
                <div>
                  <ul className="flex justify-center gap-10 font-medium">
                    {/* <Link href="/recleague">
                      <li className="hover-underline-animation">Rec League</li>
                    </Link> */}
                    <Link href="/events">
                      <li className="hover-underline-animation">Events</li>
                    </Link>
                    <Link href="/dashboard">
                      <li className="hover-underline-animation">Stats</li>
                    </Link>
                    {user && (
                      <Link href="/settings"
                        // ?view=My Teams"
                      >
                        <li className="hover-underline-animation">Settings</li>
                      </Link>
                    )}
                  </ul>
                </div>
                <div className="flex justify-end gap-2">
                  <NavbarUser
                    user={user}
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
