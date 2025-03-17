import React, { useState } from "react";
import styled from "styled-components";

const StoreListContainer = styled.div`
  padding: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 250px;
`;

const StoreItem = styled.div`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

function StoreList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stores, setStores] = useState([
    { name: "Store 1", address: "123 Main St" },
    { name: "Store 2", address: "456 Oak St" },
    { name: "Store 3", address: "789 Pine St" },
  ]);

  const handleSearch = () => {
    const filteredStores = stores.filter(
      (store) =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setStores(filteredStores);
  };

  return (
    <StoreListContainer>
      <h2>Registered Stores</h2>
      <Input
        type="text"
        placeholder="Search by name or address"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {stores.map((store, index) => (
        <StoreItem key={index}>
          <p><strong>Name:</strong> {store.name}</p>
          <p><strong>Address:</strong> {store.address}</p>
        </StoreItem>
      ))}
    </StoreListContainer>
  );
}

export default StoreList;
