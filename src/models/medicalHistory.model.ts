import mongoose, { Document, Schema } from 'mongoose';

export interface IPatientMedicalHistory extends Document {
  patient: mongoose.Types.ObjectId;
  medicalHistory?: string;
  disease: mongoose.Types.ObjectId;
  medicinalHistory?: string;
  familyHistory?: string;
  currentExperiencedSymptoms?: string;
}

const PatientMedicalHistorySchema = new Schema<IPatientMedicalHistory>(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    medicalHistory: { type: String },
    disease: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DiseaseType',
      required: true,
    },
    medicinalHistory: { type: String },
    familyHistory: { type: String },
    currentExperiencedSymptoms: { type: String },
  },
  { timestamps: true }
);

export const PatientMedicalHistoryModel =
  mongoose.model<IPatientMedicalHistory>(
    'PatientMedicalHistory',
    PatientMedicalHistorySchema
  );
