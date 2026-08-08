import { z } from 'zod';

import { GetStudentUniAssistResponseSchema } from '../api/students';
import { GetAgentProfileResponseSchema } from '../api/teams';
import { createApiResponseSchema } from './../api/common';
import { defineContract } from './types';
import { asOpenApiObject } from './openapi-compat';

// ---------------------------------------------------------------- uni-assist

export const StudentIdParamsSchema = z.object({
  studentId: z.string().min(1)
});

export const uniassistContract = {
  getStudentUniAssist: defineContract({
    method: 'get',
    path: '/api/uniassist/:studentId',
    tags: ['UniAssist'],
    summary: 'Get a student uni-assist tasks',
    params: StudentIdParamsSchema,
    response: asOpenApiObject(
      GetStudentUniAssistResponseSchema,
      'GetStudentUniAssistResponse'
    )
  })
} as const;

// ---------------------------------------------------------------- agents

export const AgentIdParamsSchema = z.object({
  agent_id: z.string().min(1)
});

export const agentsContract = {
  getAgentProfile: defineContract({
    method: 'get',
    path: '/api/agents/profile/:agent_id',
    tags: ['Agents'],
    summary: 'Get an agent profile',
    params: AgentIdParamsSchema,
    response: GetAgentProfileResponseSchema
  }),

  /**
   * NOTE: the handler behind this reads and returns the agent without writing
   * anything — a PUT that behaves as a GET. Documented as it behaves; the
   * missing write is tracked separately rather than papered over here.
   */
  putAgentProfile: defineContract({
    method: 'put',
    path: '/api/agents/profile/:agent_id',
    tags: ['Agents'],
    summary: 'Update an agent profile',
    params: AgentIdParamsSchema,
    response: GetAgentProfileResponseSchema
  })
} as const;

// ---------------------------------------------------------------- taiger ai

/**
 * The program-list assistant streams a python process's output, so the payload
 * is whatever that emits; `data` is left unshaped rather than described as
 * something it is not.
 */
export const ProcessProgramListAiResponseSchema = createApiResponseSchema(
  z.unknown()
);

export const taigerAiContract = {
  processProgramListAi: defineContract({
    method: 'get',
    path: '/api/taigerai/program/:programId',
    tags: ['TaiGer AI'],
    summary: 'Run the program-list assistant for a program',
    params: z.object({ programId: z.string().min(1) }),
    response: ProcessProgramListAiResponseSchema
  })
} as const;
