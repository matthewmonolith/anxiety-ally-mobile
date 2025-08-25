import { z } from "zod";

export const signUpValidationSchema = z.object({
  username: z
    .string()
    .check(
      z.minLength(3, { message: "Username must be at least 3 characters long" })
    )
    .check(
      z.maxLength(10, {
        message: "Username must be at most 10 characters long",
      })
    )
    .check(
      z.regex(/^[a-zA-Z0-9]+$/, {
        message: "Username can only contain letters and numbers",
      })
    ),
  email: z.email({ message: "Email is required" }),
  password: z
    .string()
    .check(
      z.minLength(8, { message: "Password must be at least 8 characters long" })
    ),
});
