import { Schema } from 'mongoose';

export interface ITemplate {
  name: string;
  category_name: string;
  path: string;
  updatedAt?: Date;
}

export const templatesSchema = new Schema<ITemplate>({
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
