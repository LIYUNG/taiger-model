import { z } from 'zod';

import {
  WidgetDownloadJsonResponseSchema,
  WidgetExportPDFResponseSchema,
  WidgetTranscriptResponseSchema
} from '../api/widgets';
import { defineContract } from './types';

/**
 * Staff-facing widgets: the transcript analyser an admin runs against a
 * prospect who is not a student yet, and the PDF export of a student's
 * communication thread.
 */

export const widgetsContract = {
  exportMessagePdf: defineContract({
    method: 'get',
    path: '/api/widgets/messages/export/:studentId',
    tags: ['Widgets'],
    summary: "Export a student's communication thread as a PDF",
    params: z.object({ studentId: z.string().min(1) }),
    // The handler writes a jsPDF buffer, not JSON, so a client fetches this
    // through its blob transport rather than `callApi`.
    successContentType: 'application/pdf',
    response: WidgetExportPDFResponseSchema
  }),

  processTranscriptV2: defineContract({
    method: 'post',
    path: '/api/widgets/transcript/engine/v2/:language',
    tags: ['Widgets'],
    summary: 'Analyse a course list for the signed-in staff user',
    params: z.object({ language: z.string().min(1) }),
    // `courses` and `requirementIds` are forwarded to the analyser API
    // gateway as JSON strings without being read here, so they stay unknown.
    body: z.object({
      courses: z.unknown(),
      requirementIds: z.unknown(),
      factor: z.unknown().optional()
    }),
    response: WidgetTranscriptResponseSchema
  }),

  downloadAnalysedJson: defineContract({
    method: 'get',
    path: '/api/widgets/transcript/v2/:adminId',
    tags: ['Widgets'],
    summary: 'Download the analysed transcript JSON for a staff user',
    params: z.object({ adminId: z.string().min(1) }),
    response: WidgetDownloadJsonResponseSchema
  })
};
