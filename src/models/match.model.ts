import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Match document
export interface IMatch extends Document {
  user1: mongoose.Types.ObjectId;
  user2: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// Create the schema
const matchSchema = new Schema<IMatch>(
  {
    user1: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    user2: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
export const MatchModel = mongoose.model<IMatch>('Match', matchSchema);
