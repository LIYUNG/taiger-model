import { z } from 'zod';
import { createApiResponseSchema } from './common';
import { UserWithIdSchema, StudentResponseSchema } from './serialized';

// =========== Schemas ===========

export const AgentStudentDistributionItemSchema = z.object({
  agent_id: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  studentCount: z.number().optional()
});

export const StatisticsOverviewDataSchema = z.object({
  documents: z.unknown().optional(),
  agents_data: z.array(z.unknown()).optional(),
  editors_data: z.array(z.unknown()).optional(),
  students_years_pair: z.array(z.unknown()).optional(),
  students_creation_dates: z.unknown().optional()
});

export const StatisticsKPIDataSchema = z.object({
  finished_docs: z.array(z.unknown()).optional()
});

export const StatisticsResponseTimeDataSchema = z.object({
  agents_data: z.array(z.unknown()).optional(),
  editors_data: z.array(z.unknown()).optional(),
  studentAvgResponseTime: z.array(z.unknown()).optional()
});

export const TasksOverviewDataSchema = z.object({
  noAgentsStudents: z.number().optional(),
  noEditorsStudents: z.number().optional(),
  noTrainerInInterviewsStudents: z.number().optional(),
  noEssayWritersEssays: z.number().optional()
});

export const GetTeamMembersResponseSchema = createApiResponseSchema(z.array(UserWithIdSchema));

export const GetArchivStudentsResponseSchema = createApiResponseSchema(
  z.array(StudentResponseSchema)
);

export const GetStatisticsOverviewResponseSchema = createApiResponseSchema(
  StatisticsOverviewDataSchema
);

export const GetStatisticsAgentsResponseSchema = z.object({
  success: z.boolean(),
  agentStudentDistribution: z.array(AgentStudentDistributionItemSchema).optional()
});

export const GetStatisticsKPIResponseSchema = createApiResponseSchema(StatisticsKPIDataSchema);

export const GetStatisticsResponseTimeResponseSchema = createApiResponseSchema(
  StatisticsResponseTimeDataSchema
);

export const GetTasksOverviewResponseSchema = createApiResponseSchema(TasksOverviewDataSchema);

export const GetIsManagerResponseSchema = createApiResponseSchema(
  z.object({ isManager: z.boolean() })
);

export const GetAgentProfileResponseSchema = createApiResponseSchema(UserWithIdSchema);

export const GetResponseIntervalByStudentResponseSchema = createApiResponseSchema(
  StudentResponseSchema
);

export const GetEssayWritersTeamsResponseSchema = createApiResponseSchema(z.array(UserWithIdSchema));

// =========== Inferred types ===========

/** Agent–student distribution item used in statistics */
export type AgentStudentDistributionItem = z.infer<typeof AgentStudentDistributionItemSchema>;

/** Statistics overview payload */
export type StatisticsOverviewData = z.infer<typeof StatisticsOverviewDataSchema>;

/** Statistics KPI payload */
export type StatisticsKPIData = z.infer<typeof StatisticsKPIDataSchema>;

/** Statistics response-time payload */
export type StatisticsResponseTimeData = z.infer<typeof StatisticsResponseTimeDataSchema>;

/** Tasks overview payload */
export type TasksOverviewData = z.infer<typeof TasksOverviewDataSchema>;

/** GET /api/teams */
export type GetTeamMembersResponse = z.infer<typeof GetTeamMembersResponseSchema>;

/** GET /api/teams/archiv/:TaiGerStaffId */
export type GetArchivStudentsResponse = z.infer<typeof GetArchivStudentsResponseSchema>;

/** GET /api/teams/statistics/overview */
export type GetStatisticsOverviewResponse = z.infer<typeof GetStatisticsOverviewResponseSchema>;

/**
 * GET /api/teams/statistics/agents
 * Non-standard: returns agentStudentDistribution at top level
 */
export type GetStatisticsAgentsResponse = z.infer<typeof GetStatisticsAgentsResponseSchema>;

/** GET /api/teams/statistics/kpi */
export type GetStatisticsKPIResponse = z.infer<typeof GetStatisticsKPIResponseSchema>;

/** GET /api/teams/statistics/response-time */
export type GetStatisticsResponseTimeResponse = z.infer<
  typeof GetStatisticsResponseTimeResponseSchema
>;

/** GET /api/teams/tasks-overview */
export type GetTasksOverviewResponse = z.infer<typeof GetTasksOverviewResponseSchema>;

/** GET /api/teams/is-manager */
export type GetIsManagerResponse = z.infer<typeof GetIsManagerResponseSchema>;

/** GET /api/agents/profile/:agent_id */
export type GetAgentProfileResponse = z.infer<typeof GetAgentProfileResponseSchema>;

/** GET /api/teams/response-interval/:studentId */
export type GetResponseIntervalByStudentResponse = z.infer<
  typeof GetResponseIntervalByStudentResponseSchema
>;

/** GET /api/essay-writers */
export type GetEssayWritersTeamsResponse = z.infer<typeof GetEssayWritersTeamsResponseSchema>;
