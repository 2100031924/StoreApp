import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
`;

const Button = styled(Link)`
  background: linear-gradient(90deg, #ff6b6b, #ff8e53);
  color: white;
  padding: 12px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 18px;
  margin-top: 20px;
`;

function Home() {
  return (
    <HomeContainer>
      <h1 className="glow">Welcome to Store Rating Platform</h1>
      <Button to="/login">Get Started</Button>
    </HomeContainer>
  );
}

export default Home;
