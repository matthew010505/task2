import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Howdy Ho!</h1>
      <button
        onClick={() => navigate("/login")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "black",
          color: "white",
          border: "none",
        }}
      >
        Login
      </button>

      <button
        onClick={() => navigate("/signup")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "black",
          color: "white",
          border: "none",
        }}
      >
        Signup
      </button>
    </div>
  );
};

export default Landing;
