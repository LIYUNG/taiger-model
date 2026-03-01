import type { ApiResponse, SuccessResponse } from './common';
import type {
  IStudentResponse,
  IBasedocumentationslinkWithId
} from './serialized';

/** GET /api/students, GET /api/students/v3 */
export type GetStudentsResponse = ApiResponse<IStudentResponse[]>;

/** GET /api/students/active */
export type GetActiveStudentsResponse = ApiResponse<IStudentResponse[]>;

/** GET /api/students/:studentId */
export type GetStudentResponse = ApiResponse<IStudentResponse>;

/** GET /api/students/doc-links/:studentId */
export interface GetStudentDocLinksResponse {
  success: boolean;
  data?: IStudentResponse;
  basedocumentationlinks?: IBasedocumentationslinkWithId[];
}

/** GET /api/students/doc-links */
export type GetStudentsAndDocLinksResponse = ApiResponse<IStudentResponse[]>;

/** POST /api/students/archiv/:studentId */
export type UpdateArchivStudentsResponse = ApiResponse<IStudentResponse>;

/** POST /api/students/:studentId/agents */
export type UpdateStudentAgentsResponse = ApiResponse<IStudentResponse>;

/** POST /api/students/:studentId/editors */
export type UpdateStudentEditorsResponse = ApiResponse<IStudentResponse>;

/** POST /api/students/:studentId/attributes */
export type UpdateStudentAttributesResponse = ApiResponse<IStudentResponse>;

/** POST /api/students/doc-links */
export type UpdateDocumentationHelperLinkResponse = SuccessResponse;

/** POST /api/students/:studentId/files/:category */
export type UploadStudentFileResponse = ApiResponse<IStudentResponse>;

/** DELETE /api/students/:studentId/files/:category */
export type DeleteStudentFileResponse = SuccessResponse;

/** POST /api/students/:studentId/vpd/:applicationId/:fileType */
export type UploadVPDFileResponse = ApiResponse<IStudentResponse>;

/** DELETE /api/students/:studentId/vpd/:applicationId/:fileType */
export type DeleteVPDFileResponse = SuccessResponse;

/** PUT /api/students/:studentId/vpd/:applicationId/VPD */
export type SetAsNotNeededResponse = ApiResponse<IStudentResponse>;

/** POST /api/students/:studentId/vpd/:applicationId/payments */
export type SetUniAssistPaidResponse = ApiResponse<IStudentResponse>;

/** POST /api/students/:studentId/:category/status */
export type UpdateProfileDocStatusResponse = ApiResponse<IStudentResponse>;

/** GET /api/uniassist/:studentId */
export type GetStudentUniAssistResponse = ApiResponse<IStudentResponse>;
