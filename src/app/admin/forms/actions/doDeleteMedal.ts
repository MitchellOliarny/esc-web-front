"use server";
import { cookies } from "next/headers";
import { api } from "@/app/utils/helpers";

// This function performs the logout action
export default async function doDeleteMedal(medal_name: string) {
    // Initialize success flag and token
    const cookieStore = cookies();
    let token = cookieStore.get("esc-auth");


    const headers = {
        // Include the token from the cookie in the Authorization header
        token: `Bearer ${token?.value}`,
        // Specify that the request body will be in JSON format
        // "Content-Type": "application/json",
    };
    let response;

        response = await fetch(api + "/val/medals/delete?name="+medal_name, {
            method: "PUT",
            headers,
        });

    //console.log(response)
    const medal = await response.json();

    // If the request was successful
    if (response.ok) {
        // Set the success flag to true
        return { success: true, details: medal, message: medal.message };
    }

    //@ts-ignore
    return { success: false, errors: medal.errors, message: medal.message };
}
