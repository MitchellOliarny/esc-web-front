"use server";
import { cookies } from "next/headers";
import { api } from "@/app/utils/helpers";
import { redirect } from "next/navigation";

// This function performs the logout action
export default async function doLogOutAction() {
  // Initialize success flag and token
  const cookieStore = cookies();
  let token = cookieStore.get("esc-auth");

  const headers = {
    // Include the token from the cookie in the Authorization header
    token: `Bearer ${token?.value}`,
    // Specify that the request body will be in JSON format
    "Content-Type": "application/json",
  };

  const response = await fetch(api + "/user/logout", {
    method: "GET",
    headers,
  });

  // If the request was successful
  if (response.ok) {
    // Set the success flag to true
    cookies().delete("esc-auth");
    cookies().delete("esc-user");
    return { success: true };
  }

  return { success: false };
}
