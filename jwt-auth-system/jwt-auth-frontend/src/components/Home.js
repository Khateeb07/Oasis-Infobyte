import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "./Home.css";

const Home = ({ token, onLogout }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/home", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(response.data.message);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setMessage("Unauthorized. Please login again.");
          onLogout(); // Clear token and logout
          navigate("/login");
        } else {
          setMessage("An error occurred. Please try again later.");
        }
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, navigate, onLogout]);

  // If no token is present, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home-container">
      <h1>{message}</h1>
      <button className="btn btn-danger" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
