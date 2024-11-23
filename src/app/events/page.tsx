"use server"
import { api } from "../utils/helpers";
import { cookies } from "next/headers";
import EventsPage from "./events";
// import { Orbitron } from "next/font/google";

// const orbitron = Orbitron({
//   subsets: ["latin"],
//   display: "swap",
//   adjustFontFallback: false,
// });
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Events',
    description: 'Find an Event that is right for you! From Online to Local.',
  }
}

export default async function events() {

  const cookieStore = cookies();
  const token = cookieStore.get("esc-auth");
  let events = [];

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

  return (
    <>
      <EventsPage events={events} isLoading={response.ok ? true : false} />
    </>
  );
}
