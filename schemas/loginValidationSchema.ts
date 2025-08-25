import * as z from "zod/mini";

export const loginValidationSchema = z.object({
  email: z.email({ message: "Email is required" }),
  password: z
    .string()
    .check(z.minLength(1, { message: "Password is required" })),
});
