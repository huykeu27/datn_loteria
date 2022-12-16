import React, { useEffect, useState } from "react";
import "./ordermanager.css";
import axios from "../../../config/axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tag, Table } from "antd";
function OrderManager() {
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Giỏ hàng",
      children: [
        {
          title: "Tên sản phẩm",
          dataIndex: "street",
          key: "street",
          width: 150,
        },
        {
          title: "Số lượng",
          render: (record) => {
            // record.listProducts.map((item) => {
            //   console.log(item);
            //   return (
            //     <>
            //       <span>1</span>
            //     </>
            //   );
            // });
            return <h1>1</h1>;
          },
        },
        {
          title: "Đơn giá",
        },
      ],
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Trạng thái",
      render: (record) => {
        return (
          <>
            {record.enable === true ? (
              <>
                <Tag color="green">Đang hoạt động</Tag>
              </>
            ) : (
              <>
                <Tag color="yellow">Xác nhận</Tag>
              </>
            )}
          </>
        );
      },
    },
  ];
  const colums2 = [
    {
      title: "tên sản phẩm",
      dataIndex: "_id",
    },
    {
      title: "Đơn giá",
      dataIndex: "_id",
    },
    {
      title: "Số lượng",
      dataIndex: "_id",
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
  return (
    <div className="orders">
      OrderManager
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
