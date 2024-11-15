"use server";
import { api } from "../../utils/helpers";
import { cookies } from "next/headers";

export default async function doChangeDisplayMedal(medal_name: string, position: number) {
  let success = false;
  const cookieStore = cookies();
  const token = cookieStore.get("esc-auth");

  const headers = {
    token: `Bearer ${token?.value}`,
  };


    const response = await fetch(api + "/val/data/medals/display/" + medal_name + '/' + position, {
      method: "PUT",
      headers,
      cache: "no-store",
    });


    const respJSON = await response.json();


    if (response.ok) {
      success = true;
      return {success: success, message: respJSON?.message};
    } else {
      success = false;
      return {success: success, message: respJSON?.err};
    }
}
