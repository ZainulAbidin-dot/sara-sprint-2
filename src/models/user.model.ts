import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  gender: 'male' | 'female';
  region: string;
  dateOfBirth: Date;
  phoneNumber: string;
  title: string;
  nationality: string;
  userType: 'patient' | 'doctor' | 'donorAcquirer';
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'] },
    region: { type: String, required: true },
    dateOfBirth: { type: Date },
    phoneNumber: { type: String, required: true },
    title: { type: String, required: true },
    nationality: { type: String, required: true },
    userType: {
      type: String,
      enum: ['patient', 'doctor', 'donorAcquirer'],
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);
