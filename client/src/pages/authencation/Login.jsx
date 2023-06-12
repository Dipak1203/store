import  { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const Login = ({ onLogin }) => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
      // Send login request to the server
      const response = await axios.post('http://localhost:8000/login', input);
      const { token, role } = response.data;
  
      // Save the JWT token and user role to local storage
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
  
      // Call onLogin function with the role
      onLogin(role);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid email or password', {
        position: toast.POSITION.TOP_CENTER
      });
      setError('Invalid email and password');
    }
  };
  

  // Check if user is already logged in
  const token = localStorage.getItem('token');
  if (token) {
    const userRole = localStorage.getItem('userRole');
    onLogin(userRole);
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Container>
     <LoginContainer className="login">
        <Title>Login Page</Title>
        {error && <p className="error">{error}</p>}
        <Form>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
          <Button type="submit" onClick={handleClick}>
            Login
          </Button>
        </Form>
      </LoginContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-item: center;
  flex-direction: column;
  text-align: center;
  
  .error{
    color:red;
  }
`;

const LoginContainer = styled.section`


`

const Title = styled.h2`
  font-size: 40px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 20px;
  margin-bottom: 15px;
  width: 270px;
`;

const Button = styled.button`
  padding: 10px 70px;
  background-color: #3496d7;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export default Login;
