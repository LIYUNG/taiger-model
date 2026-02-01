import { Schema } from 'mongoose';

export interface IDocumentation {
  name?: string;
  title?: string;
  category?: string;
  author?: string;
  prop?: string;
  text?: string;
  country?: string;
  updatedAt?: Date;
}

export const documentationsSchema = new Schema<IDocumentation>({
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  category: { type: String, default: '' },
  author: { type: String, default: '' },
  prop: { type: String, default: '' },
  text: { type: String, default: '' },
  country: { type: String, default: '' },
  updatedAt: Date
});
