import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../firebase";
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 50px;
`;

const RightPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #16a085, #2ecc71);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const LoginBox = styled.div`
  width: 350px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: gray;
  margin-bottom: 20px;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;
`;

const SocialButton = styled.button`
  background: #f5f5f5;
  border: none;
  padding: 10px 15px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #ddd;
  }

  svg {
    font-size: 18px;
    color: #555;
  }
`;

const Divider = styled.div`
  width: 100%;
  text-align: center;
  margin: 10px 0;
  font-size: 12px;
  color: gray;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  padding-right: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 14px;
`;

const EyeIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #16a085;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 10px;

  &:hover {
    background: #13876c;
  }
`;

const SignupSection = styled.div`
  margin-top: 20px;
  font-size: 14px;

  a {
    color: #16a085;
    text-decoration: none;
    font-weight: bold;
  }
`;

const RightText = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const RightDescription = styled.p`
  font-size: 14px;
  margin-top: 10px;
  max-width: 70%;
`;

const SignUpButton = styled.button`
  background: white;
  color: #16a085;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 15px;
  transition: 0.3s;

  &:hover {
    background: #f5f5f5;
  }
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault(); 
  
    const validUsers = [
      { email: "admin@example.com", password: "Admin@123", role: "admin" },
      { email: "user@example.com", password: "User@123", role: "user" },
      { email: "store@example.com", password: "Store@123", role: "store_owner" }
    ];
  
    const user = validUsers.find((u) => u.email === email && u.password === password);
  
    if (user) {
      alert(`Login Successful! Role: ${user.role}`);
      
      if (user.role === "admin") {
        navigate("/dashboard");
      } else if (user.role === "user") {
        navigate("/stores");
      } else {
        navigate("/store-dashboard");
      }
    } else {
      alert("Invalid Credentials! Please try again.");
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      alert(`Google Login Successful! Welcome, ${user.displayName}`);
      navigate("/dashboard"); // Redirect after login
    } catch (error) {
      alert("Google Login Failed: " + error.message);
    }
  };
  
  // Facebook Login Function
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      alert(`Facebook Login Successful! Welcome, ${user.displayName}`);
      navigate("/dashboard"); // Redirect after login
    } catch (error) {
      alert("Facebook Login Failed: " + error.message);
    }
  };

  return (
    <Container>
      <LeftPanel>
        <LoginBox>
          <Title>Login to Your Account</Title>
          <Subtitle>Login using social networks</Subtitle>
          <SocialIcons>
  <SocialButton onClick={handleFacebookLogin}>
    <FontAwesomeIcon icon={faFacebookF} />
  </SocialButton>
  <SocialButton onClick={handleGoogleLogin}>
    <FontAwesomeIcon icon={faGoogle} />
  </SocialButton>
</SocialIcons>

          <Divider>OR</Divider>
          <InputGroup>
            <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </InputGroup>
          <InputGroup>
            <Input type={passwordVisible ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <EyeIcon onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </EyeIcon>
          </InputGroup>
          <Button onClick={handleLogin}>Sign In</Button>
          <SignupSection>
            New Here? <a href="/register">Sign Up</a>
          </SignupSection>
        </LoginBox>
      </LeftPanel>
      <RightPanel>
        <RightText>New Here?</RightText>
        <RightDescription>Sign up and discover a great amount of new opportunities!</RightDescription>
        <SignUpButton onClick={() => navigate("/register")}>Sign Up</SignUpButton>
      </RightPanel>
    </Container>
  );
}

export default Login;
