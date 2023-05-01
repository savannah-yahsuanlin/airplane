import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";

const AuthForm = (props) => {
  const { name, displayName, handleSubmit } = props;
  return (
    <div className="access-portal">
      <form onSubmit={handleSubmit} name={name}>
        <div className="access-portal-sub">
          <label htmlFor="username">Username</label>
          <input name="username" type="text" autoFocus="on" />
        </div>
        <div className="access-portal-sub">
          <label htmlFor="password">Password</label>
          <input name="password" type="password" />
        </div>
        <div>
          <button className="authBtn" type="submit">
            {displayName}
          </button>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
