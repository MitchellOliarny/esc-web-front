"use server";
import { cookies } from "next/headers";
import { api } from "../../utils/helpers";
import { revalidatePath } from "next/cache";

export default async function acceptInvite(
    inviteId: string) {
    let success = false;
    const cookieStore = cookies();
    let token = cookieStore.get("esc-auth");

    const headers = {
        token: `Bearer ${token?.value}`,
    };

    const response = await fetch(api + `/recleague/invite/accept/team/${inviteId}`, {
        method: "PUT",
        headers,
    });

    const result = await response.json();
    // console.log(result)

    if (response.ok) {
        revalidatePath("/settings");
        return { success: true };
    } else {
        console.error(result.errors);
        console.warn("Token:", result.token);
        // console.log(result);
        return { success: false, errors: result.message };
    }
}