import React, { } from "react";
//import { metadata } from "../layout";
import type { Metadata } from "next";
import Terms from "../components/Legal/Terms";

export default async function TOS({

}: {

}) {

  return (
    <>
      <div className="w-[80%] mx-auto my-10">
        <Terms />
      </div>
    </>
  );
}
