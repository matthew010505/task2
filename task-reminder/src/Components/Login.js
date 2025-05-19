import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // ✅ import navigate hook

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // ✅ create navigator

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://backend:8000/login', form);
      setMessage(res.data.message);
      console.log('User:', res.data.user);

      navigate('/home');
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Login failed');
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
