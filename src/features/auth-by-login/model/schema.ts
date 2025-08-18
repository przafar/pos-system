import { z } from "zod";

export const loginSchema = z.object({
  login: z.string().min(1, "Login majburiy"),
  password: z.string().min(1, "Parol majburiy"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;