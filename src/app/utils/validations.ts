import { z, object, string, boolean, array } from "zod";

export const updateUserSchema = object({
  preferred_role: string({
    required_error: "A preferred_role is required",
  }).optional(),
  display_agent: string({
    required_error: "A display_agent is required",
  }).optional(),
  email: string().email({ message: "Must be a valid email address" }),
  password: string()
    .min(6, { message: "Password must be at least 8 characters long" })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one number",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    }),
});