"use server";
import React, { } from "react";
//import { metadata } from "../layout";
import type { Metadata } from "next";
import Header from "./MatchOverviewUI";
import { userSession } from "@/app/utils/authHelpers";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Match Overview",
    description:
      "Take an in-depth look at your match.",
  };
}

export default async function Dashboard({
  params,
}: {
  params: { id: string };
  
}) {

  const user = await userSession();

  return (
    <>
      <Header user={user}/>
    </>
  );
}
