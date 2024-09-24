"use server"
import { api } from "@/app/utils/helpers";
import { cookies } from "next/headers";
import { userInfo, userSession } from "@/app/utils/authHelpers";
import MedalEventForm from "./medalEventForm";

import type { Metadata } from 'next'

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

  return (
    <>
      <MedalEventForm valMedals={medals.data} />
    </>
  );
}
