"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function updateProfilePicture(formData: FormData) {
  const cookieStore = cookies();
  let token = cookieStore.get("esc-auth");

  const headers = {
    token: `Bearer ${token?.value}`,
    // "Content-Type": "multipart/form-data",
  };

  if (formData.get("profile_picture") === null) {
    return { success: false, errors: ["No file provided"] };
  }

  const response = await fetch("https://api.esportsclubs.gg/user/update/pfp", {
    method: "PUT",
    headers,
    body: formData,
  });

  const result = await response.json();
  // console.log(result);

  if (response.ok) {
    revalidatePath("/settings");
    return { success: true };
  } else {
    console.error(result.errors);
    revalidatePath("/settings");
    return { success: false, errors: result.errors };
  }
}
