import { Schema } from 'mongoose';

export interface IInternaldoc {
  name?: string;
  title?: string;
  category?: string;
  internal?: boolean;
  author?: string;
  text?: string;
  country?: string;
  updatedAt?: Date;
}

export const internaldocsSchema = new Schema<IInternaldoc>({
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  category: { type: String, default: '' },
  internal: { type: Boolean, default: true },
  author: { type: String, default: '' },
  text: { type: String, default: '' },
  country: { type: String, default: '' },
  updatedAt: Date
});
