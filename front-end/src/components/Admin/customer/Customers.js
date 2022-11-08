import React, { useState, useEffect } from "react";
import axios from "../../../config/axios";
import { Space, Table, Tag } from "antd";
import "./customer.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const Customers = () => {
  const [listuser, setListUser] = useState();
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Tên người dùng",
      dataIndex: "fullName",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Tags",

      dataIndex: "tags",
    },
    {
      title: "Hành động",
      render: (record) => {
        return (
          <>
            <EditOutlined />
            <DeleteOutlined
              onClick={() => {
                if (window.confirm("Bạn chắc chắn muốn khóa không???")) {
                  handleRemoveUser(record._id);
                }
              }}
              style={{
                color: "red",
                marginLeft: 15,
              }}
            />
          </>
        );
      },
    },
  ];
  const getAllUser = async () => {
    const url = "/user/get-all-user";
    await axios
      .get(url)
      .then((response) => {
        setListUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllUser();
  }, []);

  const handleRemoveUser = async (id) => {
    const url = `/user/remove-user/${id}`;
    await axios
      .delete(url)
      .then(function (response) {
        toast.success("Xóa danh mục thành công");
        getAllUser();
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  console.log(listuser);
  return (
    <div className="customer">
      <Table
        className="customer-table"
        columns={columns}
        dataSource={listuser}
        rowKey="_id"
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10 "],
        }}
      />
    </div>
  );
};

export default Customers;
