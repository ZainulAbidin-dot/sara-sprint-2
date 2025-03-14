import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
    bookedBy: mongoose.Types.ObjectId;
    trial: mongoose.Types.ObjectId;
    bookingDateTime: Date;
  }
  
  const BookingSchema = new Schema<IBooking>({
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    trial: { type: mongoose.Schema.Types.ObjectId, ref: "Trial", required: true },
    bookingDateTime: { type: Date, required: true }
  }, { timestamps: true });
  
  export default mongoose.model<IBooking>("Booking", BookingSchema);
  