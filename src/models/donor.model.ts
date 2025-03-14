import mongoose, { Document, Schema } from 'mongoose';

export interface IDonorAcquirer extends Document {
  user: mongoose.Types.ObjectId;
  role: 'donor' | 'acquirer' | 'both';
}

const DonorAcquirerSchema = new Schema<IDonorAcquirer>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['donor', 'acquirer', 'both'], required: true },
  },
  { timestamps: true }
);

export const DonorAcquirerModel = mongoose.model<IDonorAcquirer>(
  'DonorAcquirer',
  DonorAcquirerSchema
);
