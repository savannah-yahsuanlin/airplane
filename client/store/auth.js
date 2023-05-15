import axios from "axios";
import history from "../history";


const SET_AUTH = "SET_AUTH";
const TOKEN = "token";

const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, {
        username,
        password
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
      history.push('/')
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export const register = ({username, password}) => {
  return async dispatch => {
    const res = await axios.post(`/auth/register`, {username, password});
    const token = res.data.token;
    window.localStorage.setItem(TOKEN, token);
    dispatch({type: SET_AUTH, auth: res.data});
    history.push("/login");
  }
}


export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
