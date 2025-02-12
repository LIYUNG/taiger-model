import { Schema } from 'mongoose';

export const basedocumentationslinksSchema = new Schema({
  key: { type: String, default: '' },
  category: { type: String, default: 'general' },
  link: { type: String, default: '' },
  updatedAt: Date
});
