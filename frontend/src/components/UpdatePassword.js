import React, { useState } from "react";
import styled from "styled-components";

const UpdatePasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 250px;
`;

const Button = styled.button`
  padding: 10px;
  width: 270px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = () => {
    if (newPassword === confirmPassword) {
      alert("Password updated successfully");
    } else {
      alert("Passwords do not match.");
    }
  };

  return (
    <UpdatePasswordContainer>
      <h2>Update Password</h2>
      <Input
        type="password"
        placeholder="Current Password"
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="New Password"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button onClick={handleUpdatePassword}>Update Password</Button>
    </UpdatePasswordContainer>
  );
}

export default UpdatePassword;
