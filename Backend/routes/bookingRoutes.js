import express from "express";
import {
  createBooking,
  getUserBookings,
  cancelBooking,
  getRoomBookings
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/room/:roomId", getRoomBookings);
router.get("/user/:userId", getUserBookings);
router.put("/cancel/:id", cancelBooking);

export default router;
