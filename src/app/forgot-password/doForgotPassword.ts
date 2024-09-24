"use server";
import { api } from "../utils/helpers";

export default async function doForgotPassword(formData: FormData) {
    let success = false;

    const response = await fetch(api+"/user/update/password", {
        method: "POST",
        body: formData,
    });

    // console.log(response);

    if (response.ok) {
        success = true;
    }
    // Return the success flag
    return { success: success };
}
