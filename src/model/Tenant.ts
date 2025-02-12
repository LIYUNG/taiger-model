import { Schema } from 'mongoose';

export const tenantsSchema = new Schema({
  tenantId: { type: String, require: true, unique: true },
  domainName: { type: String, require: true, unique: true },
  updatedAt: Date
});
