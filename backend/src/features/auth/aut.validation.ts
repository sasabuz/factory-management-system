import {z} from "zod";

export const singupValidation = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["admin", "manager", "accountant", "worker"]).optional(),
  image: z.string().url("Image must be a valid URL").optional().or(z.literal("")),
  salary: z.number().min(0, "Salary cannot be negative").optional(),
  isActive: z.boolean().optional(),
})