import { Schema } from 'mongoose';

export interface INote {
  student_id?: Schema.Types.ObjectId;
  notes?: string;
  updatedAt?: Date;
}

export const notesSchema = new Schema<INote>({
  student_id: { type: Schema.Types.ObjectId, ref: 'User' },
  notes: { type: String, default: '' },
  updatedAt: Date
});
