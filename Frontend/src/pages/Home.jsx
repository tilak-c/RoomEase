import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Home() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await API.get("/rooms");
      setRooms(data);
    };

    fetchRooms();
  }, []);

  return (
    <div className="container">
      <h1 style={{ marginBottom: "30px" }}>Available Rooms</h1>

      <div className="room-grid">
        {rooms.map((room) => (
          <div key={room._id} className="room-card">
            <img src={room.image} alt={room.type} />

          <div className="room-card-content">
  <h3>{room.type}</h3>

  <div className="card-footer">
    <p className="price">₹ {room.price} / night</p>
    <Link to={`/room/${room._id}`} className="button">
      View Details
    </Link>
  </div>
</div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
