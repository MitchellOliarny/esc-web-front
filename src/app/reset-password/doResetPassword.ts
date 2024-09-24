"use server";
import { api } from "../utils/helpers";

export default async function doResetPassword(formData: FormData, token: string, userId: string) {
    let success = false;

    const response = await fetch((api + `/user/update/password/${token}/${userId}`), {
        method: "PUT",
        body: formData,
    });

    const result = await response.json();

    if (response.ok) {
        success = true;
    } else {
         return { success: false, errors: result.errors};
    }
    // Return the success flag
    return { success: success };
}
