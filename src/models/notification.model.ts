import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  user: mongoose.Schema.Types.ObjectId;
  message: string;
  eventType:
    | 'chat'
    | 'lab-appointment'
    | 'match-request'
    | 'match-accept'
    | 'match-reject';
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      enum: [
        'chat',
        'lab-appointment',
        'match-request',
        'match-accept',
        'match-reject',
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export const NotificationModel = mongoose.model<INotification>(
  'Notification',
  notificationSchema
);
