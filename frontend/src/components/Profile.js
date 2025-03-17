import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const navigateToUpdatePassword = () => {
    navigate("/update-password");  
  };

  return (
    <div>
      <h2>User Profile</h2>
      <button onClick={navigateToUpdatePassword}>Update Password</button>
    </div>
  );
}

export default Profile;
