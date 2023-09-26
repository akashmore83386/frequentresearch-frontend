import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:5000";

function RegistrationForm() {
  const navigate = useNavigate();

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  };  

  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    dateOfBirth: "",
    age: 0,
  });

  // State to manage validation errors
  const [errors, setErrors] = useState({});

  const countries = ["India", "USA"];
  const states = {
    India: ["Maharashtra", "Delhi"], 
    USA: ["California", "New York"],
  };
  const cities = {
    Maharashtra: ["Mumbai", "Pune"], 
    Delhi: ["New Delhi"],
    "New York": ["New York City"],
    California: ["Los Angeles", "San Francisco"],
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation here
    const validationErrors = {};

    // Example: Validate first name
    if (!formData.firstName.match(/^[a-zA-Z]+$/)) {
      validationErrors.firstName = "Must accept alphabets only";
    }

    // Example: Validate last name
    if (!formData.lastName.match(/^[a-zA-Z]+$/)) {
      validationErrors.lastName = "Must accept alphabets only";
    }

    // Example: Validate email format
    if (
      !formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ) {
      validationErrors.email = "Invalid email format";
    }


    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/user/signup`, formData);

      if (response.status === 201) {
        console.log("Registration successful:", response.data);

        navigate("/display", { state: { user: formData } });
      } else {
        console.error("Registration failed:", response.data);

      }
    } catch (error) {
      console.error("Error occurred during registration:", error);

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = {
      ...formData,
      [name]: value,
    };
  
    // Calculate age if the dateOfBirth field is changed
    if (name === "dateOfBirth") {
      const age = calculateAge(value);
      updatedFormData = {
        ...updatedFormData,
        age,
      };
    }
  
    setFormData(updatedFormData);
  };
  

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        <div>
          <label>E-Mail:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Country:</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>State:</label>
          <select name="state" value={formData.state} onChange={handleChange}>
            <option value="">Select State</option>
            {formData.country &&
              states[formData.country].map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>City:</label>
          <select name="city" value={formData.city} onChange={handleChange}>
            <option value="">Select City</option>
            {formData.state &&
              cities[formData.state].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              onChange={handleChange}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>
          </div>
          <div>
            <input
              type="radio"
              id="other"
              name="gender"
              value="Other"
              onChange={handleChange}
            />
            <label htmlFor="other">Other</label>
          </div>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            disabled
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default RegistrationForm;