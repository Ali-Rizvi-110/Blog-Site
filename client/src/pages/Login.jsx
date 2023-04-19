import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Login = () => {

  const [inputs, setInputs] = useState({ email: '', username: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [err, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const navigate = useNavigate();
  const {currentUser, login} = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/auth/login", inputs);
      // const response = await axios.post("http://localhost:8800/api/auth/login", inputs);
      console.log('Response:', response.data);
      await login(inputs);
      navigate("/");
    } catch (error) {
      console.log(error);
      console.error('Error:', error.response.data);
      setError(error.response.data);
    }
    setIsSubmitting(false);
  };
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} action="">
        <input required type="text" placeholder='username' name="username" onChange={handleChange} />
        <input required type="password" placeholder='password' name="password" onChange={handleChange} />
        <button>Login</button>
        <p>{err}</p>
        <span>Create an acccount :-  <Link to="/register" > Register</Link> </span>
      </form>
    </div>
  )
}

export default Login  