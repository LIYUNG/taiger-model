import { Schema } from 'mongoose';

export interface IAudit {
  performedBy?: Schema.Types.ObjectId;
  targetUserId?: Schema.Types.ObjectId;
  targetDocumentThreadId?: Schema.Types.ObjectId;
  interviewThreadId?: Schema.Types.ObjectId;
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
