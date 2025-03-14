import mongoose, { Schema, Document } from "mongoose";

export interface ILab extends Document {
    labName: string;
    testType: string;
  }
  
  const LabSchema = new Schema<ILab>({
    labName: { type: String, required: true },
    testType: { type: String, required: true }
  }, { timestamps: true });
  
  export default mongoose.model<ILab>("Lab", LabSchema);
  