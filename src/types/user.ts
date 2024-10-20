import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  isActive: z.boolean(),
  registeredAt: z.date(),
});

export type User = z.infer<typeof userSchema>;
