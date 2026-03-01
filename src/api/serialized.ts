/**
 * Serialized "API layer" versions of core model interfaces.
 * All ObjectId refs become strings to match JSON API serialization.
 */

import type {
  IStudent,
  IUserGeneraldocsThread,
  IUserAcademicBackgroundUniversity,
  IUserAcademicBackgroundLanguage,
  IUserApplicationPreference,
  IUserAttribute,
  IUserNotification,
  IUserTaigerai,
  IUserProfileItem
} from '../model/User';
import type { IProgram } from '../model/Program';
import type { IApplication } from '../model/Application';
import type { ICourse } from '../model/Course';
import type { IDocumentthread } from '../model/Documentthread';
import type { ICommunication } from '../model/Communication';
import type { IInterview } from '../model/Interview';
import type { IInterviewSurveyResponse } from '../model/InterviewSurveyResponse';
import type { ITicket } from '../model/Ticket';
import type { IComplaint } from '../model/Complaint';
import type { IAudit } from '../model/Audit';
import type { IEvent } from '../model/Event';
import type { INote } from '../model/Note';
import type { IPermission } from '../model/Permission';
import type { IDocumentation } from '../model/Documentation';
import type { IDocspage } from '../model/Docspage';
import type { IInternaldoc } from '../model/Internaldoc';
import type { IProgramrequirement } from '../model/Programrequirement';
import type { IAllCourse } from '../model/Allcourse';
import type { IKeywordset } from '../model/Keywordset';
import type { ISurveyInput } from '../model/SurveyInput';
import type { ITemplate } from '../model/Template';
import type { IBasedocumentationslink } from '../model/Basedocumentationslink';

// Re-export referenced types for convenience
export type {
  IUserAcademicBackgroundUniversity,
  IUserAcademicBackgroundLanguage,
  IUserApplicationPreference,
  IUserAttribute,
  IUserNotification,
  IUserTaigerai,
  IUserProfileItem,
  IUserGeneraldocsThread
};

/** Frontend-friendly User/Student with string _id (no nested ObjectId refs) */
export interface IUserWithId
  extends Omit<IStudent, 'agents' | 'editors' | 'profile'> {
  _id: string;
  courses?: ICourse;
}

/** Frontend-friendly Program with string _id */
export interface IProgramWithId extends Omit<IProgram, 'vcId'> {
  _id: string;
  vcId?: string;
}

/** Frontend-friendly Application with string _id */
export interface IApplicationWithId extends IApplication {
  _id: string;
}

/** Student as returned by the API with populated agents, editors, applications */
export interface IStudentResponse extends IStudent {
  applying_program_count?: number;
  applications?: IApplicationWithId[];
  agents?: IUserWithId[];
  editors?: IUserWithId[];
  generaldocs_threads?: IUserGeneraldocsThread[];
}

/** Document thread with string _id */
export interface IDocumentthreadWithId extends IDocumentthread {
  _id: string;
}

/** Communication message with string _id */
export interface ICommunicationWithId extends ICommunication {
  _id: string;
}

/** Interview with string _id */
export interface IInterviewWithId extends IInterview {
  _id: string;
}

/** Interview survey response with string _id */
export interface IInterviewSurveyResponseWithId
  extends IInterviewSurveyResponse {
  _id: string;
}

/** Ticket with string _id */
export interface ITicketWithId extends ITicket {
  _id: string;
  createdAt?: Date;
}

/** Complaint with string _id */
export interface IComplaintWithId extends IComplaint {
  _id: string;
  createdAt?: Date;
}

/** Audit record with string _id */
export interface IAuditWithId extends IAudit {
  _id: string;
  createdAt?: Date;
}

/** Event with string _id */
export interface IEventWithId extends IEvent {
  _id: string;
  createdAt?: Date;
}

/** Note with string _id */
export interface INoteWithId extends INote {
  _id: string;
}

/** Permission record with string _id */
export interface IPermissionWithId extends IPermission {
  _id: string;
}

/** Documentation article with string _id */
export interface IDocumentationWithId extends IDocumentation {
  _id: string;
}

/** Docs page with string _id */
export interface IDocspageWithId extends IDocspage {
  _id: string;
}

/** Internal doc with string _id */
export interface IInternaldocWithId extends IInternaldoc {
  _id: string;
}

/** Program requirement with string _id */
export interface IProgramrequirementWithId extends IProgramrequirement {
  _id: string;
}

/** All-course entry with string _id */
export interface IAllCourseWithId extends IAllCourse {
  _id: string;
}

/** Keyword set with string _id */
export interface IKeywordsetWithId extends IKeywordset {
  _id: string;
}

/** Survey input with string _id */
export interface ISurveyInputWithId extends ISurveyInput {
  _id: string;
}

/** Template with string _id */
export interface ITemplateWithId extends ITemplate {
  _id: string;
}

/** Base documentation link with string _id */
export interface IBasedocumentationslinkWithId
  extends IBasedocumentationslink {
  _id: string;
}
