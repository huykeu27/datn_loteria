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
  categorys: [
    // {
    //   id: {
    //     $oid: "6356db9b19f30142469b57a1",
    //   },
    //   categorylink: "rice",
    //   categoryName: "Cơm-Mì Ý",
    //   thump:
    //     "https://www.lotteria.vn/media/catalog/tmp/category/Promotion-08_1.jpg",
    // },
    // {
    //   id: {
    //     $oid: "6356db9b19f30142469b579f",
    //   },
    //   categorylink: "burger",
    //   categoryName: "Burger",
    //   thump:
    //     "https://www.lotteria.vn/media/catalog/tmp/category/Promotion-04_1.jpg",
    // },
    // {
    //   id: {
    //     $oid: "6356db9b19f30142469b57a3",
    //   },
    //   categorylink: "drinks",
    //   categoryName: "Thức uống",
    //   thump:
    //     "https://www.lotteria.vn/media/catalog/tmp/category/Promotion-10_1.jpg",
    // },
    // {
    //   id: {
    //     $oid: "6356db9b19f30142469b57a0",
    //   },
    //   categorylink: "chicken",
    //   categoryName: "Gà rán",
    //   thump:
    //     "https://www.lotteria.vn/media/catalog/tmp/category/BG-Menu-Chicken-01-01_1.jpg",
    // },
    // {
    //   id: {
    //     $oid: "6356db9b19f30142449b57a0",
    //   },
    //   categorylink: "chicken-set",
    //   categoryName: "Gà rán phần",
    //   thump:
    //     "https://www.lotteria.vn/media/catalog/tmp/category/Promotion-03_2.jpg",
    // },
    // {
    //   id: {
    //     $oid: "6356db9b19f30142469b57a2",
    //   },
    //   categorylink: "dessert",
    //   categoryName: "Thức ăn nhẹ",
    //   thump:
    //     "https://www.lotteria.vn/media/catalog/tmp/category/BG-Menu-09_1.jpg",
    // },
    // {
    //   id: {
    //     $oid: "6356db9b19f30142469b27a2",
    //   },
    //   ategorylink: "value",
    //   categoryName: "Value",
    //   thump:
    //     "https://www.lotteria.vn/media/catalog/tmp/category/BG-Menu-07_1.jpg",
    // },
    // {
    //   id: {
    //     $oid: "6356db9b19f3014q469b27a2",
    //   },
    //   categoryName: "Combo",
    //   thump:
    //     "https://www.lotteria.vn/media/catalog/tmp/category/BG-Menu-06_1.jpg",
    // },
  ],
  myCart: [],
  combo: [{}],
  userinfo: {},
  CartID: "",
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
