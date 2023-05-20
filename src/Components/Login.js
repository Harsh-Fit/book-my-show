import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  // const onChange = () => {
  //   setVerified(true);
  // };

  const loginHandle = async () => {
    // console.log("Email", email, "Password", password);
    let result = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    // console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      alert(`Welcome to BookMyShow.. .`);
      navigate("/");
    } else {
      alert("Invalid Credentials !!! Try again with correct credentials ...");
    }
  };

  return (
    <div className="inputContainer">
      <h1>USER LOGIN</h1>
      <form>
        <label>
          <h6> EMAIL : </h6>
        </label>{" "}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
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
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        {/* <ReCAPTCHA
          sitekey="6LcnHRElAAAAAOxr56xxt065kDbhBIv-s6QUAdjk"
          onChange={onChange}
        /> */}
        <br />
        <Button
          variant="primary"
          onClick={() => loginHandle()}
          // disabled={!verified}
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
