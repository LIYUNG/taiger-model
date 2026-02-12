import { Schema } from 'mongoose';
import { IStudent } from './User';

export interface INote {
  student_id?: IStudent | Schema.Types.ObjectId | string;
  notes?: string;
  updatedAt?: Date;
}

export const notesSchema = new Schema<INote>({
  student_id: { type: Schema.Types.ObjectId, ref: 'User' },
  notes: { type: String, default: '' },
  updatedAt: Date
});
