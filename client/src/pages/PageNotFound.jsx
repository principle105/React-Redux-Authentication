import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const PageNotFound = ({login: {loggedIn}}) => {
  return (
    <div>
      <h1>Page Not Found</h1>
    </div>
  )
}

export default withRouter(connect(store => store)(PageNotFound));