import { z } from "zod";

export const clockParamsSchema = z.object({
  theme: z.enum(["light", "dark", "gradient", "minimal", "neon"]).optional().default("light"),
  size: z.enum(["small", "medium", "large"]).optional().default("medium"),
  color: z.string().regex(/^[0-9A-Fa-f]{6}$/).optional(),
  background: z.string().regex(/^[0-9A-Fa-f]{6}$/).optional(),
  timezone: z.string().optional().default("Asia/Kolkata"), // Default to IST
  format: z.enum(["12", "24"]).optional().default("24"),
  showDate: z.enum(["true", "false"]).optional().default("false"),
  showDay: z.enum(["true", "false"]).optional().default("false"),
  showFlag: z.enum(["true", "false"]).optional().default("false"),
  country: z.string().optional().default("IN"), // Default to India flag
  style: z.enum(["digital", "analog", "card", "badge"]).optional().default("digital"),
});

export type ClockParams = z.infer<typeof clockParamsSchema>;
