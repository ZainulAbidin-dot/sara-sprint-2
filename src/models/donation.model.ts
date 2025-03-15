import mongoose, { Document, Schema } from 'mongoose';

export interface IItem extends Document {
  equipmentName: string;
  equipmentDescription: string;
  yearsOfUse: number;
  warrantyDetails: string;
  defects: string;
  pointOfContact: string;
  details: string;
  userId: mongoose.Types.ObjectId;
}

const DonationSchema = new Schema<IItem>(
  {
    equipmentName: { type: String, required: true },
    equipmentDescription: { type: String, required: true },
    yearsOfUse: { type: Number, required: true },
    warrantyDetails: { type: String },
    defects: { type: String },
    pointOfContact: { type: String },
    details: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const DonationModel = mongoose.model<IItem>('Item', DonationSchema);
