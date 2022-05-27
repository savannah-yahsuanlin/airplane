import React from "react";
import Routes from "./Routes";
import Home from "./components/Home";



const App = () => {
  if (!window.localStorage.getItem("wishList")) {
    window.localStorage.setItem("wishList", "[]");
  }

  return (
    <div>
      <Routes />
    </div>
  );
};

export default (App);
