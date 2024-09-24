"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function removeMember(
    teamId: string,
    playerId: string,
    playerName: string) {
    let success = false;
    const cookieStore = cookies();
    let token = cookieStore.get("esc-auth");

    const headers = {
        token: `Bearer ${token?.value}`,
    };

    const response = await fetch(`https://api.esportsclubs.gg/recleague/remove/player/${playerId}/team/${teamId}`, {
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
        return { success: false, errors: result.errors };
    }
}