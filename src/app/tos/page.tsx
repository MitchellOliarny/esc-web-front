"use server";
import React, { } from "react";
//import { metadata } from "../layout";
import type { Metadata } from "next";
import Terms from "../components/Legal/Terms";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "ESC || TOS",
    description:
      "Esports Clubs' Terms of Service",
  };
}

export default async function TOS({

}: {

}) {

  return (
    <>
      <Terms />
    </>
  );
}
