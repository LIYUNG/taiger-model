import { Schema } from 'mongoose';
import { TicketStatus } from '../constants';

export interface IComplaintMessageFile {
  name: string;
  path: string;
}

export interface IComplaintMessage {
  user_id?: Schema.Types.ObjectId;
  message?: string;
  createdAt?: Date;
  file?: IComplaintMessageFile[];
  ignore_message?: boolean;
}

export interface IComplaint {
  requester_id: Schema.Types.ObjectId;
  status?: string;
  title?: string;
  category?: string;
  description?: string;
  messages?: IComplaintMessage[];
  createdAt?: Date;
}

export const complaintSchema = new Schema<IComplaint>(
  {
    requester_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    status: {
      type: String,
      enum: Object.values(TicketStatus),
      default: 'open'
    },
    title: {
      type: String,
      default: '',
      validate: {
        validator: function (value: string | unknown[]) {
          // Maximum allowed length
          return value.length <= 200;
        },
        message:
          'Description exceeds the maximum allowed length of 3000 characters'
      }
    },
    category: {
      type: String,
      default: 'others'
    },
    description: {
      type: String,
      default: '',
      validate: {
        validator: function (value: string | unknown[]) {
          // Maximum allowed length
          return value.length <= 3000;
        },
        message:
          'Description exceeds the maximum allowed length of 3000 characters'
      }
    },
    messages: [
      {
        user_id: { type: Schema.Types.ObjectId, ref: 'User' },
        message: {
          type: String,
          default: ''
        },
        createdAt: Date,
        file: [
          {
            name: {
              type: String,
              required: true
            },
            path: {
              type: String,
              required: true
            }
          }
        ],
        ignore_message: Boolean
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);
