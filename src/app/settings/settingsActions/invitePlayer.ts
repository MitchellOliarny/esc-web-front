"use server";
import { cookies } from "next/headers";
import { api } from "../../utils/helpers";

export default async function invitePlayer(
    teamId: string,
    riotUsername: string,
    riotTag: string) {
    let success = false;
    const cookieStore = cookies();
    let token = cookieStore.get("esc-auth");

    const headers = {
        token: `Bearer ${token?.value}`,
    };

    const response = await fetch(api + `/recleague/invite/team/${teamId}/player/${riotUsername}/${riotTag}`, {
        method: "PUT",
        headers,
    });

    const result = await response.json();
    // console.log(result)

    if (response.ok) {
        return { success: true };
    } else {
        console.error(result.errors);
        console.warn("Token:", result.token);
        // console.log(result);
        return { success: false, errors: result.message };
    }
}