import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // ✅ step 2

  const handleReset = () => {
    setPassword("");
    setEmail("");
  };

  const handleSubmit = async (e) => {
    let lst = {};
    if (!email) lst.email = "Email is Required";
    if (!password || password.length < 8) {
      lst.password = "Password must be at least 8 characters";
    }

    setErrors(lst);

    if (Object.keys(lst).length === 0) {
      try {
        const res = await axios.post("http://localhost:backend/register", {
          email,
          password,
        });

        toast.success("User registered successfully", {
          position: "top-right",
        });

        console.log("Registration successful");
        handleReset();

        navigate("/login");

      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data.message === "exist-email") {
            toast.warning("Email ID already exists", {
              position: "top-right",
            });
          } else {
            toast.error("Validation error occurred", {
              position: "top-right",
            });
          }
        } else {
          toast.error("Registration failed. Try again later.", {
            position: "top-right",
          });
          console.error("Unexpected error: ", error.message);
        }
      }
    }
  };

  return (
    <div>
      <h1 className="header">User Details</h1>

      <input
        placeholder="Enter Email"
        type="email"
        value={email}
        className="input-field"
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p>{errors.email}</p>}

      <input
        placeholder="Enter Password"
        type="password"
        value={password}
        className="input-field"
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <p>{errors.password}</p>}

      <div className="button-container">
        <button type="submit" onClick={handleSubmit}>Submit</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Registration;
