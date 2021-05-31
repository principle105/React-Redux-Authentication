import React, {Suspense,lazy} from "react";
import {Switch,Route} from "react-router-dom";

import "./assets/css/main.css"

// Importing components
import NavBar from "./components/NavBar";

// Importing Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginOptions = lazy(() => import("./pages/LoginOptions"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Register = lazy(() => import("./pages/Register"));

const renderLoader = () => (
  <div></div>
);

export default function App() {

  return (
    <div id="pseudoBody">
      <NavBar />
      <Switch>
        <Route component={() => <Suspense fallback={renderLoader()}><HomePage /></Suspense>} exact path="/" />
        <Route component={() => <Suspense fallback={renderLoader()}><LoginOptions /></Suspense>} exact path="/login" />
        <Route component={() => <Suspense fallback={renderLoader()}><Register /></Suspense>} exact path="/register" />
        
        {/* 404 Page */}
        <Route component={() => <Suspense fallback={renderLoader()}><PageNotFound /></Suspense>} path="*" />
      </Switch>
    </div>
  );
}
