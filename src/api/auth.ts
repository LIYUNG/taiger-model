import type { ApiResponse, SuccessResponse } from './common';
import type { IUserWithId } from './serialized';

/** GET /auth/verify */
export interface AuthVerifyResponse {
  success: boolean;
  data?: IUserWithId;
}

/** POST /auth/login */
export type AuthLoginResponse = ApiResponse<IUserWithId>;

/** POST /auth/oauth/google/callback */
export type AuthOAuthCallbackResponse = ApiResponse<IUserWithId>;

/** POST /auth/signup */
export type AuthRegisterResponse = SuccessResponse;

/** POST /auth/forgot-password */
export type ForgotPasswordResponse = SuccessResponse;

/** POST /auth/reset-password */
export type ResetPasswordResponse = SuccessResponse;

/** POST /auth/activation */
export type ActivationResponse = SuccessResponse;

/** POST /auth/resend-activation */
export type ResendActivationResponse = SuccessResponse;

/** GET /auth/logout */
export type LogoutResponse = SuccessResponse;
