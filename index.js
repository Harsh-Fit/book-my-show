const express = require("express");
const cors = require("cors");
require("./db/config");

const User = require("./db/User");
const Product = require("./db/Product");

const app = express();

app.use(express.json());

app.use(cors());

app.post("/register", async (req, resp) => {
  // resp.send(req.body);
  console.log(req.body);
  const user = new User(req.body);
  let result = await user.save();
  // Delete password (HIDE PASSWORD while register)
  result = result.toObject();
  delete result.password;
  resp.send(result);
});

app.post("/login", async (req, resp) => {
  // console.log(req.body);
  // Display User if available and hide/avoid password to display
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      resp.send(user);
    } else {
      resp.send({ result: "NO USER FOUND" });
    }
  } else {
    resp.send({ result: "NO USER FOUND" });
  }
});

app.post("/add-product", async (req, resp) => {
  // resp.send(req.body);
  // console.log(req.body);
  const product = new Product(req.body);
  let result = await product.save();
  // result = result.toObject();
  // delete result.password;
  resp.send(result);
});

app.get("/products", async (req, resp) => {
  let products = await Product.find();
  if (products.length) {
    resp.send(products);
  } else {
    resp.send({ result: "No Product Found" });
  }
});

app.delete("/products/:id", async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/products/:id", async (req, resp) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found !!!" });
  }
});

app.put("/products/:id", async (req, resp) => {
  let result = await Product.updateOne(
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
  let result = await Product.find({
    $or: [
      {
        company: { $regex: req.params.key },
      },
      {
        name: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
    ],
  });
  resp.send(result);
});

app.listen(5000);
