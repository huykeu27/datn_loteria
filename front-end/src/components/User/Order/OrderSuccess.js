import React from "react";
import axios from "../../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Space, Table, Tag } from "antd";
import "./order.css";

function OrderSuccess() {
  const selector = useSelector((state) => state);
  const userId = JSON.parse(localStorage.getItem("info")).id;
  const [listOrder, setListOrder] = useState([]);
  const getOrder = async () => {
    let resp = await axios.get(`/api/order/success/${userId}`);
    setListOrder(resp.data);
  };

  useEffect(() => {
    getOrder();
  }, []);
  return (
    <div className="order_success_content">
      {listOrder.map((item) => {
        return (
          <div className="order_item">
            <div className="item_order_product">
              {item.listProducts.map((product, index) => {
                return (
                  <div className="order_product" key={index}>
                    <span>
                      {product.productId.name}x{product.quantity}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="item_order_total">
              <span>{item.total}</span>
            </div>
            <div className="item_order_status">
              {item.status === true ? <span>Hoàn thành</span> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderSuccess;
