import React, { useState } from "react";
import axios from "axios";
import "./Register.css"; // Ensure you have a CSS file for styling

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  });

  const [error, setError] = useState(""); // For displaying error messages
  const [success, setSuccess] = useState(""); // For displaying success messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      );

      if (response && response.data) {
        setSuccess(response.data.message); // Update success state
        setError(""); // Clear any previous errors
        // Optionally, clear the form or redirect to another page
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phoneNumber: "",
          dateOfBirth: "",
          gender: "",
        });
      } else {
        setError("Unexpected response structure");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "An error occurred");
      } else {
        setError("An error occurred");
      }
      setSuccess(""); // Clear any previous success messages
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
          value={formData.firstName}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
          value={formData.lastName}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          value={formData.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          value={formData.password}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
          required
          value={formData.phone}
        />
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          onChange={handleChange}
          required
          value={formData.dateOfBirth}
        />
        <select
          name="gender"
          onChange={handleChange}
          required
          value={formData.gender}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default Register;
