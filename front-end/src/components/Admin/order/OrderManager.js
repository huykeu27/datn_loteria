import React, { useEffect, useState } from "react";
import "./ordermanager.css";
import axios from "../../../config/axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tag, Table } from "antd";
import { toast } from "react-toastify";
function OrderManager() {
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
      title: "Tổng tiền",
      dataIndex: "total",
      render: (total) => {
        return (
          <span>
            {Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(total)}
          </span>
        );
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Trạng thái",
      render: (record) => {
        console.log(record);
        return (
          <>
            <Tag
              color="yellow"
              style={{ cursor: "pointer", fontSize: 18 }}
              onClick={() => {
                acceptOrder(record._id);
                getListOrder();
              }}
            >
              Xác nhận
            </Tag>
          </>
        );
      },
    },
  ];

  const [listOrder, setListOrder] = useState();
  console.log(listOrder);
  const getListOrder = async () => {
    const url = "/api/order/list";
    await axios
      .get(url)
      .then((response) => {
        setListOrder(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getListOrder();
  }, []);
  const acceptOrder = async (id) => {
    try {
      let resp = axios.patch(`/api/order/${id}`, { status: true });
      getListOrder();
      toast.success("Đơn hàng đã được xác nhận");

      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="orders">
      <Table
        className="customer-table"
        columns={columns}
        dataSource={listOrder}
        rowKey="_id"
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10 "],
        }}
      />
    </div>
  );
}

export default OrderManager;
