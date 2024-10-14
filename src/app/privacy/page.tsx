"use server";
import React, { } from "react";
//import { metadata } from "../layout";
import type { Metadata } from "next";
import PrivacyPolicy from "../components/Legal/PrivacyPolicy";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "ESC || Privacy Policy",
    description:
      "Esports Clubs' Privacy Policy",
  };
}

export default async function Privacy({

}: {

}) {

  return (
    <>
      <PrivacyPolicy />
    </>
  );
}
