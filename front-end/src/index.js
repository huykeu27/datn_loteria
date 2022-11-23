import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultState = {
  products: [
    // {
    //   id: "63568d2697be854e9d420439",
    //   name: "Burger Gà Thượng Hạng",
    //   img: "https://dscnnwjxnwl3f.cloudfront.net/media/catalog/product/b/u/burger-534x374px_chicken-burger_1.png",
    //   price: 46000,
    //   inCart: 1,
    //   category: {
    //     categoryName: "burger",
    //   },
    // },
    // {
    //   id: "63568d2697be854e9d420436",
    //   name: "Burger Double Double",
    //   img: "https://dscnnwjxnwl3f.cloudfront.net/media/catalog/product/b/u/burger-534x374px_ddouble-burger_1.png",
    //   price: 59000,
    //   inCart: 1,
    //   category: {
    //     categoryName: "burger",
    //   },
    // },
    // {
    //   id: "63568d2697be854e9d42043a",
    //   name: "Burger Bulgogi",
    //   img: "https://dscnnwjxnwl3f.cloudfront.net/media/catalog/product/b/u/burger-534x374px_bulgogi-burger_1.png",
    //   price: 45000,
    //   inCart: 1,
    //   category: {
    //     categoryName: "burger",
    //   },
    // },
    // {
    //   id: "63568d2697be854e9d420437",
    //   name: "Burger Mozzarella",
    //   img: "https://dscnnwjxnwl3f.cloudfront.net/media/catalog/product/b/u/burger-534x374px_mozzarella-burger_3.png",
    //   price: 62000,
    //   inCart: 1,
    //   category: {
    //     categoryName: "burger",
    //   },
    // },
    // {
    //   id: "63568d2697be854e9d420438",
    //   name: "Burger Tôm",
    //   img: "https://dscnnwjxnwl3f.cloudfront.net/media/catalog/product/b/u/burger-534x374px_shrimp-burger_1.png",
    //   price: 46000,
    //   inCart: 1,
    //   category: {
    //     categoryName: "burger",
    //   },
    // },
  ],
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
  combo: [{}],
  userinfo: {},
};
// userLogin: function(state, action) {

//   getCookie('tiki-user', JSON.stringify(action.payload))
//   return action.payload;
// },
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "INFO-USER":
      return {
        ...state,
        userinfo: window.localStorage.getItem(
          "user",
          JSON.stringify(action.payload)
        ),
      };

    case "ADD_TO_CART":
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload],
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
        cartProducts: state.cartProducts.map((item) => {
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
  <React.StrictMode>
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
  </React.StrictMode>
);
