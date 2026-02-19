import {
  FaWifi,
  FaParking,
  FaPlane,
  FaUsers,
  FaBan,
  FaSwimmingPool,
  FaSpa,
  FaDumbbell
} from "react-icons/fa";

function About() {
  return (
    <div className="container">

      <h1 style={{ color: "#d4af37", marginBottom: "20px" }}>
        About RoomEase
      </h1>

      <p style={{ lineHeight: "1.8", marginBottom: "40px" }}>
        RoomEase is a premium luxury hotel experience designed for
        comfort, elegance, and world-class hospitality. 
        We blend timeless design with modern convenience to create
        unforgettable stays for our guests.
      </p>

      <h2 style={{ color: "#d4af37", marginBottom: "20px" }}>
        Our Facilities
      </h2>

      <div className="amenities-grid">
        <div className="amenity"><FaWifi /> Free Wifi</div>
        <div className="amenity"><FaParking /> Parking</div>
        <div className="amenity"><FaPlane /> Airport Shuttle</div>
        <div className="amenity"><FaUsers /> Family Rooms</div>
        <div className="amenity"><FaBan /> Non-Smoking Rooms</div>
        <div className="amenity"><FaSwimmingPool /> Outdoor Pool</div>
        <div className="amenity"><FaSpa /> Spa</div>
        <div className="amenity"><FaDumbbell /> Fitness Center</div>
      </div>

      <h2 style={{ color: "#d4af37", marginTop: "60px", marginBottom: "20px" }}>
        Why Choose Us
      </h2>

      <ul style={{ lineHeight: "2" }}>
        <li>24/7 Concierge Service</li>
        <li>Prime City Location</li>
        <li>Fine Dining & Rooftop Lounge</li>
        <li>Secure & Safe Environment</li>
        <li>Luxury Interiors & Comfort</li>
      </ul>

    </div>
  );
}

export default About;
