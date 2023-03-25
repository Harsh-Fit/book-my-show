import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function ConfirmBooking() {
  const params = useParams();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [movieName, setMovieName] = useState("");
  const [poster, setPoster] = useState("");
  const [location, setlocation] = useState("");
  const [theater, setTheater] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [coupon, setCoupon] = useState("");
  const [food, setFood] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]);
  const [silver, setSilver] = useState([]);
  const [gold, setGold] = useState([]);
  const [platinum, setPlatinum] = useState([]);
  const [diamond, setDiamond] = useState([]);
  const [error, setError] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [alreadyBooked, setAlreadyBooked] = useState([]);
  const [checkUserEmail, setCheckUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getMovie();
  }, []);

  useEffect(() => {
    getTicketDetails();
    totalTicketPrice();
    let bookArr = [...silver, ...gold, ...platinum, ...diamond];
    console.log("Booking Array", bookArr);
    setBookedSeats([...bookArr]);
    const auth = localStorage.getItem("user");
    const data = JSON.parse(auth);
    setUserName(data.fname);
    setUserEmail(data.email);
  }, [
    silver,
    platinum,
    gold,
    diamond,
    food,
    price,
    location,
    theater,
    time,
    coupon,
  ]);

  const getMovie = async () => {
    // console.log(params);
    let result = await fetch(`http://localhost:5000/book/${params.id}`);
    result = await result.json();
    console.warn(result);
    setMovieName(result.movieName);
    setPoster(result.moviePoster);
  };

  console.log(movieName, location, theater, time, price, food);

  const bookSeatD = (e) => {
    if (diamond.indexOf(e.target.value) >= 0) {
      e.target.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
      // e.target.className = "grid-item";
      let found = diamond.indexOf(e.target.value);
      console.log(found);
      let update = diamond.filter((item, i, arr) => {
        return i !== found;
      });

      setDiamond(update);
      return;
    } else {
      e.target.style.backgroundColor = "orange";
      // e.target.className = "grid-item btn-active";
      // e.target.className = "grid-item disabled";

      setDiamond([...diamond, e.target.value]);
    }
    // console.log(e);
  };

  const bookSeatP = (e) => {
    if (platinum.indexOf(e.target.value) >= 0) {
      e.target.style.backgroundColor = "rgba(255, 255, 255, 0.8)";

      let found = platinum.indexOf(e.target.value);
      console.log(found);
      let update = platinum.filter((item, i, arr) => {
        return i !== found;
      });

      setPlatinum(update);
      return;
    } else {
      e.target.style.backgroundColor = "orange";

      setPlatinum([...platinum, e.target.value]);
    }
  };

  const bookSeatG = (e) => {
    if (gold.indexOf(e.target.value) >= 0) {
      e.target.style.backgroundColor = "rgba(255, 255, 255, 0.8)";

      let found = gold.indexOf(e.target.value);
      console.log(found);
      let update = gold.filter((item, i, arr) => {
        return i !== found;
      });

      setGold(update);
      return;
    } else {
      e.target.style.backgroundColor = "orange";
      setGold([...gold, e.target.value]);
    }
  };

  const bookSeatS = (e) => {
    if (silver.indexOf(e.target.value) >= 0) {
      e.target.style.backgroundColor = "rgba(255, 255, 255, 0.8)";

      let found = silver.indexOf(e.target.value);
      console.log(found);
      let update = silver.filter((item, i, arr) => {
        return i !== found;
      });

      setSilver(update);
      return;
    } else {
      e.target.style.backgroundColor = "orange";
      setSilver([...silver, e.target.value]);
    }
  };
  console.log(silver, gold, platinum, diamond);

  function totalTicketPrice() {
    let total =
      price * silver.length ||
      price * gold.length ||
      price * platinum.length ||
      price * diamond.length;
    const foodCost = food.slice(-3);
    console.log(foodCost);
    total = Number(total) + Number(foodCost);
    console.log("Total Price", total);

    if (coupon === "BOOKMYSHOW10") {
      setTotalPrice(total * 0.9);
    } else {
      setTotalPrice(total);
    }
  }

  const payNow = async (e) => {
    // console.log("Email", email, "Password", password);

    if (
      !userName ||
      !userEmail ||
      !movieName ||
      !poster ||
      !location ||
      !theater ||
      !bookedSeats ||
      bookedSeats.length > 4 ||
      !time ||
      !totalPrice
    ) {
      alert(
        "Please provide valid input & Max 4 seats can be booked at a time... "
      );
      setError(true);
      e.preventDefault();
    } else {
      let result = await fetch("http://localhost:5000/pay-now", {
        method: "POST",
        body: JSON.stringify({
          userName,
          userEmail,
          movieName,
          poster,
          location,
          theater,
          bookedSeats,
          time,
          food,
          price,
          totalPrice,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      console.warn("IMP", result);
      // if (result) {
      //   localStorage.setItem("booking", JSON.stringify(result));
      //   navigate("/ATM-Details");
      // } else {
      //   alert("Invalid Credentials !!! Try again with correct credentials ...");
      // }
      if (!result) {
        alert(`Seats Already Booked`);
      } else if (result) {
        alert(`Enter Card Details - Pay & Confirm your seats`);
        navigate("/ATM-Details");
        // Save booking to local Storage
        localStorage.setItem("booking", JSON.stringify(result));
      }
    }
  };
  // console.log("SEATNO", bookedSeats);

  const getTicketDetails = async () => {
    const result = await fetch("http://localhost:5000/view-tickets");
    const data = await result.json();
    console.log("TICKETSSS", data);
    let booked = [];
    data.filter((user, i) => {
      if (
        movieName === user.movieName &&
        location === user.location &&
        theater === user.theater &&
        time === user.time &&
        price === user.price
      ) {
        booked.push(user.bookedSeats);
      }
      console.log("BOOOKEDSEEEAAATTS", [...user.bookedSeats]);
      return booked;
    });
    let arr = [];
    for (let i = 0; i < booked.length; i++) {
      arr.push(...booked[i]);
    }
    setAlreadyBooked(arr);

    // console.log("NEW ARR", arr);

    let validEmail = "";
    data.filter((user) => {
      if (userEmail === user.userEmail) {
        validEmail = user.userEmail;
      }
      return validEmail;
    });
    // console.log("VALID EMAIL", validEmail);
    setCheckUserEmail(validEmail);
  };

  console.log("ALREADY BOOKED", alreadyBooked);
  // console.log("HARSH", alreadyBooked[0].includes("A1")); // TESTING

  return (
    <div>
      <h2 className="headingStyle">{movieName}</h2>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <img src={poster} alt="" style={{ width: "180px", margin: "auto" }} />
      </div>
      <div className="formStyle">
        <form className="formbox">
          <label> Location : </label>{" "}
          <select
            name="location"
            onChange={(e) => {
              setlocation(e.target.value);
            }}
            required
          >
            <option value="">Select</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Banglore">Banglore</option>
          </select>
          {error && !location && <p className="invalid">Select Location</p>}
          <br />
          <br />
          {location === "Pune" ? (
            <div>
              <label> Theater : </label>{" "}
              <select
                required
                style={{ width: "80%" }}
                name="theater"
                onChange={(e) => {
                  setTheater(e.target.value);
                }}
              >
                <option value="">Select</option>
                <option value="City Pride ( Abhiruchi Mall )">
                  City Pride ( Abhiruchi Mall )
                </option>
                <option value="IMAX ( Kothrud )">IMAX ( Kothrud )</option>
                <option value=" Cinepolis ( Seasons Mall - Hadapsar )">
                  Cinepolis ( Seasons Mall - Hadapsar )
                </option>
                <option value="PVR ( Kumar Pacific )">
                  PVR ( Kumar Pacific )
                </option>
              </select>{" "}
            </div>
          ) : location === "Mumbai" ? (
            <div>
              {" "}
              <label> Theater : </label>{" "}
              <select
                required
                style={{ width: "80%" }}
                name="theater"
                onChange={(e) => {
                  setTheater(e.target.value);
                }}
              >
                <option value="">Select</option>
                <option value="IMAX ( Dadar )">IMAX ( Dadar )</option>
                <option value="PVR ( Growels Mall )">
                  PVR ( Growels Mall )
                </option>
                <option value="City Pride ( Thane )">
                  City Pride ( Thane )
                </option>
                <option value=" Cinepolis ( Phoenix Mall - Grant Road )">
                  Cinepolis ( Phoenix Mall - Grant Road )
                </option>
              </select>{" "}
            </div>
          ) : location === "Delhi" ? (
            <div>
              {" "}
              <label> Theater : </label>{" "}
              <select
                required
                style={{ width: "80%" }}
                name="theater"
                onChange={(e) => {
                  setTheater(e.target.value);
                }}
              >
                <option value="">Select</option>
                <option value="Ambience Mall ( Vasant Kunj )">
                  Ambience Mall ( Vasant Kunj )
                </option>
                <option value="Pacific Mall ( Tagore Garden )">
                  Pacific Mall ( Tagore Garden )
                </option>
                <option value="INOX ( New Delhi )">INOX ( New Delhi )</option>
                <option value=" Cinepolis ( DLF Avenue Mall )">
                  Cinepolis ( DLF Avenue Mall )
                </option>
              </select>{" "}
            </div>
          ) : location === "Banglore" ? (
            <div>
              {" "}
              <label> Theater : </label>{" "}
              <select
                required
                style={{ width: "80%" }}
                name="theater"
                onChange={(e) => {
                  setTheater(e.target.value);
                }}
              >
                <option value="">Select</option>
                <option value="PVR ( Orion Mall )">PVR ( Orion Mall )</option>
                <option value="Park Square ( IMAX )">
                  Park Square ( IMAX )
                </option>
                <option value="Octane Mall ( Banglore )">
                  Octane Mall ( Banglore )
                </option>
                <option value=" Cinepolis ( Mantri TechPark )">
                  Cinepolis ( Mantri TechPark )
                </option>
              </select>{" "}
            </div>
          ) : null}
          {error && !theater && <p className="invalid">Select Theater</p>}
          <br />
          <label>Show Time :</label>{" "}
          <select
            required
            name="time"
            onChange={(e) => {
              setTime(e.target.value);
            }}
          >
            <option value="">Select</option>
            <option value="08:15 AM">08:15 AM</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="12:30 PM">12:30 PM</option>
            <option value="03:45 PM">03:45 PM</option>
            <option value="05:00 PM">05:00 PM</option>
            <option value="06:45 PM">06:45 PM</option>
            <option value="08:00 AM">08:00 PM</option>
            <option value="10:30 AM">10:30 PM</option>
          </select>
          {error && !time && <p className="invalid">Select Show Time</p>}
          <br />
          <br />
          <label>Ticket Price : </label>
          <Button
            style={{ width: "80px", marginLeft: "55px" }}
            variant="warning"
            onClick={() => setPrice("220")}
          >
            220
          </Button>{" "}
          <Button
            style={{ width: "80px", marginLeft: "30px" }}
            variant="primary"
            onClick={() => setPrice("350")}
          >
            350
          </Button>{" "}
          <Button
            style={{ width: "80px", marginLeft: "30px" }}
            variant="success"
            value={220}
            onClick={() => setPrice("500")}
          >
            500
          </Button>
          <Button
            style={{ width: "80px", marginLeft: "30px" }}
            variant="danger"
            value={220}
            onClick={() => setPrice("800")}
          >
            800
          </Button>
          {error && !price && <p className="invalid">Select Ticket Price</p>}
          <br />
          <br />
          <label>Food & Beverage : </label>
          <select
            required
            style={{ width: "80%" }}
            name="food"
            onChange={(e) => {
              setFood(e.target.value);
            }}
          >
            <option value="">Select</option>

            <option value="2 PopCorn Tub & 2 Coke = 420">
              2 PopCorn Tub & 2 Coke = 420
            </option>
            <option value="1 Pizza & 2 Coke Combo = 550">
              1 Pizza & 2 Coke Combo = 550
            </option>
            <option value="2 Burger & 2 Coke Combo = 600">
              2 Burger & 2 Coke Combo = 600
            </option>
            <option value="1 PopCorn Tub & 1 Coke = 320">
              1 PopCorn Tub & 1 Coke = 320
            </option>
            <option value="1 Burger & 1 Coke Combo = 600">
              1 Burger & 1 Coke Combo = 300
            </option>
            <option value="PopCorn (90gm) = 240">PopCorn (90gm) = 240</option>
            <option value="Coke (600ml) = 160">Coke (600ml) = 160</option>
            <option value="PopCorn (45gm) = 180">PopCorn (45gm) = 180</option>
            <option value="Coke (450ml) = 140">Coke (450ml) = 140</option>
          </select>
          <br />
          <br />
          <div>
            <label>Coupon 10% OFF : </label>{" "}
            <input
              className="coupon"
              placeholder="Enter Coupon Code ( BOOKMYSHOW10 )"
              onChange={(e) => setCoupon(e.target.value)}
              disabled={userEmail === checkUserEmail}
            />
          </div>
          <Button
            className="priceBtn"
            variant="secondary"
            style={{ color: "black", fontFamily: "Verdana" }}
          >
            TOTAL - ( ₹ {totalPrice} )
          </Button>
        </form>
      </div>

      <div className="seat">
        <h1
          style={{
            textAlign: "center",
            color: "red",
            fontStyle: "italic",
            padding: "15px",
          }}
        >
          * LIMIT - MAX. 4 TICKETS CAN BE BOOKED.. .{" "}
        </h1>
        <div className="seatArrange">
          <h3>SEAT BOOKING</h3>
          <h5 className="diamond">DIAMOND ( 800 )</h5>
          {price === "800" ? (
            <div className="grid-container">
              <button
                className="grid-item"
                onClick={bookSeatD}
                value="A1"
                disabled={alreadyBooked?.includes("A1")}
              >
                A1
              </button>
              <button
                className="grid-item"
                onClick={bookSeatD}
                value="A2"
                disabled={alreadyBooked?.includes("A2")}
              >
                A2
              </button>
              <button
                className="grid-item"
                onClick={bookSeatD}
                value="A3"
                disabled={alreadyBooked?.includes("A3")}
              >
                A3
              </button>
              <button
                className="grid-item"
                onClick={bookSeatD}
                value="A4"
                disabled={alreadyBooked?.includes("A4")}
              >
                A4
              </button>
              <button
                className="grid-item"
                onClick={bookSeatD}
                value="A5"
                disabled={alreadyBooked?.includes("A5")}
              >
                A5
              </button>
              <button
                className="grid-item"
                onClick={bookSeatD}
                value="A6"
                disabled={alreadyBooked?.includes("A6")}
              >
                A6
              </button>
              <button
                className="grid-item"
                onClick={bookSeatD}
                value="A7"
                disabled={alreadyBooked?.includes("A7")}
              >
                A7
              </button>
              <button
                className="grid-item"
                onClick={bookSeatD}
                value="A8"
                disabled={alreadyBooked?.includes("A8")}
              >
                A8
              </button>
              <button
                className="grid-item"
                onClick={bookSeatD}
                value="A9"
                disabled={alreadyBooked?.includes("A9")}
              >
                A9
              </button>
              <button
                className="grid-item"
                onClick={bookSeatD}
                value="A10"
                disabled={alreadyBooked?.includes("A10")}
              >
                A10
              </button>
              <button
                className="grid-item"
                onClick={bookSeatD}
                value="A11"
                disabled={alreadyBooked?.includes("A11")}
              >
                A11
              </button>
              <button
                className="grid-item"
                onClick={bookSeatD}
                value="A12"
                disabled={alreadyBooked?.includes("A12")}
              >
                A12
              </button>
            </div>
          ) : (
            <div className="grid-container">
              <button
                disabled={true}
                className="grid-item"
                onClick={bookSeatD}
                value="A1"
              >
                A1
              </button>
              <button
                disabled={true}
                className="grid-item"
                onClick={bookSeatD}
                value="A2"
              >
                A2
              </button>
              <button
                disabled={true}
                className="grid-item"
                onClick={bookSeatD}
                value="A3"
              >
                A3
              </button>
              <button
                disabled={true}
                className="grid-item"
                onClick={bookSeatD}
                value="A4"
              >
                A4
              </button>
              <button
                disabled={true}
                className="grid-item"
                onClick={bookSeatD}
                value="A5"
              >
                A5
              </button>
              <button
                disabled={true}
                className="grid-item"
                onClick={bookSeatD}
                value="A6"
              >
                A6
              </button>
              <button
                disabled={true}
                className="grid-item"
                onClick={bookSeatD}
                value="A7"
              >
                A7
              </button>
              <button
                disabled={true}
                className="grid-item"
                onClick={bookSeatD}
                value="A8"
              >
                A8
              </button>
              <button
                disabled={true}
                className="grid-item"
                onClick={bookSeatD}
                value="A9"
              >
                A9
              </button>
              <button
                disabled={true}
                className="grid-item"
                onClick={bookSeatD}
                value="A10"
              >
                A10
              </button>
              <button
                disabled={true}
                className="grid-item"
                onClick={bookSeatD}
                value="A11"
              >
                A11
              </button>
              <button
                disabled={true}
                className="grid-item"
                onClick={bookSeatD}
                value="A12"
              >
                A12
              </button>
            </div>
          )}
          <h5 className="platinum">PLATINUM ( 500 )</h5>
          {price === "500" ? (
            <div className="grid-container2">
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="B1"
                disabled={alreadyBooked?.includes("B1")}
              >
                B1
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="B2"
                disabled={alreadyBooked?.includes("B2")}
              >
                B2
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="B3"
                disabled={alreadyBooked?.includes("B3")}
              >
                B3
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="B4"
                disabled={alreadyBooked?.includes("B4")}
              >
                B4
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="B5"
                disabled={alreadyBooked?.includes("B5")}
              >
                B5
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="B6"
                disabled={alreadyBooked?.includes("B6")}
              >
                B6
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="B7"
                disabled={alreadyBooked?.includes("B7")}
              >
                B7
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="B8"
                disabled={alreadyBooked?.includes("B8")}
              >
                B8
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="B9"
                disabled={alreadyBooked?.includes("B9")}
              >
                B9
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="B10"
                disabled={alreadyBooked?.includes("B10")}
              >
                B10
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="B11"
                disabled={alreadyBooked?.includes("B11")}
              >
                B11
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="B12"
                disabled={alreadyBooked?.includes("B12")}
              >
                B12
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="C1"
                disabled={alreadyBooked?.includes("C1")}
              >
                C1
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="C2"
                disabled={alreadyBooked?.includes("C2")}
              >
                C2
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="C3"
                disabled={alreadyBooked?.includes("C3")}
              >
                C3
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="C4"
                disabled={alreadyBooked?.includes("C4")}
              >
                C4
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="C5"
                disabled={alreadyBooked?.includes("C5")}
              >
                C5
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="C6"
                disabled={alreadyBooked?.includes("C6")}
              >
                C6
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="C7"
                disabled={alreadyBooked?.includes("C7")}
              >
                C7
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="C8"
                disabled={alreadyBooked?.includes("C8")}
              >
                C8
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="C9"
                disabled={alreadyBooked?.includes("C9")}
              >
                C9
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="C10"
                disabled={alreadyBooked?.includes("C10")}
              >
                C10
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="C11"
                disabled={alreadyBooked?.includes("C11")}
              >
                C11
              </button>
              <button
                className="grid-item2"
                onClick={bookSeatP}
                value="C12"
                disabled={alreadyBooked?.includes("C12")}
              >
                C12
              </button>
            </div>
          ) : (
            <div className="grid-container2">
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="B1"
              >
                B1
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="B2"
              >
                B2
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="B3"
              >
                B3
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="B4"
              >
                B4
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="B5"
              >
                B5
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="B6"
              >
                B6
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="B7"
              >
                B7
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="B8"
              >
                B8
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="B9"
              >
                B9
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="B10"
              >
                B10
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="B11"
              >
                B11
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="B12"
              >
                B12
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="C1"
              >
                C1
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="C2"
              >
                C2
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="C3"
              >
                C3
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="C4"
              >
                C4
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="C5"
              >
                C5
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="C6"
              >
                C6
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="C7"
              >
                C7
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="C8"
              >
                C8
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="C9"
              >
                C9
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="C10"
              >
                C10
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="C11"
              >
                C11
              </button>
              <button
                disabled={true}
                className="grid-item2"
                onClick={bookSeatP}
                value="C12"
              >
                C12
              </button>
            </div>
          )}
          <h5 className="gold">GOLD ( 350 )</h5>
          {price === "350" ? (
            <div className="grid-container3">
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="D1"
                disabled={alreadyBooked?.includes("D1")}
              >
                D1
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="D2"
                disabled={alreadyBooked?.includes("D2")}
              >
                D2
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="D3"
                disabled={alreadyBooked?.includes("D3")}
              >
                D3
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="D4"
                disabled={alreadyBooked?.includes("D4")}
              >
                D4
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="D5"
                disabled={alreadyBooked?.includes("D5")}
              >
                D5
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="D6"
                disabled={alreadyBooked?.includes("D6")}
              >
                D6
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="D7"
                disabled={alreadyBooked?.includes("D7")}
              >
                D7
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="D8"
                disabled={alreadyBooked?.includes("D8")}
              >
                D8
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="D9"
                disabled={alreadyBooked?.includes("D9")}
              >
                D9
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="D10"
                disabled={alreadyBooked?.includes("D10")}
              >
                D10
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="D11"
                disabled={alreadyBooked?.includes("D11")}
              >
                D11
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="D12"
                disabled={alreadyBooked?.includes("D12")}
              >
                D12
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="E1"
                disabled={alreadyBooked?.includes("E1")}
              >
                E1
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="E2"
                disabled={alreadyBooked?.includes("E2")}
              >
                E2
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="E3"
                disabled={alreadyBooked?.includes("E3")}
              >
                E3
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="E4"
                disabled={alreadyBooked?.includes("E4")}
              >
                E4
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="E5"
                disabled={alreadyBooked?.includes("E5")}
              >
                E5
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="E6"
                disabled={alreadyBooked?.includes("E6")}
              >
                E6
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="E7"
                disabled={alreadyBooked?.includes("E7")}
              >
                E7
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="E8"
                disabled={alreadyBooked?.includes("E8")}
              >
                E8
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="E9"
                disabled={alreadyBooked?.includes("E9")}
              >
                E9
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="E10"
                disabled={alreadyBooked?.includes("E10")}
              >
                E10
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="E11"
                disabled={alreadyBooked?.includes("E11")}
              >
                E11
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="E12"
                disabled={alreadyBooked?.includes("E12")}
              >
                E12
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="F1"
                disabled={alreadyBooked?.includes("F1")}
              >
                F1
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="F2"
                disabled={alreadyBooked?.includes("F2")}
              >
                F2
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="F3"
                disabled={alreadyBooked?.includes("F3")}
              >
                F3
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="F4"
                disabled={alreadyBooked?.includes("F4")}
              >
                F4
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="F5"
                disabled={alreadyBooked?.includes("F5")}
              >
                F5
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="F6"
                disabled={alreadyBooked?.includes("F6")}
              >
                F6
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="F7"
                disabled={alreadyBooked?.includes("F7")}
              >
                F7
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="F8"
                disabled={alreadyBooked?.includes("F8")}
              >
                F8
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="F9"
                disabled={alreadyBooked?.includes("F9")}
              >
                F9
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="F10"
                disabled={alreadyBooked?.includes("F10")}
              >
                F10
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="F11"
                disabled={alreadyBooked?.includes("F11")}
              >
                F11
              </button>
              <button
                className="grid-item3"
                onClick={bookSeatG}
                value="F12"
                disabled={alreadyBooked?.includes("F12")}
              >
                F12
              </button>
            </div>
          ) : (
            <div className="grid-container3">
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="D1"
              >
                D1
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="D2"
              >
                D2
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="D3"
              >
                D3
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="D4"
              >
                D4
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="D5"
              >
                D5
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="D6"
              >
                D6
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="D7"
              >
                D7
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="D8"
              >
                D8
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="D9"
              >
                D9
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="D10"
              >
                D10
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="D11"
              >
                D11
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="D12"
              >
                D12
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="E1"
              >
                E1
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="E2"
              >
                E2
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="E3"
              >
                E3
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="E4"
              >
                E4
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="E5"
              >
                E5
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="E6"
              >
                E6
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="E7"
              >
                E7
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="E8"
              >
                E8
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="E9"
              >
                E9
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="E10"
              >
                E10
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="E11"
              >
                E11
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="E12"
              >
                E12
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="F1"
              >
                F1
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="F2"
              >
                F2
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="F3"
              >
                F3
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="F4"
              >
                F4
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="F5"
              >
                F5
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="F6"
              >
                F6
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="F7"
              >
                F7
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="F8"
              >
                F8
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="F9"
              >
                F9
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="F10"
              >
                F10
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="F11"
              >
                F11
              </button>
              <button
                disabled={true}
                className="grid-item3"
                onClick={bookSeatG}
                value="F12"
              >
                F12
              </button>
            </div>
          )}{" "}
          <h5 className="silver">SILVER ( 220 )</h5>
          {price === "220" ? (
            <div className="grid-container4">
              <button
                className="grid-item4"
                onClick={bookSeatS}
                value="G1"
                disabled={alreadyBooked?.includes("G1")}
              >
                G1
              </button>
              <button
                className="grid-item4"
                onClick={bookSeatS}
                value="G2"
                disabled={alreadyBooked?.includes("G2")}
              >
                G2
              </button>
              <button
                className="grid-item4"
                onClick={bookSeatS}
                value="G3"
                disabled={alreadyBooked?.includes("G3")}
              >
                G3
              </button>
              <button
                className="grid-item4"
                onClick={bookSeatS}
                value="G4"
                disabled={alreadyBooked?.includes("G4")}
              >
                G4
              </button>
              <button
                className="grid-item4"
                onClick={bookSeatS}
                value="G5"
                disabled={alreadyBooked?.includes("G5")}
              >
                G5
              </button>
              <button
                className="grid-item4"
                onClick={bookSeatS}
                value="G6"
                disabled={alreadyBooked?.includes("G6")}
              >
                G6
              </button>
              <button
                className="grid-item4"
                onClick={bookSeatS}
                value="G7"
                disabled={alreadyBooked?.includes("G7")}
              >
                G7
              </button>
              <button
                className="grid-item4"
                onClick={bookSeatS}
                value="G8"
                disabled={alreadyBooked?.includes("G8")}
              >
                G8
              </button>
              <button
                className="grid-item4"
                onClick={bookSeatS}
                value="G9"
                disabled={alreadyBooked?.includes("G9")}
              >
                G9
              </button>
              <button
                className="grid-item4"
                onClick={bookSeatS}
                value="G10"
                disabled={alreadyBooked?.includes("G10")}
              >
                G10
              </button>
              <button
                className="grid-item4"
                onClick={bookSeatS}
                value="G11"
                disabled={alreadyBooked?.includes("G11")}
              >
                G11
              </button>
              <button
                className="grid-item4"
                onClick={bookSeatS}
                value="G12"
                disabled={alreadyBooked?.includes("G12")}
              >
                G12
              </button>
            </div>
          ) : (
            <div className="grid-container4">
              <button
                disabled={true}
                className="grid-item4"
                onClick={bookSeatS}
                value="G1"
              >
                G1
              </button>
              <button
                disabled={true}
                className="grid-item4"
                onClick={bookSeatS}
                value="G2"
              >
                G2
              </button>
              <button
                disabled={true}
                className="grid-item4"
                onClick={bookSeatS}
                value="G3"
              >
                G3
              </button>
              <button
                disabled={true}
                className="grid-item4"
                onClick={bookSeatS}
                value="G4"
              >
                G4
              </button>
              <button
                disabled={true}
                className="grid-item4"
                onClick={bookSeatS}
                value="G5"
              >
                G5
              </button>
              <button
                disabled={true}
                className="grid-item4"
                onClick={bookSeatS}
                value="G6"
              >
                G6
              </button>
              <button
                disabled={true}
                className="grid-item4"
                onClick={bookSeatS}
                value="G7"
              >
                G7
              </button>
              <button
                disabled={true}
                className="grid-item4"
                onClick={bookSeatS}
                value="G8"
              >
                G8
              </button>
              <button
                disabled={true}
                className="grid-item4"
                onClick={bookSeatS}
                value="G9"
              >
                G9
              </button>
              <button
                disabled={true}
                className="grid-item4"
                onClick={bookSeatS}
                value="G10"
              >
                G10
              </button>
              <button
                disabled={true}
                className="grid-item4"
                onClick={bookSeatS}
                value="G11"
              >
                G11
              </button>
              <button
                disabled={true}
                className="grid-item4"
                onClick={bookSeatS}
                value="G12"
              >
                G12
              </button>
            </div>
          )}
          <h6 className="screen">SCREEN</h6>
        </div>
      </div>
      <div className="pay">
        <Button
          variant="danger"
          style={{ width: "15%" }}
          onClick={() => payNow()}
        >
          BOOK NOW ( ₹ {totalPrice} )
        </Button>
      </div>
    </div>
  );
}

export default ConfirmBooking;
