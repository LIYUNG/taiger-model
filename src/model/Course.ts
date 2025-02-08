import { Schema } from 'mongoose';

export const coursesSchema = {
  student_id: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, default: '' },
  table_data_string: { type: String, default: '' },
  table_data_string_locked: { type: Boolean, default: false },
  table_data_string_taiger_guided: {
    type: String,
    default:
      '[{"course_chinese":"","course_english":"","credits":"0","grades":""}]'
  },
  updatedAt: Date,
  analysis: {
    path: { type: String, default: '' },
    analyzed_course: [{ type: String, default: '' }],
    isAnalysed: { type: Boolean, default: false },
    isAnalysedV2: { type: Boolean, default: false },
    pathV2: { type: String, default: '' },
    updatedAtV2: Date,
    updatedAt: Date
  }
};
