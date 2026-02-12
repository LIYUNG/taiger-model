import { Schema } from 'mongoose';
import { IUser } from './User';

export interface IAllCourse {
  updatedBy: IUser | Schema.Types.ObjectId | string;
  all_course_chinese: string;
  all_course_english: string;
  description: string;
}

export const allCourseSchema = new Schema<IAllCourse>(
  {
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    all_course_chinese: { type: String, required: true },
    all_course_english: { type: String, required: true },
    description: { type: String, maxlength: 2000 }
  },
  { timestamps: true }
);
