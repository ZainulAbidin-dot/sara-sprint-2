import mongoose, { Document, Schema } from 'mongoose';

export interface IDiseaseType extends Document {
  name: string;
  type: string;
}

const DiseaseTypeSchema = new Schema<IDiseaseType>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

export const DiseaseTypeModel = mongoose.model<IDiseaseType>(
  'DiseaseType',
  DiseaseTypeSchema
);
