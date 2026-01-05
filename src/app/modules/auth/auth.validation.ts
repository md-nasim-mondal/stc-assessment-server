import { z } from "zod";

const loginZodSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string(),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
};
