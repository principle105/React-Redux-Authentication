import React,{useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import axios from "axios";

const LoginOptions = ({login: {loggedIn}}) => {
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const login = () => {
    axios.post("/api/auth/local/login", {
      email: loginEmail,
      password: loginPassword,
    })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  };
  return (
    <div>
      {loggedIn ? (
        null
      ) : (
        <div>
          <h1>Login Options</h1>
          <ul>
            <li><a href="/api/auth/discord/login">Discord</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
          <h1>Login</h1>
          <input
            placeholder="email"
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            placeholder="password"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button onClick={login}>Submit</button>
        </div>
      )}
      
    </div>
  )
}

export default withRouter(connect(store => store)(LoginOptions));