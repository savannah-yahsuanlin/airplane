import axios from "axios";

const LOAD_USERS = "LOAD_USERS";

export const loadUsers = () => {
  return async (dispatch) => {
    const users = (await axios.get("/api/users")).data;
    dispatch({
      type: LOAD_USERS,
      users,
    });
  };
};


export default function (state = [], action) {
  switch (action.type) {
    case LOAD_USERS:
      return action.users;
    default:
      return state;
  }
}
