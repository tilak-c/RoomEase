import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
{
  roomNumber: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String, required: true },
  isAvailable: { type: Boolean, default: true }
},
{ timestamps: true }
);

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default Room;