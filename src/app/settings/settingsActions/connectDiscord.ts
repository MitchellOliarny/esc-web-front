"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { api } from "../../utils/helpers";

// This function performs the discord connect action
export default async function connectDiscord(discord_code: string) {
    // Initialize success flag and token
    let success = false;
    const cookieStore = cookies();
    let token = cookieStore.get("esc-auth");

    const headers = {
        // Include the token from the cookie in the Authorization header
        token: `Bearer ${token?.value}`,
        // Specify that the request body will be in JSON format
        // "Content-Type": "application/json",
    };
    // Make a POST request to the sign-in endpoint with the form data
    const response = await fetch(api + `/user/connect/discord?code=${discord_code}`, {
        method: "PUT",
        headers,
    });

    const result = await response.json();

    // console.log(response.json());
    // console.log(discord_code)

    if (response.ok) {
        revalidatePath("/settings");
        success = true;
        return { success, message: result.message };
    } else {
        console.error(result.errors);
        return { success: false, errors: result.message };
    }
}
