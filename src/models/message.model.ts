import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
    sender: mongoose.Types.ObjectId;
    recipient: mongoose.Types.ObjectId;
    content: string;
    date: Date;
  }
  
  const MessageSchema = new Schema<IMessage>({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }, { timestamps: true });
  
  export default mongoose.model<IMessage>("Message", MessageSchema);
  