import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    axios({
      method: "POST",
      url: "http://localhost:3001/api/user/login",
      data: user,
      headers: {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}
    })
    .then((res) => {
        console.log(res.data)
        localStorage.setItem('token', res.data);
        props.history.push('/dashboard')
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      }
    });
  };
  return (
    <LoginContainer>
      <h1>login!</h1>
      <Input
        type="text"
        value={user.email}
        placeholder="enter your email"
        onChange={(e) =>
          setUser({
            ...user,
            email: e.target.value,
          })
        }
      />
      <Input
        type="password"
        value={user.password}
        placeholder="enter your password"
        onChange={(e) =>
          setUser({
            ...user,
            password: e.target.value,
          })
        }
      />
      <Button onClick={handleLogin}>Login</Button>
    </LoginContainer>
  );
};
export default Login;

const LoginContainer = styled.div`
  padding: 50px;
  background-color: yellow;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 10px 20px;
  margin-top: 20px;
`;
const Input = styled.input`
  width: 200px;
  padding: 10px 20px;
  border: 1px solid black;
  border-radius: 5px;
  background: transparent;
  margin-top: 20px;
`;
