"use server";
import { cookies } from "next/headers";
import { api } from "@/app/utils/helpers";
import { getAuthInfo } from "@/app/utils/authHelpers";

interface SignInData {
  email: string;
  password: string;
}


// This function performs the sign-in action
export default async function doSignInAction(signInData: SignInData) {
  // Initialize success flag and token
  let token = "";

  // Make a POST request to the sign-in endpoint with the form data
  const response = await fetch(api + "/user/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signInData),
  });

  // Parse the response as JSON
  const result = await response.json();

  // If the request was successful
  if (response.ok) {
    // Extract the token from the response
    token = result.token as string;
    // Store the token in a cookie
    cookies().set("esc-auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // change in production
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    const auth = await getAuthInfo();
    const data = auth?.data;

    cookies().set("esc-user", JSON.stringify(data), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // change in production
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return { success: true };
  } else {
    console.error(result.errors);
    return { success: false, errors: result.errors };
  }
}
