"use server";
import { cookies } from "next/headers";
import { api } from "@/app/utils/helpers";
import { updateUserSchema } from "@/app/utils/validations";
import { revalidatePath } from "next/cache";

export default async function subscribe(subscription: String) {
  const cookieStore = cookies();
  let token = cookieStore.get("esc-auth");

  const headers = {
    token: `Bearer ${token?.value}`,
  };

  const response = await fetch(api + "/checkout/subscription/"+subscription, {
    method: "POST",
    headers,
  });

  const result = await response.json();

  console.log(result)

  if (response.status === 200) {
    return { success: true, link: result.link, msg: result.message };
  } else {
    console.error(result.errors);
    // console.log(response);
    // console.log(result);
    return { success: false, errors: result?.errors, message: result?.message };
  }
}
