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
}

export default function Sidebar({
  userInfo,
  userInvites,
  userTeams,
}: ProfileSettingsUIProps) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const [selectedMenu, setSelectedMenu] = useState<string>("Profile");

  const renderContent = () => {
    switch (selectedMenu) {
      case "Profile":
        return <ProfileSettingsUI userInfo={userInfo} />;
      case "Connections":
        return <ConnectionsSettings userInfo={userInfo} />;
      case "Subscriptions":
        return <Subscriptions sub_status={userInfo.esc_member ? true : false} />;
      // case "My Teams":
      //   return <MyTeamsUI userTeams={userTeams} userInfo={userInfo} />;
      // case "Team Invites":
      //   return <TeamInvitesUI userInvites={userInvites}></TeamInvitesUI>;
      default:
        return <ProfileSettingsUI userInfo={userInfo} />;
    }
  };

  const handleLogout = async () => {
    const response = await doLogOutAction();

    if (response.success) {
      window.location.href = "/";
    } else {
      console.log("failure");
    }
  };

  useEffect(() => {
    if (!searchParams) return;
    if (view) {
      setSelectedMenu(view as string);
    }
  }, [view, searchParams]);

  const handleSideBarClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  return (
    <Suspense>
      <div className="ml-4 px-4 py-4 w-full max-w-[1800px]">
      <h1 className="font-bold text-frost text-4xl">Settings</h1>
      <div className="grid md:grid-cols-6 grid-rows-1 mx-auto list-none py-8">
        <div
          id="settingsLeftNav"
          className="inline-flex flex-col gap-10"
        >
          <li
            onClick={() => handleSideBarClick("Profile")}
            className={`menu-item md:text-2xl font-bold text-left mr-10 cursor-pointer text-ash py-2 px-4 rounded-lg settings-nav-button ${
              selectedMenu === "Profile" ? "text-frost back-graphite" : ""
            }`}
          >
            Profile
          </li>
          <li
            onClick={() => handleSideBarClick("Connections")}
            className={`menu-item md:text-2xl font-bold text-left mr-10 cursor-pointer text-ash py-2 px-4 rounded-lg settings-nav-button ${
              selectedMenu === "Connections" ? "text-frost back-graphite" : ""
            }`}
          >
            Connections
          </li>
          <li
            onClick={() => handleSideBarClick("Subscriptions")}
            className={`menu-item text-2xl font-bold text-left mr-10 cursor-pointer text-ash py-2 px-4 rounded-lg settings-nav-button ${
              selectedMenu === "Subscriptions" ? "text-frost back-graphite" : ""
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
            className="md:text-2xl font-bold text-left mr-10 cursor-pointer text-[#d32d2d] py-2 px-4 rounded-lg"
          >
            Logout
          </li>
        </div>
        <div className="col-span-5 mr-4">
          <div>
          <ProfileSettingsUI userInfo={userInfo} />
          <ConnectionsSettings userInfo={userInfo} />;
          <Subscriptions sub_status={userInfo.esc_member ? true : false} />;
          </div>
        </div>
      </div>
      </div>
    </Suspense>
  );
}
