import mongoose, { Schema, Document } from "mongoose";

export interface IFeedback extends Document {
    user: mongoose.Types.ObjectId;
    email: string;
    name: string;
    comments: string;
  }
  
  const FeedbackSchema = new Schema<IFeedback>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    comments: { type: String, required: true }
  }, { timestamps: true });
  
  export default mongoose.model<IFeedback>("Feedback", FeedbackSchema);
  