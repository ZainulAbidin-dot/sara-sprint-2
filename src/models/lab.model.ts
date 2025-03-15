import mongoose, { Document, Schema } from 'mongoose';

export interface ILab extends Document {
  labName: string;
  testType: string;
  bookingDateTime: Date;
  doctor: mongoose.Types.ObjectId;
  patient: mongoose.Types.ObjectId;
}

const LabSchema = new Schema<ILab>(
  {
    labName: { type: String, required: true },
    testType: { type: String, required: true },
    bookingDateTime: { type: Date, required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const LabModel = mongoose.model<ILab>('Lab', LabSchema);
