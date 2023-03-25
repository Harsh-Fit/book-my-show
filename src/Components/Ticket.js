import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function Ticket() {
  const [ticket, setTicket] = useState([]);
  const params = useParams();
  console.log(params);

  useEffect(() => {
    getTicket();
  }, []);

  const getTicket = async () => {
    const result = await fetch(
      `http://localhost:5000/ticket-details/${params.email}`
    );
    const data = await result.json();
    console.log("FINAL TICKET", data);
    setTicket(data);
  };

  return (
    <div>
      <div className="cards">
        {ticket.map((item, i) => (
          <Card
            style={{
              width: "23.5rem",
              border: "1px solid black",
              margin: "20px",
            }}
            key={i}
          >
            <Card.Img variant="top" src={item.poster} alt="ProductImg" />
            <Card.Body>
              <Card.Title>Movie - {item.movieName}</Card.Title>
              <Card.Text>
                Location - {item.location} - {item.theater}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                Screen No - 1 ( Time : {item.time} )
              </ListGroup.Item>

              <ListGroup.Item>
                Seat No -
                {item.bookedSeats.map((seat, i) => (
                  <ul
                    key={i}
                    style={{
                      float: "right",
                      listStyle: "none",
                      position: "relative",
                      left: "-90px",
                    }}
                  >
                    <li>{seat}</li>
                  </ul>
                ))}
                <img
                  className="book"
                  src="https://logos.textgiraffe.com/logos/logo-name/33420284-designstyle-labels-l.png"
                  alt="book"
                />
              </ListGroup.Item>
              <ListGroup.Item>Food : {item.food}</ListGroup.Item>
              <ListGroup.Item>Email Id : {item.userEmail}</ListGroup.Item>
              <ListGroup.Item>Booking Id : {item._id}</ListGroup.Item>
              <ListGroup.Item>
                Total Price : ( ₹ {item.totalPrice} )
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Ticket;
