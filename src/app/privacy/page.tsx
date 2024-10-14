
import React, { } from "react";
//import { metadata } from "../layout";
import type { Metadata } from "next";
import PrivacyPolicy from "../components/Legal/PrivacyPolicy";


export default async function Privacy({

}: {

}) {

  return (
    <>
      <div className="w-[80%] mx-auto my-10">
        <PrivacyPolicy />
      </div>
    </>
  );
}
