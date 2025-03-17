import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RegisterContainer = styled.div`
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

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    // Add logic to register the user to your backend here
    alert(`Registered: ${name}, ${email}, ${address}`);
    navigate("/login"); // Redirect to login page
  };

  return (
    <RegisterContainer>
      <h2 className="glow">Register</h2>
      <Input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleRegister}>Register</Button>
    </RegisterContainer>
  );
}

export default Register;
