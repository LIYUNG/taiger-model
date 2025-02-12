import { Schema } from 'mongoose';

export const permissionSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    taigerAiQuota: {
      type: Number,
      default: 0
    },
    canAssignEditors: {
      type: Boolean,
      default: false
    },
    canUseTaiGerAI: {
      type: Boolean,
      default: false
    },
    canModifyProgramList: {
      type: Boolean,
      default: false
    },
    canModifyAllBaseDocuments: {
      type: Boolean,
      default: false
    },
    canAccessAllChat: {
      type: Boolean,
      default: false
    },
    canAssignAgents: {
      type: Boolean,
      default: false
    },
    canModifyDocumentation: {
      type: Boolean,
      default: false
    },
    canAccessStudentDatabase: {
      type: Boolean,
      default: false
    },
    isEssayWriters: {
      type: Boolean,
      default: false
    },
    updatedAt: Date
  },
  { timestamps: true }
);
