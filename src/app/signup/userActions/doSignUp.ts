"use server";
import { api } from "@/app/utils/helpers";
// This function performs the sign-up action
export default async function doSignUpAction(formData: FormData) {
  const response = await fetch(api+"/user/signup", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (response.ok) {
    return { success: true, message: 'Account Created! Games within 30 days will be loaded. Check your dashboard!' };
  } else {
    console.error(result.errors);
    console.warn("Token:", result.token);
    // console.log(result); 
    return { success: false, errors: result.errors };
  }
}
