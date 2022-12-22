import React from "react";
import axios from "../../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Space, Table, Tag } from "antd";
import "./order.css";

function OrderSuccess() {
  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
    },
    {
      title: "Giỏ hàng",
      children: [
        {
          title: "Tên sản phẩm",
          key: "listProducts",
          dataIndex: "listProducts",
          render: (listProducts) => (
            <div className="listProduct-item">
              {listProducts?.map((item) => {
                return <span key={item._id}>{item.productId.name}</span>;
              })}
            </div>
          ),
        },
        {
          title: "Số lượng",
          key: "listProducts",
          dataIndex: "listProducts",
          render: (listProducts) => (
            <div className="listProduct-item">
              {listProducts?.map((item) => {
                return <span key={item._id}>{item.quantity}</span>;
              })}
            </div>
          ),
        },
        {
          title: "Đơn giá",
          key: "listProducts",
          dataIndex: "listProducts",
          render: (listProducts) => (
            <div className="listProduct-item">
              {listProducts?.map((item) => {
                return (
                  <span key={item._id}>
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.productId.price)}
                  </span>
                );
              })}
            </div>
          ),
        },
      ],
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
  ];
  const selector = useSelector((state) => state);
  const userId = JSON.parse(localStorage.getItem("info"))._id;
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
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={listOrder}
        pagination={{
          defaultPageSize: 4,
        }}
      />
    </div>
  );
}

export default OrderSuccess;
