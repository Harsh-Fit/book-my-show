const express = require("express");
const cors = require("cors");
require("./db/config");
const Admin = require("./db/Admin");
const User = require("./db/User");
const Movie = require("./db/Movie");
const Booking = require("./db/Booking");
const Ticket = require("./db/Ticket");

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

const app = express();

app.use(express.json());

app.use(cors());

app.post("/register", async (req, resp) => {
  // resp.send(req.body);
  console.log(req.body);
  const user = new User(req.body);
  let found = await User.findOne({ email: req.body.email });
  if (found) {
    resp.send(false);
  } else {
    let result = await user.save();
    // Delete password (HIDE PASSWORD while register)
    result = result.toObject();
    delete result.password;
    // resp.send(result);
    Jwt.sign({ user }, jwtKey, (err, token) => {
      if (err) {
        resp.send({
          result: "Something went wrong, Please try after sometime",
        });
      } else {
        resp.send({ result, auth: token });
      }
    });
  }
});

app.post("/login", async (req, resp) => {
  // console.log(req.body);
  // Display User if available and hide/avoid password to display
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, (err, token) => {
        if (err) {
          resp.send({
            result: "Something went wrong, Please try after sometime",
          });
        } else {
          resp.send({ user, auth: token });
        }
      });
      // resp.send(user);
    } else {
      resp.send({ result: "NO USER FOUND" });
    }
  } else {
    resp.send({ result: "NO USER FOUND" });
  }
});

app.get("/user/:email", async (req, resp) => {
  let user = await User.findOne({ email: req.params.email });
  if (user.length) {
    resp.send(user);
  } else {
    resp.send({ result: "No Movie Found" });
  }
});

app.post("/add-movie", async (req, resp) => {
  // resp.send(req.body);
  // console.log(req.body);
  const movie = new Movie(req.body);
  let result = await movie.save();
  // result = result.toObject();
  // delete result.password;
  resp.send(result);
});

app.get("/movies", async (req, resp) => {
  let movie = await Movie.find();
  if (movie.length) {
    resp.send(movie);
  } else {
    resp.send({ result: "No Movie Found" });
  }
});

// app.delete("/movie/:id", verifyToken, async (req, resp) => {
//   const result = await Movie.deleteOne({ _id: req.params.id });
//   resp.send(result);
// });

app.get("/book/:id", async (req, resp) => {
  const result = await Movie.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Movie Found !!!" });
  }
});

app.put("/movie/:id", async (req, resp) => {
  let result = await Movie.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

app.get("/search/:key", async (req, resp) => {
  let result = await Movie.find({
    $or: [
      {
        movieName: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
    ],
  });
  resp.send(result);
});

app.post("/pay-now", verifyToken, async (req, resp) => {
  // resp.send(req.body);
  // console.log(req.body);
  const movieBook = new Booking(req.body);
  let result = await movieBook.save();
  // result = result.toObject();
  // delete result.password;
  resp.send(result);
});

app.get("/pay-now", async (req, resp) => {
  let movie = await Booking.find();
  if (movie.length) {
    resp.send(movie);
  } else {
    resp.send({ result: "No Movie Found" });
  }
});

app.post("/ticket", verifyToken, async (req, resp) => {
  // resp.send(req.body);
  // console.log(req.body);
  const finalTicket = new Ticket(req.body);
  let result = await finalTicket.save();
  // result = result.toObject();
  // delete result.password;
  resp.send(result);
});

app.get("/ticket-details/:email", async (req, resp) => {
  const result = await Ticket.find({ userEmail: req.params.email });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Movie Found !!!" });
  }
});

app.post("/admin-register", async (req, resp) => {
  // resp.send(req.body);
  console.log(req.body);
  const user = new Admin(req.body);
  let found = await Admin.findOne({ email: req.body.email });
  if (found) {
    resp.send(false);
  } else {
    let result = await user.save();
    // Delete password (HIDE PASSWORD while register)
    result = result.toObject();
    delete result.password;
    // resp.send(result);
    Jwt.sign({ user }, jwtKey, (err, token) => {
      if (err) {
        resp.send({
          result: "Something went wrong, Please try after sometime",
        });
      } else {
        resp.send({ result, auth: token });
      }
    });
  }
});

app.post("/admin-login", async (req, resp) => {
  // console.log(req.body);
  // Display User if available and hide/avoid password to display
  if (req.body.password && req.body.email) {
    let user = await Admin.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, (err, token) => {
        if (err) {
          resp.send({
            result: "Something went wrong, Please try after sometime",
          });
        } else {
          resp.send({ user, auth: token });
        }
      });
      // resp.send(user);
    } else {
      resp.send({ result: "NO USER FOUND" });
    }
  } else {
    resp.send({ result: "NO USER FOUND" });
  }
});

app.get("/view-tickets", async (req, resp) => {
  let movie = await Ticket.find();
  if (movie.length) {
    resp.send(movie);
  } else {
    resp.send({ result: "No Movie Found" });
  }
});

// app.post("/pay-now", async (req, resp) => {
//   const user = new Booking(req.body);
//   let found = await User.findOne({
//     movieName: req.body.movie,
//     location: req.body.location,
//     theater: req.body.theater,
//     price: req.body.price,
//     time: req.body.time,
//     bookedSeats: req.body.bookedSeats,
//   });
//   if (found) {
//     resp.send(false);
//   } else {
//     let result = await user.save();

//     // Delete password (HIDE PASSWORD while register)
//     result = result.toObject();
//     delete result.password;
//     // resp.send(result);
//     Jwt.sign({ user }, jwtKey, (err, token) => {
//       if (err) {
//         resp.send({
//           result: "Something went wrong, Please try after sometime",
//         });
//       } else {
//         resp.send({ result, auth: token });
//       }
//     });
//   }
// });

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    // console.warn("Middleware Called", token);
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please add token with headers" });
  }
  // next();
}

app.listen(5000);
