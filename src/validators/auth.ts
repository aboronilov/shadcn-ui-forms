import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  name: z
    .string()
    .min(3, { message: "minimum length - 3 characters" })
    .max(255, { message: "maximum length - 3 characters" }),
  studentId: z
    .string()
    .min(7)
    .max(7)
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Sudent ID should contian numbers",
    }),
  year: z.string().min(2).max(10),
  password: z.string().min(6).max(20),
  confirmPassword: z.string().min(6).max(20),
});
