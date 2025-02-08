import { Schema } from 'mongoose';
import { TicketStatus } from '../constants';

export const complaintSchema = {
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
      validator: function (value: string): boolean {
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
      validator: function (value: string): boolean {
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
};
