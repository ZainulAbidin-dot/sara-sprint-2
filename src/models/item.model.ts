import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
    itemName: string;
    description: string;
    yearsOfUse: number;
    warranty?: boolean;
    defects?: string;
    pointOfContact: mongoose.Types.ObjectId;
  }
  
  const ItemSchema = new Schema<IItem>({
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    yearsOfUse: { type: Number, required: true },
    warranty: { type: Boolean, default: false },
    defects: { type: String },
    pointOfContact: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  }, { timestamps: true });
  
  export default mongoose.model<IItem>("Item", ItemSchema);
  