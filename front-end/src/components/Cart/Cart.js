import React from "react";
import "../Cart/cart.css";
import { useDispatch, useSelector } from "react-redux";
function Cart() {
  const selector = useSelector((state) => state);
  const dispath = useDispatch();
  const cartProducts = selector.cartProducts;
  function removeItem(id) {
    dispath({ type: "REMOVE_FROM_CART", payload: id });
  }
  function incrementProduct(id) {
    dispath({ type: "INCREMENT_PRODUCT", payload: { id, increment: 1 } });
  }
  function decrementProduct(id, inCart) {
    inCart <= 1
      ? removeItem(id)
      : dispath({ type: "DECREMENT_PRODUCT", payload: { id, increment: 1 } });
  }
  return (
    <div className="cart">
      {cartProducts.length > 0 ? (
        cartProducts.map((item) => (
          <div className="cartItem">
            <div className="cartItemImg">
              <img src={item.img} alt="" />
            </div>
            <div className="cartItemInfo">
              <h3>{item.name}</h3>
            </div>
            <div className="cartItemQuantity">
              <button onClick={() => decrementProduct(item.id, item.inCart)}>
                -
              </button>
              <span>{item.inCart}</span>
              <button onClick={() => incrementProduct(item.id, item.inCart)}>
                +
              </button>
            </div>
            <div className="cartItemPrice">
              <h3>{item.price}đ</h3>
              <span>Total:{item.price * item.inCart}</span>
            </div>
            <div className="removeCartItem">
              <button onClick={() => removeItem(item.id)}>
                <img
                  src="https://www.freeiconspng.com/thumbs/remove-icon-png/delete-dust-bin-erase-eraser-remove-icon-1.png"
                  alt=""
                />
              </button>
            </div>
          </div>
        ))
      ) : (
        <h2>Cart is empty</h2>
      )}
    </div>
  );
}

export default Cart;
