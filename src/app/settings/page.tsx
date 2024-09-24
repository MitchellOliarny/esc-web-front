"use server";
import React from "react";
import SettingsUI from "./SettingsUI";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "../utils/helpers";
import connectDiscord from "./settingsActions/connectDiscord";
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Settings',
    description: 'Find a comprehensive look at your in-game VALORANT stats created using a combination of data-streams not offered anywhere else.',
  }
}

export default async function Page() {
  let userInfo = null;

  const getToken = async () => {
    const cookieStore = cookies();
    return cookieStore.get("esc-auth");
  };

  const token = await getToken();

  if (!token) {
    return redirect("/login");
  }

  // console.log(token);

  const headers = {
    token: `Bearer ${token?.value}`,
    "Content-Type": "application/json",
  };

  const userInfoResp = await fetch(api + "/user/info", {
    method: "GET",
    headers,
    cache: "no-store",
  });
  userInfo = await userInfoResp.json();
  if(userInfo.message) {
    return redirect("/login");
  }

  return (
    <>
      <SettingsUI
        userInfo={userInfo.info}
        userInvites={userInfo.invites}
        userTeams={userInfo.teams}
      />
    </>
  );
}
