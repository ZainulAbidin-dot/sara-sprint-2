import mongoose, { Document, Schema } from 'mongoose';

export interface IPatient extends Document {
  user: mongoose.Schema.Types.ObjectId;
  allergies: string;
  height: number;
  weight: number;
  lifestyle: string;
  idVerification?: string;
  emergencyContact: {
    name: string;
    relation: string;
    phoneNumber: string;
  };
  medicalHistory?: any;
}

const PatientSchema = new Schema<IPatient>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    allergies: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    lifestyle: { type: String, required: true },
    idVerification: { type: String },
    emergencyContact: {
      name: { type: String, required: true },
      relation: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const PatientModel = mongoose.model<IPatient>('Patient', PatientSchema);
