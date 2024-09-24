"use server";
import { cookies } from "next/headers";
import { api } from "@/app/utils/helpers";
import { redirect } from "next/navigation";
import { getAuthInfo } from "../utils/authHelpers";

// This function performs the logout action
export default async function doJoinEvent(event_id: string) {
  // Initialize success flag and token
  const cookieStore = cookies();
  let token = cookieStore.get("esc-auth");

  const auth = await getAuthInfo();
  const userData = auth?.data;

  if (userData.length < 1) {
    return redirect("/login");
  }

  const headers = {
    // Include the token from the cookie in the Authorization header
    token: `Bearer ${token?.value}`,
    // Specify that the request body will be in JSON format
    "Content-Type": "application/json",
  };

  const response = await fetch(api + "/events/join/" + event_id, {
    method: "PUT",
    headers,
  });

  const event_details = await response.json();
  console.log(event_details)

  // If the request was successful
  if (response.ok) {
    if(event_details.link){
      return {success: true, link: event_details.link, msg: event_details.message};
    }
    // Set the success flag to true
    return {success: true, details: event_details, msg: event_details.message};
  }

  return {success: false, msg: event_details.message};
}
