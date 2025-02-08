import { Schema } from 'mongoose';

// Define an interface for your event document
export interface IEvent {
  requester_id: string[];
  receiver_id: string[];
  isConfirmedRequester: boolean;
  isConfirmedReceiver: boolean;
  meetingLink: string;
  event_type: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
}

export const EventSchema = {
  requester_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  receiver_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isConfirmedRequester: {
    type: Boolean,
    default: false
  },
  isConfirmedReceiver: {
    type: Boolean,
    default: false
  },
  meetingLink: {
    type: String,
    default: false
  },
  event_type: {
    type: String
  },
  title: {
    type: String
    // required: [true, 'Please write a title for your event']
  },
  description: {
    type: String,
    required: [true, 'Please write a description for your event'],
    validate: {
      validator: function (value: string): boolean {
        return value.length <= 2000; // Maximum allowed length
      },
      message:
        'Description exceeds the maximum allowed length of 500 characters'
    }
  },
  start: {
    type: Date,
  },
  end: {
    type: Date
    // setting a min function to accept any date one hour ahead of start
  }
};
