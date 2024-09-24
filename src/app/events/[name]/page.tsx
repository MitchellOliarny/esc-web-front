"use server"
import { api } from "../../utils/helpers";
import { cookies } from "next/headers";
import EventDetails from "./eventdetails";
// import { Orbitron } from "next/font/google";

// const orbitron = Orbitron({
//   subsets: ["latin"],
//   display: "swap",
//   adjustFontFallback: false,
// });
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Event Details',
    description: 'Find an Event that is right for you! From Online to Local.',
  }
}

export default async function Events() {

  return (
    <>
      <EventDetails />
    </>
  );
}
