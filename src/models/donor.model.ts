import mongoose, { Schema, Document } from "mongoose";

export interface IDonorAcquirer extends Document {
    user: mongoose.Types.ObjectId;
    itemGiven?: boolean;
    donationDate?: Date;
  }
  
  const DonorAcquirerSchema = new Schema<IDonorAcquirer>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    itemGiven: { type: Boolean, default: false },
    donationDate: { type: Date }
  }, { timestamps: true });
  
  export default mongoose.model<IDonorAcquirer>("DonorAcquirer", DonorAcquirerSchema);
  