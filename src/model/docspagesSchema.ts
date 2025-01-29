import { Schema, Document } from 'mongoose';

export interface IDocspages extends Document {
  name: string;
  title: string;
  category: string;
  prop: string;
  author: string;
  text: string;
  country: string;
  updatedAt: Date;
}

export const docspagesSchema = new Schema<IDocspages>({
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  category: { type: String, default: '' },
  prop: { type: String, default: '' },
  author: { type: String, default: '' },
  text: { type: String, default: '' },
  country: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now }
});
