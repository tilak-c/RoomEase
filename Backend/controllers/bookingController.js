import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

export const createBooking = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut, userId } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const existingBooking = await Booking.findOne({
      room: roomId,
      status: "Confirmed",
      checkIn: { $lt: new Date(checkOut) },
      checkOut: { $gt: new Date(checkIn) }
    });

    if (existingBooking) {
      return res.status(400).json({ message: "Room already booked for selected dates" });
    }

    const days =
      (new Date(checkOut) - new Date(checkIn)) /
      (1000 * 60 * 60 * 24);

    const totalPrice = days * room.price;

    const booking = await Booking.create({
      user: userId,
      room: roomId,
      checkIn,
      checkOut,
      totalPrice
    });

    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate("room");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" },
      { new: true }
    );

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoomBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      room: req.params.roomId,
      status: "Confirmed"
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
