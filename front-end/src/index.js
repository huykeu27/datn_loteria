import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mainReducer from "./reducers/RootReducer";

const defaultState = {
  products: [],
  cartProducts: [],
  categorys: [],
  myCart: [],
  combo: [{}],
  userinfo: {},
  CartID: "",
  role: "",
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "INFO-USER":
      return {
        ...state,
        userinfo: action.payload,
      };
    case "MY-CART":
      return {
        ...state,
        myCart: action.payload,
      };
    case "CART-ID":
      return {
        ...state,
        CartID: action.payload,
      };
    case "ROLE":
      return {
        ...state,
        role: action.payload,
      };

    case "ADD_TO_CART":
      return {
        ...state,
        myCart: [...state.myCart, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          (el) => el._id !== action.payload
        ),
      };
    case "INCREMENT_PRODUCT":
      return {
        ...state,
        myCart: state.myCart.map((item) => {
          if (item._id === action.payload.id) {
            item.quantity += action.payload.increment;
          }
          return item;
        }),
      };
    case "DECREMENT_PRODUCT":
      return {
        ...state,
        cartProducts: state.cartProducts.map((item) => {
          if (item._id === action.payload.id) {
            item.quantity -= action.payload.increment;
          }
          return item;
        }),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartProducts: [],
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  </Provider>
);
