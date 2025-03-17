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

const StoreList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StoreItem = styled.li`
  background: #f8f8f8;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
`;

function UserDashboard() {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");

  useEffect(() => {
    const savedStores = JSON.parse(localStorage.getItem("stores")) || [];
    setStores(savedStores);
  }, []);

  const saveStores = (updatedStores) => {
    localStorage.setItem("stores", JSON.stringify(updatedStores));
    setStores(updatedStores);
  };

  const addStore = () => {
    if (storeName.length < 3 || storeAddress.length < 5) {
      alert("Store Name must be at least 3 characters & Address at least 5.");
      return;
    }

    const newStore = { name: storeName, address: storeAddress, rating: 0 };
    saveStores([...stores, newStore]);
    setStoreName("");
    setStoreAddress("");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <Container>
      <Title>User Dashboard</Title>
      <h3>Add a New Store</h3>
      <Input
        type="text"
        placeholder="Store Name"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Store Address"
        value={storeAddress}
        onChange={(e) => setStoreAddress(e.target.value)}
      />
      <Button onClick={addStore}>Add Store</Button>

      <h3>All Stores</h3>
      <StoreList>
        {stores.map((store, index) => (
          <StoreItem key={index}>
            <strong>{store.name}</strong> - {store.address}
          </StoreItem>
        ))}
      </StoreList>

      <Button onClick={handleLogout}>Logout</Button>
    </Container>
  );
}

export default UserDashboard;
