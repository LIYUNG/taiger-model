import { Schema } from 'mongoose';

export interface ITenant {
  tenantId: string;
  domainName: string;
  updatedAt?: Date;
}

export const tenantsSchema = new Schema<ITenant>({
  tenantId: { type: String, require: true, unique: true },
  domainName: { type: String, require: true, unique: true },
  updatedAt: Date
});
