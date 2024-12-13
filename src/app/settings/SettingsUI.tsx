"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
// import { Orbitron } from "next/font/google";
import ConnectionsSettings from "../components/Settings/ConnectionsUI";
import ProfileSettingsUI from "../components/Settings/ProfileSettingsUI";
import doLogOutAction from "../login/userActions/doLogOut";
import TeamInvitesUI from "../components/Settings/TeamInvitesUI";
import { Metadata } from "next";
import MyTeamsUI from "../components/Settings/MyTeamsUI";
import Subscriptions from "../components/Settings/Subscriptions";

export const metadata: Metadata = {
  title: "Settings",
};

// const orbitron = Orbitron({
//   subsets: ["latin"],
//   display: "swap",
//   adjustFontFallback: false,
// });

interface ProfileSettingsUIProps {
  userInfo: UserInfo;
  userInvites: UserInvites[];
  userTeams: Teams[];
  subscriptions: any;
  countries: any;
}

export default function Sidebar({
  userInfo,
  userInvites,
  userTeams,
  subscriptions,
  countries,
}: ProfileSettingsUIProps) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const [selectedMenu, setSelectedMenu] = useState<string>("Profile");


  const handleLogout = async () => {
    const response = await doLogOutAction();

    if (response.success) {
      window.location.href = "/";
    } else {
      console.log("failure");
    }
  };


  const handleSideBarClick = (menu: string) => {
    setSelectedMenu(menu);
    document.getElementById(menu)?.scrollIntoView(
      {
        behavior: 'smooth', // Optional: Adds smooth scrolling animation
        block: 'start',    // Optional: Scrolls to the top of the element
        inline: 'nearest', // Optional: Scrolls horizontally to the nearest edge
        // scrollMarginTop: 100 // Optional: Adds an offset from the top
      }
    );
  };


  const isInViewport = (elem: any) => {
    var bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= -500 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight + 0 || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  document.addEventListener('scroll', () => {
    if (isInViewport(document.getElementById('Profile'))) {
      setSelectedMenu('Profile')
    }

    if (isInViewport(document.getElementById('Connections'))) {
      setSelectedMenu('Connections')
    }

    if (isInViewport(document.getElementById('Subscriptions'))) {
      setSelectedMenu('Subscriptions')
    }
  })

  useEffect(() => {
    if (view) {
      console.log(view)
      setSelectedMenu(view as string);
      setTimeout(() => {
        document.getElementById(view as string)?.scrollIntoView(
          {
            behavior: 'smooth', // Optional: Adds smooth scrolling animation
            block: 'start',    // Optional: Scrolls to the top of the element
            inline: 'nearest', // Optional: Scrolls horizontally to the nearest edge
            // scrollMarginTop: 100 // Optional: Adds an offset from the top
          }
        );
      }, 500)
    }

  }, [view, searchParams]);

  return (
    <Suspense>
      <div className="md:ml-4 px-4 py-4 w-full max-w-[1800px]">
        <div className="flex xl:flex-row flex-col mx-auto list-none py-8">
          <h1 className="xl:fixed font-bold text-frost text-4xl xl:translate-y-[-1.25em]">Settings</h1>
          <div className="w-64"></div>
          <div
            id="settingsLeftNav"
            className="inline-flex xl:flex-col flex-row md:gap-10 md:text-[1em] text-[.7em] mt-6 xl:fixed xl:max-h-min max-h-16"
          >
            <li
              onClick={() => handleSideBarClick("Profile")}
              className={`menu-item lg:text-2xl font-bold text-left md:mr-10 mr-4 cursor-pointer text-ash py-2 px-4 rounded-lg settings-nav-button ${selectedMenu === "Profile" ? "text-frost back-graphite" : ""
                }`}
            >
              Profile
            </li>
            <li
              onClick={() => handleSideBarClick("Connections")}
              className={`menu-item lg:text-2xl font-bold text-left md:mr-10 mr-4  cursor-pointer text-ash py-2 px-4 rounded-lg settings-nav-button ${selectedMenu === "Connections" ? "text-frost back-graphite" : ""
                }`}
            >
              Connections
            </li>
            <li
              onClick={() => handleSideBarClick("Subscriptions")}
              className={`menu-item lg:text-2xl font-bold text-left md:mr-10 mr-4  cursor-pointer text-ash py-2 px-4 rounded-lg settings-nav-button ${selectedMenu === "Subscriptions" ? "text-frost back-graphite" : ""
                }`}
            >
              Subscriptions
            </li>
            {/* <li
            onClick={() => handleSideBarClick("My Teams")}
            className={`menu-item text-2xl font-bold text-right mr-10 cursor-pointer text-slate-200 ${
              selectedMenu === "My Teams" ? "!text-[#f5603c]" : ""
            }`}
          >
            My Teams
          </li>
          <li
            onClick={() => handleSideBarClick("Team Invites")}
            className="text-2xl font-bold text-right mr-10 cursor-pointer"
          >
            <div className="indicator">
              <div
                id="teamInviteCount"
                className={
                  userInvites?.length > 0
                    ? "bg-[#F5603C] text-white font-bold indicator-item badge badge-secondary h-5 w-5 flex justify-center items-center p-0"
                    : "hidden"
                }
              >
                {userInvites?.length}
              </div>
              <p
                className={`${
                  selectedMenu === "Team Invites" ? "!text-[#f5603c]" : ""
                } menu-item text-slate-200`}
              >
                Team Invites
              </p>
            </div>
          </li> */}
            <li
              onClick={handleLogout}
              id="logout"
              className="lg:text-2xl font-bold text-left md:mr-10 mr-4  cursor-pointer text-[#d32d2d] py-2 px-4 rounded-lg"
            >
              Logout
            </li>
          </div>
          <div className="col-span-5 mt-6 md:mr-8 ml-auto w-auto">
            <div id='Profile'>
              <ProfileSettingsUI userInfo={userInfo} countries={countries} />
            </div>
            <div id='Connections' className="mt-5 h-auto">
              <ConnectionsSettings userInfo={userInfo} />
            </div>
            <div id='Subscriptions' className="mt-5 h-auto">
              <Subscriptions sub_status={userInfo.esc_member ? true : false} sub_1_cost={subscriptions[0]} />
            </div>
            <div id='Logout' className="mt-5 h-auto">
              <div className="h-full w-full back-graphite p-8 rounded-lg">
                <div className="flex md:flex-row flex-col h-auto gap-8 min-h-16 w-full">
                  <div className="md:w-[50%] w-full h-full">
                    <h2 className="font-bold text-frost text-lg">Log Out</h2>
                    <p className="text-ash">Log out of your Esports Clubs account.</p>
                  </div>
                  <div className="h-full md:w-[50%] w-full my-auto flex">

                    <button
                      onClick={() => handleLogout()}
                      type="button"
                      className={`ml-auto self-end justify-self-end submit btn border-0 bg-[#f5603c] hover:bg-[#ac442a] text-white md:w-64 w-full right-8 top-12`}
                    >
                      {"Log Out"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
