import React, { useEffect, useState } from "react";
import "./atm.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ATMcard = () => {
  const [cardNo, setCardNo] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [movieName, setMovieName] = useState("");
  const [poster, setPoster] = useState("");
  const [location, setlocation] = useState("");
  const [theater, setTheater] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [food, setFood] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("booking");
    const data = JSON.parse(auth);
    setTotalPrice(data.totalPrice);
    setFood(data.food.slice(0, -6));
    setBookedSeats(data.bookedSeats);
    setTime(data.time);
    setPoster(data.poster);
    setlocation(data.location);
    setTheater(data.theater);
    setMovieName(data.movieName);
    setUserName(data.userName);
    setUserEmail(data.userEmail);
    setPrice(data.price);
  }, []);

  const numChangeHandler = (e) => {
    const num = e.target.value;
    if (num.length <= 16) {
      setCardNo(num);
    }
  };

  const nameChangeHandler = (e) => {
    setCardHolder(e.target.value);
  };

  const dateChangeHandler = (e) => {
    setExpDate(e.target.value);
  };

  const cvvChangeHandler = (e) => {
    const num = e.target.value;
    if (num.length <= 3) {
      setCvv(num);
    }
  };

  // Submit handler and validation.

  const handleSubmit = async (email) => {
    if (cardNo && cardHolder && expDate && cvv) {
      alert("Tickets Booked Successfully !!!");
      let result = await fetch("http://localhost:5000/ticket", {
        method: "POST",
        body: JSON.stringify({
          totalPrice,
          price,
          userName,
          userEmail,
          movieName,
          poster,
          location,
          theater,
          bookedSeats,
          time,
          food,
          cardHolder,
          cardNo,
          expDate,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();

      navigate(`/ticket-details/${email}`);

      console.log(result);
      // Clearing the state
      setCardNo("");
      setCardHolder("");
      setExpDate("");
      setCvv("");
    } else {
      alert("Please enter card details !!!");
    }
  };

  const convert = (number) => {
    let str = number.toString();
    let temp = "";
    for (let i = 0; i < str.length; i++) {
      if (i === 4 || i === 8 || i === 12) {
        temp = temp + "-" + str[i];
      } else {
        temp = temp + str[i];
      }
    }
    return temp;
  };

  const displayNumber = convert(cardNo);

  return (
    <div className="atm">
      <h4> DEBIT CARD DETAILS </h4>
      <div className="atmcard">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img
                src={
                  "https://uploads.codesandbox.io/uploads/user/dc02524d-7cb1-43f5-89ae-e35176baf665/3mq1-AtmFront.png"
                }
                alt="Avatar"
              />
              <h5 className="number">{displayNumber}</h5>
              <h5 className="date">{expDate}</h5>
              <h5 className="name">{cardHolder}</h5>
            </div>
            <div className="flip-card-back">
              <img
                src={
                  "https://uploads.codesandbox.io/uploads/user/dc02524d-7cb1-43f5-89ae-e35176baf665/J98u-AtmBack.jpeg"
                }
                alt="Avatar"
              />
              <h5 className="cvv">{cvv}</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="details-container">
        {/* <div className="detail-items"> */}
        <h3> Enter Your Card Details </h3>
        <input
          className="numInput"
          name="numInput"
          type="number"
          value={cardNo}
          placeholder="Enter Atm Card Number"
          onChange={numChangeHandler}
        />

        <input
          className="nameInput"
          name="nameInput"
          type="text"
          value={cardHolder}
          placeholder="Enter Name"
          maxLength="20"
          onChange={nameChangeHandler}
        />

        <input
          className="dateInput"
          name="dateInput"
          type="text"
          value={expDate}
          placeholder="Expiry eg. 01/28"
          maxLength="5"
          onChange={dateChangeHandler}
        />

        <input
          className="cvvInput"
          name="cvvInput"
          type="number"
          value={cvv}
          placeholder="Enter CVV"
          maxLength="3"
          onChange={cvvChangeHandler}
        />

        <Button variant="danger" onClick={() => handleSubmit(userEmail)}>
          PAY NOW ( ₹ {totalPrice} )
        </Button>
      </div>
    </div>
  );
};

export default ATMcard;
