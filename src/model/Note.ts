import { Schema } from 'mongoose';

export const notesSchema = new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: 'User' },
  notes: { type: String, default: '' },
  updatedAt: Date
});
