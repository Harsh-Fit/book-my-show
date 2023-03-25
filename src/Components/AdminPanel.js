import React, { useEffect, useState } from "react";

function AdminPanel() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTicketData();
  }, []);

  const getTicketData = async () => {
    const result = await fetch("http://localhost:5000/view-tickets");
    const data = await result.json();
    console.log(data);
    setData(data);
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>ADMIN PANEL</h1>
      <table>
        <tbody>
          <tr>
            <td>Sr.No</td>
            <td>Movie</td>
            <td>Theater</td>
            <td>Location</td>
            <td>User Name</td>
            <td>User Email</td>
            <td>Seat No.</td>
            <td>Show Timing</td>
            <td>Food</td>
            <td>Ticket Price</td>
          </tr>
          {data.map((user, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{user.movieName}</td>
              <td>{user.theater}</td>
              <td>{user.location}</td>
              <td>{user.userName}</td>
              <td>{user.userEmail}</td>
              <td>{user.bookedSeats}</td>
              <td>{user.time}</td>
              <td>{user.food}</td>
              <td>{user.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
