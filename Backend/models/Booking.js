import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
{
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  checkIn: { type: Date },
  checkOut: { type: Date },
  totalPrice: { type: Number },
  status: { type: String, default: "Confirmed" }
},
{ timestamps: true }
);

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;