import mongoose, { Document, Schema } from 'mongoose';

export interface ITrial extends Document {
  conductedBy: mongoose.Types.ObjectId;
  trialDescription: string;
  trialRequirements: string;
  duration: number;
  riskLevel: 'low' | 'medium' | 'high';
}

const TrialSchema = new Schema<ITrial>(
  {
    conductedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    trialDescription: { type: String, required: true },
    trialRequirements: { type: String, required: true },
    duration: { type: Number, required: true },
    riskLevel: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high'],
    },
  },
  { timestamps: true }
);

export const TrialModel = mongoose.model<ITrial>('Trial', TrialSchema);
