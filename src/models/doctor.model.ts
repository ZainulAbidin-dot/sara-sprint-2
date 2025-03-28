import mongoose, { Document, Schema } from 'mongoose';

export interface IDoctor extends Document {
  user: mongoose.Types.ObjectId;
  specialization: string;
  license: string;
  institute: string;
  pointOfContact: string;
}

const DoctorSchema = new Schema<IDoctor>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    specialization: { type: String, required: true },
    license: { type: String, required: true, unique: true },
    institute: { type: String, required: true },
    pointOfContact: { type: String, required: true },
  },
  { timestamps: true }
);

export const DoctorModel = mongoose.model<IDoctor>('Doctor', DoctorSchema);
