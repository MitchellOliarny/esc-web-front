"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NavbarUser from "./User";
import LogInBtn from "./Buttons/LogInBtn";
import SignUpBtn from "./Buttons/SignUpBtn";

interface RecNavbarProps {
  user: string;
  children: React.ReactNode;
  rank: string | number;
}

const RecNavbar: React.FC<RecNavbarProps> = ({ user, children, rank }) => {
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
      <nav className="">
        <div className="p-4 2xl:px-40 w-full max-w-[1800px] mx-auto hidden lg:block">
          <div className="grid grid-cols-3 items-center">
            <div className="h-auto w-40">
              <Link href="/">
                <Image
                  src="/esports-clubs-logo-2.png"
                  alt="logo"
                  width={500}
                  height={500}
                />
              </Link>
            </div>
            <div>
              <ul className="flex justify-center gap-10 font-medium">
                <Link
                  href="/recleague"
                  className={
                    pathname === "/recleague"
                      ? "active-topnavbar-menu"
                      : "hover-underline-animation"
                  }
                >
                  Home
                </Link>
                <Link
                  href="/recleague/schedule"
                  className={
                    pathname === "/recleague/schedule"
                      ? "active-topnavbar-menu"
                      : "hover-underline-animation"
                  }
                >
                  Schedule
                </Link>
                <Link
                  href="/recleague/standings"
                  className={
                    pathname === "/recleague/standings"
                      ? "active-topnavbar-menu"
                      : "hover-underline-animation"
                  }
                >
                  Standings
                </Link>
                {user && (
                  <li className="!font-sans !text-white !font-medium hover-underline-animation">
                    <Link id="myTeam2" href="/settings?view=My Teams">
                      My Teams
                    </Link>
                  </li>
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
                  {user && (
                    <div
                      id="user2"
                      className="flex align middle items-center mb-5"
                    >
                      <NavbarUser
                        user={user}
                        rank={rank}
                        toggleDrawer={toggleDrawer}
                        setToggleDrawer={setToggleDrawer}
                      />
                    </div>
                  )}
                  <li
                    className="!font-sans !text-white !font-medium"
                    onClick={() => setToggleDrawer((prev) => !prev)}
                  >
                    <Link href="/recleague">Home</Link>
                  </li>
                  <li
                    className="!font-sans !text-white !font-medium"
                    onClick={() => setToggleDrawer((prev) => !prev)}
                  >
                    <Link href="/recleague/schedule">Schedule</Link>
                  </li>
                  <li
                    className="!font-sans !text-white !font-medium"
                    onClick={() => setToggleDrawer((prev) => !prev)}
                  >
                    <Link href="/recleague/standings">Standings</Link>
                  </li>
                  {user && (
                    <li
                      className="!font-sans !text-white !font-medium"
                      onClick={() => setToggleDrawer((prev) => !prev)}
                    >
                      <Link href="/settings?form=My Teams">My Teams</Link>
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
      </nav>
      <div>{children}</div>
    </>
  );
};

export default RecNavbar;
