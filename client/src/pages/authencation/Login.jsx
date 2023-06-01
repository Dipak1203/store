import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  // Add your custom styles here
`;

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

      // Show success toast notification
      toast.success('Login successful');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password');

      // Show error toast notification
      toast.error('Invalid email or password');
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
      <div className="login">
        <h3>Login Page</h3>
        {error && <p className="error">{error}</p>}
        <form>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
          <button type="submit" onClick={handleClick}>
            Login
          </button>
        </form>
      </div>
      <ToastContainer /> {/* Add this component to render the toast notifications */}
    </Container>
  );
};

export default Login;
