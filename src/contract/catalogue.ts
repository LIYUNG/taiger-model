import { z } from 'zod';

import {
  GetAdmissionsOverviewAggregatesResponseSchema,
  GetAdmissionsOverviewResponseSchema,
  GetAdmissionsResponseSchema
} from '../api/applications';
import {
  CreateAllCourseResponseSchema,
  CreateKeywordsetResponseSchema,
  DeleteAllCourseResponseSchema,
  DeleteKeywordsetResponseSchema,
  GetAllCourseResponseSchema,
  GetAllCoursesPaginatedResponseSchema,
  GetCourseKeywordsetsResponseSchema,
  UpdateAllCourseResponseSchema,
  UpdateKeywordsetResponseSchema
} from '../api/courses';
import {
  ConfirmEventResponseSchema,
  DeleteEventResponseSchema,
  GetBookedEventsResponseSchema,
  GetEventsResponseSchema,
  PostEventResponseSchema,
  UpdateEventResponseSchema
} from '../api/events';
import {
  CreateProgramRequirementResponseSchema,
  DeleteProgramRequirementResponseSchema,
  GetProgramRequirementResponseSchema,
  GetProgramRequirementsResponseSchema,
  UpdateProgramRequirementResponseSchema
} from '../api/programRequirements';
import {
  GetIsManagerResponseSchema,
  GetStatisticsAgentsResponseSchema,
  GetStatisticsKPIResponseSchema,
  GetStatisticsOverviewResponseSchema,
  GetStatisticsResponseTimeResponseSchema,
  GetTasksOverviewResponseSchema,
  GetTeamMembersResponseSchema
} from '../api/teams';
import {
  GetProgramTicketResponseSchema,
  GetProgramTicketsResponseSchema
} from '../api/tickets';
import { createApiResponseSchema } from '../api/common';
import { defineContract } from './types';

/**
 * Contracts for the mid-size routers.
 *
 * Path, params and response only — a `body` is declared solely where the caller
 * was read first (see BACKEND_GUIDE.md §7). Everything here therefore mounts
 * without changing a single request's runtime behaviour.
 */

const IdParam = (name: string) => z.object({ [name]: z.string().min(1) });

// ---------------------------------------------------------------- course keywords

export const courseKeywordsFullContract = {
  getCourseKeywordsets: defineContract({
    method: 'get',
    path: '/api/course-keywords',
    tags: ['Course Keywords'],
    summary: 'Get all keyword sets',
    response: GetCourseKeywordsetsResponseSchema
  }),
  createKeywordset: defineContract({
    method: 'post',
    path: '/api/course-keywords/:keywordsSetId',
    tags: ['Course Keywords'],
    summary: 'Create a keyword set',
    params: IdParam('keywordsSetId'),
    response: CreateKeywordsetResponseSchema
  }),
  updateKeywordset: defineContract({
    method: 'put',
    path: '/api/course-keywords/:keywordsSetId',
    tags: ['Course Keywords'],
    summary: 'Update a keyword set',
    params: IdParam('keywordsSetId'),
    response: UpdateKeywordsetResponseSchema
  }),
  deleteKeywordset: defineContract({
    method: 'delete',
    path: '/api/course-keywords/:keywordsSetId',
    tags: ['Course Keywords'],
    summary: 'Delete a keyword set',
    params: IdParam('keywordsSetId'),
    response: DeleteKeywordsetResponseSchema
  })
} as const;

// ---------------------------------------------------------------- admissions

export const admissionsContract = {
  getAdmissionsProgramCounts: defineContract({
    method: 'get',
    path: '/api/admissions/program-counts',
    tags: ['Admissions'],
    summary: 'Get per-program application counts',
    response: GetAdmissionsResponseSchema
  }),
  getAdmissionsOverview: defineContract({
    method: 'get',
    path: '/api/admissions/overview',
    tags: ['Admissions'],
    summary: 'Get admission status counts',
    response: GetAdmissionsOverviewResponseSchema
  }),
  getAdmissionsOverviewAggregates: defineContract({
    method: 'get',
    path: '/api/admissions/overview-aggregates',
    tags: ['Admissions'],
    summary: 'Get the pre-aggregated admissions overview datasets',
    response: GetAdmissionsOverviewAggregatesResponseSchema
  }),
  getAdmissionsYear: defineContract({
    method: 'get',
    path: '/api/admissions/:applications_year',
    tags: ['Admissions'],
    summary: 'Get admissions for an application year',
    params: IdParam('applications_year'),
    response: createApiResponseSchema(z.array(z.unknown()))
  })
} as const;

// ---------------------------------------------------------------- all-courses

export const allCoursesContract = {
  createCourse: defineContract({
    method: 'post',
    path: '/api/all-courses',
    tags: ['Courses DB'],
    summary: 'Create a course',
    response: CreateAllCourseResponseSchema
  }),
  getAllCoursesPaginated: defineContract({
    method: 'get',
    path: '/api/all-courses/paginated',
    tags: ['Courses DB'],
    summary: 'Get one page of the course catalogue',
    response: GetAllCoursesPaginatedResponseSchema
  }),
  getCourse: defineContract({
    method: 'get',
    path: '/api/all-courses/:courseId',
    tags: ['Courses DB'],
    summary: 'Get a course',
    params: IdParam('courseId'),
    response: GetAllCourseResponseSchema
  }),
  updateCourse: defineContract({
    method: 'put',
    path: '/api/all-courses/:courseId',
    tags: ['Courses DB'],
    summary: 'Update a course',
    params: IdParam('courseId'),
    response: UpdateAllCourseResponseSchema
  }),
  deleteCourse: defineContract({
    method: 'delete',
    path: '/api/all-courses/:courseId',
    tags: ['Courses DB'],
    summary: 'Delete a course',
    params: IdParam('courseId'),
    response: DeleteAllCourseResponseSchema
  })
} as const;

// ---------------------------------------------------------------- tickets

export const ticketsContract = {
  getProgramTicketsOverview: defineContract({
    method: 'get',
    path: '/api/tickets/overview',
    tags: ['Tickets'],
    summary: 'Get the ticket overview',
    response: GetProgramTicketsResponseSchema
  }),
  getProgramTickets: defineContract({
    method: 'get',
    path: '/api/tickets',
    tags: ['Tickets'],
    summary: 'Get tickets',
    query: z.object({
      type: z.string().optional(),
      status: z.string().optional(),
      program_id: z.string().optional()
    }),
    response: GetProgramTicketResponseSchema
  }),
  createProgramTicket: defineContract({
    method: 'post',
    path: '/api/tickets',
    tags: ['Tickets'],
    summary: 'Create a ticket',
    response: GetProgramTicketResponseSchema
  }),
  updateProgramTicket: defineContract({
    method: 'put',
    path: '/api/tickets/:ticket_id',
    tags: ['Tickets'],
    summary: 'Update a ticket',
    params: IdParam('ticket_id'),
    response: GetProgramTicketResponseSchema
  }),
  deleteProgramTicket: defineContract({
    method: 'delete',
    path: '/api/tickets/:ticket_id',
    tags: ['Tickets'],
    summary: 'Delete a ticket',
    params: IdParam('ticket_id'),
    response: GetProgramTicketResponseSchema
  })
} as const;

// ---------------------------------------------------------------- program requirements

export const programRequirementsContract = {
  getProgramRequirements: defineContract({
    method: 'get',
    path: '/api/program-requirements',
    tags: ['Program Requirements'],
    summary: 'Get program requirements',
    response: GetProgramRequirementsResponseSchema
  }),
  createProgramRequirement: defineContract({
    method: 'post',
    path: '/api/program-requirements/new',
    tags: ['Program Requirements'],
    summary: 'Create a program requirement',
    response: CreateProgramRequirementResponseSchema
  }),
  getProgramsAndKeywords: defineContract({
    method: 'get',
    path: '/api/program-requirements/programs-and-keywords',
    tags: ['Program Requirements'],
    summary: 'Get programs and their keyword sets',
    response: createApiResponseSchema(z.unknown())
  }),
  getProgramRequirement: defineContract({
    method: 'get',
    path: '/api/program-requirements/:requirementId',
    tags: ['Program Requirements'],
    summary: 'Get a program requirement',
    params: IdParam('requirementId'),
    response: GetProgramRequirementResponseSchema
  }),
  updateProgramRequirement: defineContract({
    method: 'put',
    path: '/api/program-requirements/:requirementId',
    tags: ['Program Requirements'],
    summary: 'Update a program requirement',
    params: IdParam('requirementId'),
    response: UpdateProgramRequirementResponseSchema
  }),
  deleteProgramRequirement: defineContract({
    method: 'delete',
    path: '/api/program-requirements/:requirementId',
    tags: ['Program Requirements'],
    summary: 'Delete a program requirement',
    params: IdParam('requirementId'),
    response: DeleteProgramRequirementResponseSchema
  })
} as const;

// ---------------------------------------------------------------- teams

export const teamsContract = {
  getTeamMembers: defineContract({
    method: 'get',
    path: '/api/teams',
    tags: ['Teams'],
    summary: 'Get team members',
    response: GetTeamMembersResponseSchema
  }),
  getStatisticsOverview: defineContract({
    method: 'get',
    path: '/api/teams/statistics/overview',
    tags: ['Teams'],
    summary: 'Get the statistics overview',
    response: GetStatisticsOverviewResponseSchema
  }),
  getStatisticsAgents: defineContract({
    method: 'get',
    path: '/api/teams/statistics/agents',
    tags: ['Teams'],
    summary: 'Get per-agent statistics',
    response: GetStatisticsAgentsResponseSchema
  }),
  getStatisticsKPI: defineContract({
    method: 'get',
    path: '/api/teams/statistics/kpi',
    tags: ['Teams'],
    summary: 'Get KPI statistics',
    response: GetStatisticsKPIResponseSchema
  }),
  getStatisticsResponseTime: defineContract({
    method: 'get',
    path: '/api/teams/statistics/response-time',
    tags: ['Teams'],
    summary: 'Get response-time statistics',
    response: GetStatisticsResponseTimeResponseSchema
  }),
  getIsManager: defineContract({
    method: 'get',
    path: '/api/teams/is-manager',
    tags: ['Teams'],
    summary: 'Whether the caller is a manager',
    response: GetIsManagerResponseSchema
  }),
  getTasksOverview: defineContract({
    method: 'get',
    path: '/api/teams/tasks-overview',
    tags: ['Teams'],
    summary: 'Get the tasks overview',
    response: GetTasksOverviewResponseSchema
  }),
  getResponseIntervalByStudent: defineContract({
    method: 'get',
    path: '/api/teams/response-interval/:studentId',
    tags: ['Teams'],
    summary: 'Get response intervals for a student',
    params: IdParam('studentId'),
    response: createApiResponseSchema(z.unknown())
  })
} as const;

// ---------------------------------------------------------------- events

export const eventsContract = {
  ping: defineContract({
    method: 'get',
    path: '/api/events/ping',
    tags: ['Events'],
    summary: 'Active event count for the caller',
    response: createApiResponseSchema(z.unknown())
  }),
  getBookedEvents: defineContract({
    method: 'get',
    path: '/api/events/booked',
    tags: ['Events'],
    summary: 'Get booked events in a window',
    query: z.object({
      startTime: z.string().optional(),
      endTime: z.string().optional()
    }),
    response: GetBookedEventsResponseSchema
  }),
  getEventsPaginated: defineContract({
    method: 'get',
    path: '/api/events/paginated',
    tags: ['Events'],
    summary: 'Get one page of events',
    response: GetEventsResponseSchema
  }),
  getEvents: defineContract({
    method: 'get',
    path: '/api/events',
    tags: ['Events'],
    summary: 'Get events',
    response: GetEventsResponseSchema
  }),
  postEvent: defineContract({
    method: 'post',
    path: '/api/events',
    tags: ['Events'],
    summary: 'Create an event',
    response: PostEventResponseSchema
  }),
  confirmEvent: defineContract({
    method: 'put',
    path: '/api/events/:event_id/confirm',
    tags: ['Events'],
    summary: 'Confirm an event',
    params: IdParam('event_id'),
    response: ConfirmEventResponseSchema
  }),
  updateEvent: defineContract({
    method: 'put',
    path: '/api/events/:event_id',
    tags: ['Events'],
    summary: 'Update an event',
    params: IdParam('event_id'),
    response: UpdateEventResponseSchema
  }),
  deleteEvent: defineContract({
    method: 'delete',
    path: '/api/events/:event_id',
    tags: ['Events'],
    summary: 'Delete an event',
    params: IdParam('event_id'),
    response: DeleteEventResponseSchema
  })
} as const;
