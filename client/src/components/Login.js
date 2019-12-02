import React, { useState } from "react";
import axios from "axios";

const Login = ({ history }) => {
  console.log(history)
  const [creds, setCreds] = useState({
    username: "",
    password: ""
  })

  const handleChange = e => {
    setCreds({ ...creds, 
    [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', creds)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.payload);
        history.push("/protected")
      })
      .catch (err => console.log(err.response));
  };


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input type="text"
                name="username"
                placeholder="username"
                onChange={handleChange}
                value={creds.username} />
        <input type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                value={creds.password} />
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Login;
