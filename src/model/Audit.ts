import { Schema } from 'mongoose';
import { IUser } from './User';
import { IDocumentthread } from './Documentthread';
import { IInterview } from './Interview';

export interface IAudit {
  performedBy?: IUser | Schema.Types.ObjectId | string;
  targetUserId?: IUser | Schema.Types.ObjectId | string;
  targetDocumentThreadId?: IDocumentthread | Schema.Types.ObjectId | string;
  interviewThreadId?: IInterview | Schema.Types.ObjectId | string;
  action?: string;
  field?: string;
  changes?: { before?: Schema.Types.Mixed; after?: Schema.Types.Mixed };
}

export const auditSchema = new Schema<IAudit>(
  {
    performedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    targetUserId: { type: Schema.Types.ObjectId, ref: 'User' },
    targetDocumentThreadId: {
      type: Schema.Types.ObjectId,
      ref: 'Documentthread'
    },
    interviewThreadId: {
      type: Schema.Types.ObjectId,
      ref: 'Interview'
    },
    action: String, // 'create', 'update', etc.
    field: String, // Field that was updated
    changes: {
      before: Schema.Types.Mixed,
      after: Schema.Types.Mixed
    }
  },
  { timestamps: true }
);
