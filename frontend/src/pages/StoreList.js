import React, { useState, useEffect } from "react";
import axios from "axios";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchStores();
  }, [sortField, sortOrder]);

  const fetchStores = async () => {
    try {
      const response = await axios.get(
        `/api/stores?sort=${sortField}&order=${sortOrder}`
      );
      setStores(response.data);
    } catch (error) {
      console.error("Error fetching stores", error);
    }
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <h2>Store List</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Store Name</th>
            <th onClick={() => handleSort("address")}>Address</th>
            <th onClick={() => handleSort("rating")}>Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store._id}>
              <td>{store.name}</td>
              <td>{store.address}</td>
              <td>{store.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;
