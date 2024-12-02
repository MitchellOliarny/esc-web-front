"use server";
import { cookies } from "next/headers";
import { api } from "@/app/utils/helpers";

// This function performs the logout action
export default async function doSubmitMedalEvent(data: FormData, isEdit: boolean) {
    // Initialize success flag and token
    const cookieStore = cookies();
    let token = cookieStore.get("esc-auth");

    console.log(data);

    const headers = {
        // Include the token from the cookie in the Authorization header
        token: `Bearer ${token?.value}`,
        // Specify that the request body will be in JSON format
        // "Content-Type": "application/json",
    };
    let response;
    if (isEdit) {
        response = await fetch(api + "/val/medals/edit", {
            method: "PUT",
            headers,
            body: data
        });
    }
    else {
        response = await fetch(api + "/val/medals/create", {
            method: "POST",
            headers,
            body: data
        });
    }

    //console.log(response)
    const medal = await response.json();

    console.log(medal)

    // If the request was successful
    if (response.ok) {
        // Set the success flag to true
        return { success: true, details: medal, message: medal.message };
    }

    //@ts-ignore
    return { success: false, errors: medal.errors, message: medal.message };
}
