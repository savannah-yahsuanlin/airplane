import axios from "axios";

// ACTION TYPES
const LOAD_PRODUCTS = "LOAD_PRODUCTS";
const FILTER_PRODUCTS = "FILTER_PRODUCTS";

// THUNK CREATORS
export const loadProducts = () => {
  return async (dispatch) => {
    const products = (await axios.get("/api/products")).data;
    dispatch({
      type: LOAD_PRODUCTS,
      products,
    });
  };
};

export const filterProducts = (alliance, checked) => {
  return async (dispatch) => {
    if (!checked) {
      const products = (await axios.get("/api/products")).data;
      dispatch({
        type: LOAD_PRODUCTS,
        products,
      });
    } else {
      const products = (await axios.get(`/api/products/${alliance}`)).data;
      dispatch({
        type: LOAD_PRODUCTS,
        products,
      });
    }
  };
};

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.products;
    case FILTER_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
