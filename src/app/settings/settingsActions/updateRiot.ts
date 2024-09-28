"use server";
import { cookies } from "next/headers";
import { api } from "@/app/utils/helpers";
import { updateUserSchema } from "@/app/utils/validations";
import { revalidatePath } from "next/cache";

export default async function updateRiot(formData: FormData) {
  const cookieStore = cookies();
  let token = cookieStore.get("esc-auth");

  // validate the form data
  const validatedFields = updateUserSchema.safeParse(formData);
  if (!validatedFields.success) {
    console.log(
      "Error validating fields",
      validatedFields.error.flatten().fieldErrors
    );
  }

  const headers = {
    token: `Bearer ${token?.value}`,
  };

  const response = await fetch(api + "/user/update/riot", {
    method: "PUT",
    headers,
    body: formData,
  });

  const result = await response.json();

  console.log(result)

  if (response.status === 200) {
    revalidatePath("/settings");
    // console.log(response);
    return { success: true };
  } else {
    console.error(result.errors);
    console.warn("Token:", result.token);
    // console.log(response);
    // console.log(result);
    return { success: false, errors: result?.errors, message: result?.message };
  }
}
