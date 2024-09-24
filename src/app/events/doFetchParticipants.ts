"use server";
import { cookies } from "next/headers";
import { api } from "@/app/utils/helpers";
import { getAuthInfo } from "../utils/authHelpers";

// This function performs the logout action
export default async function doFetchParticipants(event: string) {
  // Initialize success flag and token
  const headers = {
    // Specify that the request body will be in JSON format
    "Content-Type": "application/json",
  };

  const response = await fetch(api + "/events/" + event + "/participants", {
    method: "GET",
    headers,
  });

  const event_details = await response.json();

  // If the request was successful
  if (response.ok) {
    // Set the success flag to true
    return {success: true, participants: event_details.participants};
  }

  return {success: false};
}
