"use server"
import { api } from "@/app/utils/helpers";
import { cookies } from "next/headers";
import { userInfo, userSession } from "@/app/utils/authHelpers";
import Forms from "./forms";

import type { Metadata } from 'next'
import { useState } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Admin Form',
    description: '',
  }
}

export default async function AdminForm() {

  const user = await userSession();
  //@ts-ignore
  if(user.isAdmin != 1) {
    return (
      <>
        No Access
      </>
    )
  }


  const cookieStore = cookies();
  const token = cookieStore.get("esc-auth");
  let events = null;
  let medals = null;

  const headers = {
    token: `Bearer ${token?.value}`,
  };

  const response = await fetch(
    api + `/events/list`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    }
  );
  events = await response.json();

  const response2 = await fetch(
    api + `/val/data/medals`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    }
  );
  medals = await response2.json();

  let medal_details = null;
  const response3 = await fetch(
    api + `/val/data/medals/details`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    }
  );
  medal_details = await response3.json();

  let maps_details = null;
  const maps = await fetch(
    api + `/val/data/maps`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    }
  );
  maps_details = await maps.json();

  let agent_details = null;
  const agents = await fetch(
    api + `/val/data/agents`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    }
  );
  agent_details = await agents.json();

  let weapon_details = null;
  const weapon = await fetch(
    api + `/val/data/weapons`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    }
  );
  weapon_details = await weapon.json();

  return (
    <>
      <Forms medals={medals} medal_details={medal_details} maps={maps_details} agents={agent_details} weapons={weapon_details}/>
    </>
  );
}
