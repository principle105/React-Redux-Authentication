import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const HomePage = ({login: {loggedIn,username}}) => {

  return (
    <div>
      <h1>Home Page</h1>
      {loggedIn ? (
        <div>
          <h1>You are logged in as {username}</h1>
        </div>
      ) : (
        null
      )}
    </div>
  )
}

export default withRouter(connect(store => store)(HomePage));