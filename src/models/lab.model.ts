import mongoose, { Document, Schema } from 'mongoose';

export interface ILab extends Document {
  labName: string;
  testType: string;
}

const LabSchema = new Schema<ILab>(
  {
    labName: { type: String, required: true },
    testType: { type: String, required: true },
  },
  { timestamps: true }
);

export const LabModel = mongoose.model<ILab>('Lab', LabSchema);
