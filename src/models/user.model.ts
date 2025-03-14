import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  gender?: string;
  nationality?: string;
  userType: "Patient" | "Doctor" | "Donor" | "Acquirer";
  phoneNumbers?: string[];
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String },
  nationality: { type: String },
  userType: { type: String, enum: ["Patient", "Doctor", "Donor", "Acquirer"], required: true },
  phoneNumbers: [{ type: String }]
}, { timestamps: true });

export default mongoose.model<IUser>("User", UserSchema);
