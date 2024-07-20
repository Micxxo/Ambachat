import { z } from "zod";

const AuthSchema = z
  .object({
    name: z.string().min(2, {
      message: "Password must be at least 2 characters.",
    }),
    email: z.string().email({ message: "Email invalid." }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });
type AuthFormValues = z.infer<typeof AuthSchema>;

export { AuthSchema };
export type { AuthFormValues };
