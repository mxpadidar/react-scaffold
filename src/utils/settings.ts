import { z } from "zod";

const envSchema = z.object({
  DEBUG_MODE: z.boolean().optional(),
  APP_NAME: z.string(),
  BACKEND_BASE_URL: z.string(),
  DOMAIN: z.string(),
});

type Env = z.infer<typeof envSchema>;

const settings: Env = envSchema.parse({
  DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === "true",
  APP_NAME: import.meta.env.VITE_APP_NAME,
  BACKEND_BASE_URL: import.meta.env.VITE_BACKEND_BASE_URL,
  DOMAIN: import.meta.env.VITE_DOMAIN,
});

export default settings;
