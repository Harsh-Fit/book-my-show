import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  /// SignUp Once cannot visit navigate again -

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  /// API Integration

  const collectData = async () => {
    // console.log(name, email, password);
    let result = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    // console.log(result);

    navigate("/");

    // Save user to local Storage
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
  };

  return (
    <div className="inputContainer">
      <h1>REGISTER</h1>
      <form>
        <label>
          <h6> NAME : </h6>
        </label>{" "}
        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <label>
          <h6> EMAIL : </h6>
        </label>{" "}
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <label>
          <h6> PASSWORD : </h6>
        </label>{" "}
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <Button variant="primary" onClick={collectData}>
          SignUp
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
