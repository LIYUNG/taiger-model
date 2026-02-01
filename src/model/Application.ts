import { Schema } from 'mongoose';

export interface IApplicationUniAssist {
  status?: string;
  vpd_file_path?: string;
  vpd_paid_confirmation_file_path?: string;
  vpd_paid_confirmation_file_status?: string;
  isPaid?: boolean;
  updatedAt?: Date;
}

export interface IApplicationPortalCredentials {
  application_portal_a?: { account?: string; password?: string };
  application_portal_b?: { account?: string; password?: string };
}

export interface IApplicationDocModificationThreadItem {
  isFinalVersion?: boolean;
  latest_message_left_by_id?: string;
  doc_thread_id?: Schema.Types.ObjectId;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IApplicationAdmissionLetter {
  status?: string;
  admission_file_path?: string;
  comments?: string;
  updatedAt?: Date;
}

export interface IApplication {
  programId?: Schema.Types.ObjectId;
  studentId?: Schema.Types.ObjectId;
  uni_assist?: IApplicationUniAssist;
  portal_credentials?: IApplicationPortalCredentials;
  doc_modification_thread?: IApplicationDocModificationThreadItem[];
  reject_reason?: string;
  admission_letter?: IApplicationAdmissionLetter;
  finalEnrolment?: boolean;
  decided?: string;
  closed?: string;
  admission?: string;
  application_year?: string;
}

export const applicationSchema = new Schema<IApplication>({
  programId: { type: Schema.Types.ObjectId, ref: 'Program' },
  studentId: { type: Schema.Types.ObjectId, ref: 'User' },
  uni_assist: {
    status: {
      type: String,
      default: 'notstarted'
    },
    vpd_file_path: {
      type: String,
      default: ''
    },
    vpd_paid_confirmation_file_path: {
      type: String,
      default: ''
    },
    vpd_paid_confirmation_file_status: {
      type: String,
      default: ''
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    updatedAt: Date
  },
  portal_credentials: {
    application_portal_a: {
      account: { type: String, select: false, trim: true },
      password: { type: String, select: false, trim: true }
    },
    application_portal_b: {
      account: { type: String, select: false, trim: true },
      password: { type: String, select: false, trim: true }
    }
  },
  doc_modification_thread: [
    {
      isFinalVersion: {
        type: Boolean,
        default: false
      },
      latest_message_left_by_id: {
        type: String,
        default: ''
      },
      doc_thread_id: { type: Schema.Types.ObjectId, ref: 'Documentthread' },
      updatedAt: Date,
      createdAt: Date
    }
  ],
  reject_reason: {
    type: String,
    default: ''
  },
  admission_letter: {
    status: {
      type: String,
      default: 'notstarted'
    },
    admission_file_path: {
      type: String,
      default: ''
    },
    comments: { type: String, default: '' },
    updatedAt: Date
  },
  finalEnrolment: { type: Boolean, default: false },
  decided: { type: String, default: '-' },
  closed: { type: String, default: '-' },
  admission: { type: String, default: '-' },
  application_year: { type: String, default: '' },
  isLocked: { type: Boolean, default: false }
});