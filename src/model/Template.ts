import { Schema } from 'mongoose';

export const templatesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category_name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  updatedAt: Date
});
