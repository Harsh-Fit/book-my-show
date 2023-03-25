import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (
      !fname ||
      !lname ||
      !dob ||
      !email ||
      !password ||
      password !== confirmPassword
    ) {
      alert("Enter valid credentials");
      return;
    } else {
      let result = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify({
          fname,
          lname,
          dob,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      // console.log(result);
      if (!result) {
        alert(`Email Already Exists.. Try with new Email Id .. `);
      } else if (result) {
        // alert(`Welcome to BookMyShow.. .`);
        navigate("/login");
        // Save user to local Storage
        // localStorage.setItem("user", JSON.stringify(result.result));
        // localStorage.setItem("token", JSON.stringify(result.auth));
      }
    }
  };

  return (
    <div className="inputContainer">
      <h1>REGISTER</h1>
      <form>
        <label>
          <h6> FIRSTNAME : </h6>
        </label>{" "}
        <input
          type="text"
          placeholder="Enter FirstName"
          onChange={(e) => {
            setfName(e.target.value);
          }}
          required
        />
        <br />
        <label>
          <h6> LASTNAME : </h6>
        </label>{" "}
        <input
          type="text"
          placeholder="Enter LastName"
          onChange={(e) => {
            setlName(e.target.value);
          }}
          required
        />
        <br />
        <label>
          <h6> DOB : </h6>
        </label>{" "}
        <input
          type="date"
          onChange={(e) => {
            setDob(e.target.value);
          }}
          required
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
          required
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
          required
        />
        <br />
        <label>
          <h6>CONFIRM PASSWORD : </h6>
        </label>{" "}
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          required
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
