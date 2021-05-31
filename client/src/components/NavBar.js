import React from "react";
import {connect} from "react-redux";
import {withRouter,NavLink} from "react-router-dom";

const NavBar = ({login: {loggedIn,displayName,username}}) => {

  return (
    <div>
      <ul>
        <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
        {loggedIn ? (
          <div>
            <li><button onClick={() => window.location.href="/api/auth/logout"}>Logout</button></li>
          </div>
        ) : (
          <div>
            <li><NavLink to="/login" exact activeClassName="active">Login</NavLink></li>
          </div>
        )
        }
      </ul>
    </div>
  )
}

export default withRouter(connect(store => store)(NavBar));
