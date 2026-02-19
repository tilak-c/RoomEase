import { useEffect, useState } from "react";
import API from "../services/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalBookings: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const rooms = await API.get("/rooms");
        const bookings = await API.get("/bookings");

        const totalRevenue = bookings.data.reduce(
          (sum, b) => sum + b.totalPrice,
          0
        );

        setStats({
          totalRooms: rooms.data.length,
          totalBookings: bookings.data.length,
          totalRevenue
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  const data = {
    labels: ["Rooms", "Bookings", "Revenue"],
    datasets: [
      {
        label: "Hotel Stats",
        data: [
          stats.totalRooms,
          stats.totalBookings,
          stats.totalRevenue
        ],
        backgroundColor: "#d4af37"
      }
    ]
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: "30px", color: "#d4af37" }}>
        Admin Dashboard
      </h2>

      <Bar data={data} />
    </div>
  );
}

export default AdminDashboard;
