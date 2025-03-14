import mongoose, { Schema, Document } from "mongoose";

export interface IPatientMedicalHistory extends Document {
    patient: mongoose.Types.ObjectId;
    allergies?: string[];
    height?: number;
    weight?: number;
    lifestyle?: string;
    diseases: {
      diseaseName: string;
      dateOfDiagnosis: Date;
      diseaseType?: string;
      familyHistory?: boolean;
    }[];
  }
  
  const PatientMedicalHistorySchema = new Schema<IPatientMedicalHistory>({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    allergies: [{ type: String }],
    height: { type: Number },
    weight: { type: Number },
    lifestyle: { type: String },
    diseases: [{
      diseaseName: { type: String, required: true },
      dateOfDiagnosis: { type: Date, required: true },
      diseaseType: { type: String },
      familyHistory: { type: Boolean }
    }]
  }, { timestamps: true });
  
  export default mongoose.model<IPatientMedicalHistory>("PatientMedicalHistory", PatientMedicalHistorySchema);
  