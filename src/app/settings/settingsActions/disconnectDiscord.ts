"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// This function performs the discord disconnect action
export default async function disconnectDiscord() {
    // Initialize success flag and token
    let success = false;
    const cookieStore = cookies();
    let token = cookieStore.get("esc-auth");

    const headers = {
        // Include the token from the cookie in the Authorization header
        token: `Bearer ${token?.value}`,
        // Specify that the request body will be in JSON format
        "Content-Type": "application/json",
    };
    // Make a POST request to the sign-in endpoint with the form data
    const response = await fetch("https://api.esportsclubs.gg/settings/disconnect/discord", {
        method: "GET",
        headers,
    });

    if (response.ok) {
        revalidatePath("/settings");
        success = true;
    }
    return { success: success };
}
