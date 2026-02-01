import { Schema } from 'mongoose';

export interface ICourseAnalysis {
  path?: string;
  analyzed_course?: string[];
  isAnalysed?: boolean;
  isAnalysedV2?: boolean;
  pathV2?: string;
  updatedAtV2?: Date;
  updatedAt?: Date;
}

export interface ICourse {
  student_id?: Schema.Types.ObjectId;
  name?: string;
  table_data_string?: string;
  table_data_string_locked?: boolean;
  table_data_string_taiger_guided?: string;
  updatedAt?: Date;
  analysis?: ICourseAnalysis;
}

export const coursesSchema = new Schema<ICourse>({
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
});
