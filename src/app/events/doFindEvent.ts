"use server";
import { cookies } from "next/headers";
import { api } from "@/app/utils/helpers";
import { getAuthInfo } from "../utils/authHelpers";

// This function performs the logout action
export default async function doFindEvent(event: string) {
  // Initialize success flag and token
  const cookieStore = cookies();
  let token = cookieStore.get("esc-auth");

  const auth = await getAuthInfo();
  const userData = auth?.data;


  const headers = {
    // Include the token from the cookie in the Authorization header
    token: `Bearer ${token?.value}`,
    // Specify that the request body will be in JSON format
    "Content-Type": "application/json",
  };

  const response = await fetch(api + "/events/list/" + event, {
    method: "GET",
    headers,
  });

  const event_details = await response.json();

  console.log(event_details)

  // If the request was successful
  if (response.ok) {
    // Set the success flag to true
    return {success: true, details: event_details, user: userData || null};
  }

  return {success: false};
}
