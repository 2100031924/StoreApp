import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  background: #f8f8f8;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 5px;
`;

const Star = styled.span`
  font-size: 20px;
  color: ${({ active }) => (active ? "#f39c12" : "#ccc")};
`;

const Button = styled.button`
  padding: 10px 15px;
  margin-top: 10px;
  background: #16a085;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background: #13876c;
  }
`;

function StoreDashboard() {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const sampleRatings = [
      { user: "John Doe", rating: 4 },
      { user: "Jane Smith", rating: 5 },
      { user: "Alice Brown", rating: 3 },
      { user: "Michael Scott", rating: 5 },
      { user: "Dwight Schrute", rating: 2 }
    ];

    setRatings(sampleRatings);

    const total = sampleRatings.reduce((sum, r) => sum + r.rating, 0);
    setAverageRating((total / sampleRatings.length).toFixed(1));
  }, []);

  const handleUpdatePassword = () => {
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    alert("Password updated successfully!");
    setNewPassword("");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <Container>
      <Title>Store Owner Dashboard</Title>
      <h3>Average Store Rating: ⭐ {averageRating}</h3>

      <h4>Users Who Rated Your Store:</h4>
      <List>
        {ratings.map((r, index) => (
          <ListItem key={index}>
            {r.user} - 
            <Stars>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} active={star <= r.rating}>★</Star>
              ))}
            </Stars>
          </ListItem>
        ))}
      </List>

      <h4>Update Password</h4>
      <Input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button onClick={handleUpdatePassword}>Update Password</Button>

      <Button onClick={handleLogout}>Logout</Button>
    </Container>
  );
}

export default StoreDashboard;
