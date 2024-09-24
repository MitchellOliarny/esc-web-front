"use server";
import { cookies } from "next/headers";
import { api } from "@/app/utils/helpers";

// This function performs the logout action
export default async function doSubmitMedalEvent(data: FormData) {
  // Initialize success flag and token
  const cookieStore = cookies();
  let token = cookieStore.get("esc-auth");


  const headers = {
    // Include the token from the cookie in the Authorization header
    token: `Bearer ${token?.value}`,
    // Specify that the request body will be in JSON format
    // "Content-Type": "application/json",
  };

  const response = await fetch(api + "/events/create/medal-event", {
    method: "POST",
    headers,
    body: data
  });

  //console.log(response)
  const event_details = await response.json();

  console.log(event_details)

  // If the request was successful
  if (response.ok) {
    // Set the success flag to true
    return {success: true, details: event_details};
  }

  //@ts-ignore
  return {success: false, errors: event_details.errors};
}
