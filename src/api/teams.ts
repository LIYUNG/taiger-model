import type { ApiResponse } from './common';
import type { IUserWithId, IStudentResponse } from './serialized';

/** Agent–student distribution item used in statistics */
export interface AgentStudentDistributionItem {
  agent_id?: string;
  firstname?: string;
  lastname?: string;
  studentCount?: number;
}

/** Statistics overview payload */
export interface StatisticsOverviewData {
  documents?: unknown;
  agents_data?: unknown[];
  editors_data?: unknown[];
  students_years_pair?: unknown[];
  students_creation_dates?: unknown;
}

/** Statistics KPI payload */
export interface StatisticsKPIData {
  finished_docs?: unknown[];
}

/** Statistics response-time payload */
export interface StatisticsResponseTimeData {
  agents_data?: unknown[];
  editors_data?: unknown[];
  studentAvgResponseTime?: unknown[];
}

/** Tasks overview payload */
export interface TasksOverviewData {
  noAgentsStudents?: number;
  noEditorsStudents?: number;
  noTrainerInInterviewsStudents?: number;
  noEssayWritersEssays?: number;
}

/** GET /api/teams */
export type GetTeamMembersResponse = ApiResponse<IUserWithId[]>;

/** GET /api/teams/archiv/:TaiGerStaffId */
export type GetArchivStudentsResponse = ApiResponse<IStudentResponse[]>;

/** GET /api/teams/statistics/overview */
export type GetStatisticsOverviewResponse =
  ApiResponse<StatisticsOverviewData>;

/**
 * GET /api/teams/statistics/agents
 * Non-standard: returns agentStudentDistribution at top level
 */
export interface GetStatisticsAgentsResponse {
  success: boolean;
  agentStudentDistribution?: AgentStudentDistributionItem[];
}

/** GET /api/teams/statistics */
export type GetStatisticsV2Response = ApiResponse<unknown>;

/** GET /api/teams/statistics/kpi */
export type GetStatisticsKPIResponse = ApiResponse<StatisticsKPIData>;

/** GET /api/teams/statistics/response-time */
export type GetStatisticsResponseTimeResponse =
  ApiResponse<StatisticsResponseTimeData>;

/** GET /api/teams/tasks-overview */
export type GetTasksOverviewResponse = ApiResponse<TasksOverviewData>;

/** GET /api/teams/is-manager */
export type GetIsManagerResponse = ApiResponse<{ isManager: boolean }>;

/** GET /api/agents/profile/:agent_id */
export type GetAgentProfileResponse = ApiResponse<IUserWithId>;

/** GET /api/teams/response-interval/:studentId */
export type GetResponseIntervalByStudentResponse =
  ApiResponse<IStudentResponse>;

/** GET /api/essay-writers */
export type GetEssayWritersTeamsResponse = ApiResponse<IUserWithId[]>;
