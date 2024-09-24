"use server";
import { cookies } from "next/headers";
import { api } from "./helpers";

// This function retrieves authentication information
export async function getAuthInfo() {
  // Create a cookie store and retrieve the "esc-auth" cookie
  const cookieStore = cookies();
  const token = cookieStore.get("esc-auth");

  // Define the headers for the fetch request
  const headers = {
    // Include the token from the cookie in the Authorization header
    token: `Bearer ${token?.value}`,
    // Specify that the request body will be in JSON format
    "Content-Type": "application/json",
  };

  // Make a GET request to the /auth endpoint
  const response = await fetch(api + "/auth", {
    method: "GET",
    headers,
    cache: "no-store",
  });

  // Parse the response as JSON
  const json = await response.json();

  // If the message in the response is "No user session", log "Unauthenticated"
  if (json.message == "No user session") {
    console.log("Unauthenticated");
  }

  // Destructure the status and data properties from the response
  const { status, data } = json;

  // Return the data from the response
  // console.log(data);
  return { data };
}

export async function authToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("esc-auth");
  if (!token?.value) {
    throw new Error("Authentication token not found");
  }
  return token.value;
}

export async function userInfo() {
  const cookieStore = cookies();
  const token = cookieStore.get("esc-auth");

  // Define the headers for the fetch request
  const headers = {
    // Include the token from the cookie in the Authorization header
    token: `Bearer ${token?.value}`,
    // Specify that the request body will be in JSON format
    "Content-Type": "application/json",
  };

  const userInfoResp = await fetch(api + "/user/info", {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const data = await userInfoResp.json();

  // console.log(data);

  if (!data) {
    console.log("Unauthenticated");
  }

  return { data };
}

export async function userSession(): Promise<SessionInfo | null> {
  const cookieStore = cookies();
  const userInfo = cookieStore.get("esc-user");

  if (userInfo?.value) {
    const parsedUserInfo: SessionInfo = JSON.parse(userInfo.value);
    return parsedUserInfo;
  } else {
    // console.log("No user info found in cookie");
  }
  return null;
}
