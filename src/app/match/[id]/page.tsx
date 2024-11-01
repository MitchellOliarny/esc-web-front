"use server";
import React, { } from "react";
//import { metadata } from "../layout";
import type { Metadata } from "next";
import Header from "./MatchOverviewUI";

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

  return (
    <>
      <Header />
    </>
  );
}
