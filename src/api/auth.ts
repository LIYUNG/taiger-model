import { z } from 'zod';
import { SuccessResponseSchema, createApiResponseSchema } from './common';
import { UserWithIdSchema } from './serialized';

// =========== Schemas ===========

export const AuthVerifyResponseSchema = z.object({
  success: z.boolean(),
  data: UserWithIdSchema.optional()
});

export const AuthLoginResponseSchema = createApiResponseSchema(UserWithIdSchema);

export const AuthOAuthCallbackResponseSchema = createApiResponseSchema(UserWithIdSchema);

export const AuthRegisterResponseSchema = SuccessResponseSchema;

export const ForgotPasswordResponseSchema = SuccessResponseSchema;

export const ResetPasswordResponseSchema = SuccessResponseSchema;

export const ActivationResponseSchema = SuccessResponseSchema;

export const ResendActivationResponseSchema = SuccessResponseSchema;

export const LogoutResponseSchema = SuccessResponseSchema;

// =========== Inferred types ===========

/** GET /auth/verify */
export type AuthVerifyResponse = z.infer<typeof AuthVerifyResponseSchema>;

/** POST /auth/login */
export type AuthLoginResponse = z.infer<typeof AuthLoginResponseSchema>;

/** POST /auth/oauth/google/callback */
export type AuthOAuthCallbackResponse = z.infer<typeof AuthOAuthCallbackResponseSchema>;

/** POST /auth/signup */
export type AuthRegisterResponse = z.infer<typeof AuthRegisterResponseSchema>;

/** POST /auth/forgot-password */
export type ForgotPasswordResponse = z.infer<typeof ForgotPasswordResponseSchema>;

/** POST /auth/reset-password */
export type ResetPasswordResponse = z.infer<typeof ResetPasswordResponseSchema>;

/** POST /auth/activation */
export type ActivationResponse = z.infer<typeof ActivationResponseSchema>;

/** POST /auth/resend-activation */
export type ResendActivationResponse = z.infer<typeof ResendActivationResponseSchema>;

/** GET /auth/logout */
export type LogoutResponse = z.infer<typeof LogoutResponseSchema>;
