import * as z from "zod/mini";

export const loginValidationSchema = z.object({
  email: z.email({ message: "A valid email is required" }),
  password: z
    .string()
    .check(z.minLength(1, { message: "Password is required" })),
});
