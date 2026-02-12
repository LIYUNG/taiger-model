import { Schema } from 'mongoose';
import { IUser } from './User';

export interface IEvent {
  requester_id?: IUser[] | Schema.Types.ObjectId[] | string[];
  receiver_id?: IUser[] | Schema.Types.ObjectId[] | string[];
  isConfirmedRequester?: boolean;
  isConfirmedReceiver?: boolean;
  meetingLink?: string;
  event_type?: string;
  title?: string;
  description?: string;
  start?: Date;
  end?: Date;
}

export const EventSchema = new Schema<IEvent>(
  {
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
        validator: function (value: string | unknown[]) {
          return value.length <= 2000; // Maximum allowed length
        },
        message:
          'Description exceeds the maximum allowed length of 500 characters'
      }
    },
    start: {
      type: Date,
      required: [true, 'Please Insert The Start of your event'],
      min: [new Date(), "time can't be before now!!"]
    },
    end: {
      type: Date,
      //setting a min function to accept any date one hour ahead of start
      // min: [
      //   function () {
      //     const date = new Date(this.start);
      //     const validDate = new Date(date.getTime() + 60000);
      //     return validDate;
      //   },
      //   'Event End must be at least one minute a head of event time'
      // ],
      // default: function () {
      //   const date = new Date(this.start);
      //   const validDate = new Date(date.getTime() + 60000 * 30);
      //   return validDate;
      // }
    }
  },
  { timestamps: true }
);
