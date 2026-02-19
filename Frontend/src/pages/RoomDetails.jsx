import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookedDates, setBookedDates] = useState([]);
  const [availabilityError, setAvailabilityError] = useState("");
  const [success, setSuccess] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await API.get(`/rooms/${id}`);
        setRoom(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoom();
  }, [id]);

  useEffect(() => {
    if (showModal) {
      const fetchBookings = async () => {
        try {
          const { data } = await API.get(`/bookings/room/${id}`);
          setBookedDates(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchBookings();
    }
  }, [showModal, id]);

  let total = 0;
  let nights = 0;

  if (checkIn && checkOut && room?.price) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end - start;
    nights = diff / (1000 * 60 * 60 * 24);
    if (nights > 0) total = nights * room.price;
  }

  const checkAvailability = () => {
    if (!checkIn || !checkOut) return false;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    for (let booking of bookedDates) {
      const bookedStart = new Date(booking.checkIn);
      const bookedEnd = new Date(booking.checkOut);

      if (start < bookedEnd && end > bookedStart) {
        setAvailabilityError("Room unavailable for selected dates");
        return false;
      }
    }

    setAvailabilityError("");
    return true;
  };

  const handleBooking = async () => {
  if (!user) {
    navigate("/login");
    return;
  }

  if (!checkAvailability()) return;

  try {
    await API.post("/bookings", {
      roomId: id,
      checkIn,
      checkOut,
      userId: user._id
    });

    setSuccess(true);
    toast.success("Booking Confirmed");

    setTimeout(() => {
      setShowModal(false);
      setCheckIn("");
      setCheckOut("");
      setSuccess(false);
      navigate("/my-bookings");
    }, 1200);

  } catch (error) {
    console.error(error);
    toast.error("Room unavailable for selected dates");
  }
};


  if (!room) return <p className="container">Loading...</p>;

  return (
    <div className="container room-details">

      <img
        src={room.image}
        alt={room.type}
        className="details-image"
      />

      <h2>{room.type}</h2>
      <p>{room.description}</p>

      <h3 className="price">
        ₹ {room.price} per night
      </h3>

      <div className="details-footer">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <button
          className="book-btn"
          onClick={() => setShowModal(true)}
        >
          Book This Room
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">

            <h3>Book {room.type}</h3>

            <label>Check In</label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={checkIn}
              onChange={(e) => {
                const selected = e.target.value;
                setCheckIn(selected);
                if (checkOut && checkOut <= selected) {
                  setCheckOut("");
                }
              }}
            />

            <label>Check Out</label>
            <input
              type="date"
              min={
                checkIn
                  ? new Date(new Date(checkIn).getTime() + 86400000)
                      .toISOString()
                      .split("T")[0]
                  : new Date().toISOString().split("T")[0]
              }
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />

            {availabilityError && (
              <p style={{ color: "red", marginTop: "10px" }}>
                {availabilityError}
              </p>
            )}

            {nights > 0 && (
              <p style={{ marginTop: "10px" }}>
                Nights: {nights}
              </p>
            )}

            <p className="total-price">
              Total: ₹ {total}
            </p>

            {success && (
              <p style={{ color: "#16a34a", marginTop: "10px" }}>
                ✓ Booking Confirmed
              </p>
            )}

         <div className="modal-buttons">
  <button
    className="cancel-btn"
    onClick={() => setShowModal(false)}
  >
    Cancel
  </button>

  <button
    className="confirm-btn"
    onClick={handleBooking}
    disabled={!checkIn || !checkOut || total <= 0}
  >
    Confirm Booking
  </button>
</div>


          </div>
        </div>
      )}

    </div>
  );
}

export default RoomDetails;
