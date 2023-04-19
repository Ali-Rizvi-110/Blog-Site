import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function Register() {
  const [inputs, setInputs] = useState({ email: '', username: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [err, newErr] = useState(-1);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("/api/auth/register", inputs);
      // alert('User registered successfully!');
      newErr(1);

    } catch (error) {
      console.log(error);
      // alert('Error registering user.');
      newErr(0);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={inputs.email} onChange={handleChange} required />

        <label htmlFor="username">Username:</label>
        <input type="text" name="username" value={inputs.username} onChange={handleChange} required />

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={inputs.password} onChange={handleChange} required />

        <button type="submit" disabled={isSubmitting}>Register</button>
      </form>
      
      {err==-1 &&  <h3>Fill Details and click Register or <Link to="/login" >Login</Link> </h3> }
      {err==0 &&  <h3>User Already Exists</h3> }
      {err==1 &&  <h3>User Register Successfuly <Link to="/login" >Login!</Link>  </h3> }

    </div>
  ); 
}

export default Register;