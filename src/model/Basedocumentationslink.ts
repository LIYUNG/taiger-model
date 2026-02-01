import { Schema } from 'mongoose';

export interface IBasedocumentationslink {
  key?: string;
  category?: string;
  link?: string;
  updatedAt?: Date;
}

export const basedocumentationslinksSchema = new Schema<IBasedocumentationslink>({
  key: { type: String, default: '' },
  category: { type: String, default: 'general' },
  link: { type: String, default: '' },
  updatedAt: Date
});
