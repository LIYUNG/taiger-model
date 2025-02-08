import { Schema } from 'mongoose';

export const auditSchema = {
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
};
