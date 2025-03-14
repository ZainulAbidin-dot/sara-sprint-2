import mongoose, { Schema, Document } from "mongoose";

export interface ITrial extends Document {
    trialDescription: string;
    conductedBy: mongoose.Types.ObjectId;
    duration: number;
    status: string;
    riskLevel?: string;
  }
  
  const TrialSchema = new Schema<ITrial>({
    trialDescription: { type: String, required: true },
    conductedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    duration: { type: Number, required: true },
    status: { type: String, required: true, enum: ["Pending", "Ongoing", "Completed"] },
    riskLevel: { type: String }
  }, { timestamps: true });
  
  export default mongoose.model<ITrial>("Trial", TrialSchema);
  