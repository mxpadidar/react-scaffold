import { z } from "zod";

export const tokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
});

export type Token = z.infer<typeof tokenSchema>;
