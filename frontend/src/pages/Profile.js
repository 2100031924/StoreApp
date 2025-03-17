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

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "Venkata Himavanth Gothala",
    email: "2100031924cseh@gmail.com",
    phone: "6302272467",
    education: "B.Tech CSE (AI & Intelligent Process Automation)",
  });

  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (storedProfile) setProfile(storedProfile);
  }, []);

  const handleEdit = () => setEditMode(true);
  const handleSave = () => {
    setProfile(editedProfile);
    localStorage.setItem("userProfile", JSON.stringify(editedProfile));
    setEditMode(false);
  };

  return (
    <Container>
      <Title>Profile Information</Title>
      {editMode ? (
        <>
          <Input
            type="text"
            value={editedProfile.name}
            onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
          />
          <Input
            type="email"
            value={editedProfile.email}
            onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
          />
          <Input
            type="text"
            value={editedProfile.phone}
            onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
          />
          <Input
            type="text"
            value={editedProfile.education}
            onChange={(e) => setEditedProfile({ ...editedProfile, education: e.target.value })}
          />
          <Button onClick={handleSave}>Save</Button>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Education:</strong> {profile.education}</p>
          <Button onClick={handleEdit}>Edit</Button>
        </>
      )}
    </Container>
  );
}

export default Profile;
