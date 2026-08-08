import { z } from 'zod';

import {
  AuthLoginResponseSchema,
  AuthOAuthCallbackResponseSchema,
  AuthVerifyResponseSchema,
  ForgotPasswordResponseSchema,
  LogoutResponseSchema,
  ResendActivationResponseSchema,
  ResetPasswordResponseSchema
} from '../api/auth';
import {
  AddUserResponseSchema,
  DeleteUserResponseSchema,
  GetUserResponseSchema,
  GetUsersCountResponseSchema,
  GetUsersOverviewResponseSchema,
  GetUsersResponseSchema,
  UpdateArchivUserResponseSchema,
  UpdateUserResponseSchema
} from '../api/users';
import {
  CreateComplaintResponseSchema,
  DeleteComplaintResponseSchema,
  DeleteMessageInComplaintResponseSchema,
  GetComplaintResponseSchema,
  GetComplaintsPaginatedResponseSchema,
  GetComplaintsResponseSchema,
  PostMessageInComplaintResponseSchema,
  UpdateComplaintResponseSchema
} from '../api/tickets';
import {
  AddInterviewTrainingDateTimeResponseSchema,
  CreateInterviewResponseSchema,
  DeleteInterviewResponseSchema,
  GetInterviewResponseSchema,
  GetInterviewSurveyResponseSchema,
  UpdateInterviewResponseSchema,
  UpdateInterviewSurveyResponseSchema
} from '../api/interviews';
import { createApiResponseSchema } from '../api/common';
import { defineContract } from './types';

const IdParam = (name: string) => z.object({ [name]: z.string().min(1) });

// ---------------------------------------------------------------- users

export const usersContract = {
  getUsersOverview: defineContract({
    method: 'get',
    path: '/api/users/overview',
    tags: ['Users'],
    summary: 'Get the users overview',
    response: GetUsersOverviewResponseSchema
  }),
  getUsers: defineContract({
    method: 'get',
    path: '/api/users',
    tags: ['Users'],
    summary: 'Get users',
    response: GetUsersResponseSchema
  }),
  addUser: defineContract({
    method: 'post',
    path: '/api/users',
    tags: ['Users'],
    summary: 'Add a user',
    response: AddUserResponseSchema
  }),
  getUsersCount: defineContract({
    method: 'get',
    path: '/api/users/count',
    tags: ['Users'],
    summary: 'Count users by role',
    response: GetUsersCountResponseSchema
  }),
  updateUser: defineContract({
    method: 'post',
    path: '/api/users/:user_id',
    tags: ['Users'],
    summary: 'Update a user',
    params: IdParam('user_id'),
    response: UpdateUserResponseSchema
  }),
  getUser: defineContract({
    method: 'get',
    path: '/api/users/:user_id',
    tags: ['Users'],
    summary: 'Get a user',
    params: IdParam('user_id'),
    response: GetUserResponseSchema
  }),
  deleteUser: defineContract({
    method: 'delete',
    path: '/api/users/:user_id',
    tags: ['Users'],
    summary: 'Delete a user',
    params: IdParam('user_id'),
    response: DeleteUserResponseSchema
  }),
  updateArchivUser: defineContract({
    method: 'post',
    path: '/api/users/archiv/:user_id',
    tags: ['Users'],
    summary: 'Archive or unarchive a user',
    params: IdParam('user_id'),
    response: UpdateArchivUserResponseSchema
  })
} as const;

// ---------------------------------------------------------------- auth

export const authContract = {
  login: defineContract({
    method: 'post',
    path: '/auth/login',
    tags: ['Auth'],
    summary: 'Log in',
    response: AuthLoginResponseSchema
  }),
  logout: defineContract({
    method: 'get',
    path: '/auth/logout',
    tags: ['Auth'],
    summary: 'Log out',
    response: LogoutResponseSchema
  }),
  verify: defineContract({
    method: 'get',
    path: '/auth/verify',
    tags: ['Auth'],
    summary: 'Verify the current session',
    response: AuthVerifyResponseSchema
  }),
  activation: defineContract({
    method: 'post',
    path: '/auth/activation',
    tags: ['Auth'],
    summary: 'Activate an account',
    response: createApiResponseSchema(z.unknown())
  }),
  resendActivation: defineContract({
    method: 'post',
    path: '/auth/resend-activation',
    tags: ['Auth'],
    summary: 'Resend the activation email',
    response: ResendActivationResponseSchema
  }),
  forgotPassword: defineContract({
    method: 'post',
    path: '/auth/forgot-password',
    tags: ['Auth'],
    summary: 'Request a password reset',
    response: ForgotPasswordResponseSchema
  }),
  resetPassword: defineContract({
    method: 'post',
    path: '/auth/reset-password',
    tags: ['Auth'],
    summary: 'Reset a password',
    response: ResetPasswordResponseSchema
  }),
  googleCallback: defineContract({
    method: 'post',
    path: '/auth/oauth/google/callback',
    tags: ['Auth'],
    summary: 'Google OAuth callback',
    response: AuthOAuthCallbackResponseSchema
  })
} as const;

// ---------------------------------------------------------------- interviews

export const interviewsContract = {
  getInterviewsPaginated: defineContract({
    method: 'get',
    path: '/api/interviews/all/paginated',
    tags: ['Interviews'],
    summary: 'Get one page of interviews',
    query: z.object({
      page: z.string().optional(),
      limit: z.string().optional(),
      student_id: z.string().optional(),
      program_id: z.string().optional(),
      isClosed: z.string().optional(),
      no_trainer: z.string().optional()
    }),
    response: createApiResponseSchema(z.unknown())
  }),
  getInterviewQuestions: defineContract({
    method: 'get',
    path: '/api/interviews/questions/:programId',
    tags: ['Interviews'],
    summary: 'Get interview questions for a program',
    params: IdParam('programId'),
    response: createApiResponseSchema(z.unknown())
  }),
  getInterview: defineContract({
    method: 'get',
    path: '/api/interviews/:interview_id',
    tags: ['Interviews'],
    summary: 'Get an interview',
    params: IdParam('interview_id'),
    response: GetInterviewResponseSchema
  }),
  updateInterview: defineContract({
    method: 'put',
    path: '/api/interviews/:interview_id',
    tags: ['Interviews'],
    summary: 'Update an interview',
    params: IdParam('interview_id'),
    response: UpdateInterviewResponseSchema
  }),
  deleteInterview: defineContract({
    method: 'delete',
    path: '/api/interviews/:interview_id',
    tags: ['Interviews'],
    summary: 'Delete an interview',
    params: IdParam('interview_id'),
    response: DeleteInterviewResponseSchema
  }),
  getInterviewSurvey: defineContract({
    method: 'get',
    path: '/api/interviews/:interview_id/survey',
    tags: ['Interviews'],
    summary: 'Get an interview survey',
    params: IdParam('interview_id'),
    response: GetInterviewSurveyResponseSchema
  }),
  updateInterviewSurvey: defineContract({
    method: 'put',
    path: '/api/interviews/:interview_id/survey',
    tags: ['Interviews'],
    summary: 'Update an interview survey',
    params: IdParam('interview_id'),
    response: UpdateInterviewSurveyResponseSchema
  }),
  addInterviewDateTime: defineContract({
    method: 'post',
    path: '/api/interviews/time/:interview_id',
    tags: ['Interviews'],
    summary: 'Add a training date/time to an interview',
    params: IdParam('interview_id'),
    response: AddInterviewTrainingDateTimeResponseSchema
  }),
  createInterview: defineContract({
    method: 'post',
    path: '/api/interviews/create/:program_id/:studentId',
    tags: ['Interviews'],
    summary: 'Create an interview',
    params: z.object({
      program_id: z.string().min(1),
      studentId: z.string().min(1)
    }),
    response: CreateInterviewResponseSchema
  })
} as const;

// ---------------------------------------------------------------- complaints

export const complaintsContract = {
  getComplaintsPaginated: defineContract({
    method: 'get',
    path: '/api/complaints/paginated',
    tags: ['Complaints'],
    summary: 'Get one page of support tickets',
    response: GetComplaintsPaginatedResponseSchema
  }),
  getComplaints: defineContract({
    method: 'get',
    path: '/api/complaints',
    tags: ['Complaints'],
    summary: 'Get support tickets',
    response: GetComplaintsResponseSchema
  }),
  createComplaint: defineContract({
    method: 'post',
    path: '/api/complaints',
    tags: ['Complaints'],
    summary: 'Create a support ticket',
    response: CreateComplaintResponseSchema
  }),
  getComplaint: defineContract({
    method: 'get',
    path: '/api/complaints/:ticketId',
    tags: ['Complaints'],
    summary: 'Get a support ticket',
    params: IdParam('ticketId'),
    response: GetComplaintResponseSchema
  }),
  updateComplaint: defineContract({
    method: 'put',
    path: '/api/complaints/:ticketId',
    tags: ['Complaints'],
    summary: 'Update a support ticket',
    params: IdParam('ticketId'),
    response: UpdateComplaintResponseSchema
  }),
  deleteComplaint: defineContract({
    method: 'delete',
    path: '/api/complaints/:ticketId',
    tags: ['Complaints'],
    summary: 'Delete a support ticket',
    params: IdParam('ticketId'),
    response: DeleteComplaintResponseSchema
  }),
  updateMessageInComplaint: defineContract({
    method: 'put',
    path: '/api/complaints/:ticketId/:messageId',
    tags: ['Complaints'],
    summary: 'Update a message in a support ticket',
    params: z.object({
      ticketId: z.string().min(1),
      messageId: z.string().min(1)
    }),
    response: PostMessageInComplaintResponseSchema
  }),
  deleteMessageInComplaint: defineContract({
    method: 'delete',
    path: '/api/complaints/:ticketId/:messageId',
    tags: ['Complaints'],
    summary: 'Delete a message from a support ticket',
    params: z.object({
      ticketId: z.string().min(1),
      messageId: z.string().min(1)
    }),
    response: DeleteMessageInComplaintResponseSchema
  }),
  getComplaintFile: defineContract({
    method: 'get',
    path: '/api/complaints/:studentId/:ticketId/:fileKey',
    tags: ['Complaints'],
    summary: 'Download a file attached to a support ticket',
    params: z.object({
      studentId: z.string().min(1),
      ticketId: z.string().min(1),
      fileKey: z.string().min(1)
    }),
    response: createApiResponseSchema(z.unknown())
  }),
  postMessageInComplaint: defineContract({
    method: 'post',
    path: '/api/complaints/new-message/:ticketId/:studentId',
    tags: ['Complaints'],
    summary: 'Post a message to a support ticket',
    params: z.object({
      ticketId: z.string().min(1),
      studentId: z.string().min(1)
    }),
    response: PostMessageInComplaintResponseSchema
  })
} as const;
