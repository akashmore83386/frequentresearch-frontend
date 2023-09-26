import React from "react";
import { useLocation } from "react-router-dom";

function DisplayPage() {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    return <p>User data not found.</p>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Country: {user.country}</p>
      <p>State: {user.state}</p>
      <p>City: {user.city}</p>
      <p>Gender: {user.gender}</p>
      <p>Date of Birth: {user.dateOfBirth}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}

export default DisplayPage;