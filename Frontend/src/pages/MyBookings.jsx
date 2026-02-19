import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const { data } = await API.get(
          `/bookings/user/${user._id}`
        );
        setBookings(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container">
      <h2 className="bookings-title">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <div className="empty-bookings">
          <p>No bookings yet.</p>
        </div>
      ) : (
        <div className="booking-grid">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">

              <img
                src={booking.room?.image}
                alt={booking.room?.type}
                className="booking-image"
              />

              <div className="booking-content">
                <h3>{booking.room?.type}</h3>

                <p>
                  <strong>Check In:</strong>{" "}
                  {new Date(booking.checkIn).toDateString()}
                </p>

                <p>
                  <strong>Check Out:</strong>{" "}
                  {new Date(booking.checkOut).toDateString()}
                </p>

                <p>
                  <strong>Total:</strong> ₹ {booking.totalPrice}
                </p>

                <span
                  className={`status-badge ${
                    booking.status === "Confirmed"
                      ? "confirmed"
                      : "cancelled"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
