import React,{useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import axios from "axios";

const Register = ({login: {loggedIn}}) => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const register = () => {
    axios.post("/api/auth/local/register", {
      email: registerEmail,
      username: registerUsername,
      password: registerPassword
    })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    },{withCredentials:true});
  };
  return (
    <div>
      {loggedIn ? (
        null
      ) : (
        <div>
          <h1>Register</h1>
          <input
            placeholder="email"
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <input
            placeholder="username"
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
          <input
            placeholder="password"
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <button onClick={register}>Submit</button>
        </div>
      )}
      
    </div>
  )
}

export default withRouter(connect(store => store)(Register));