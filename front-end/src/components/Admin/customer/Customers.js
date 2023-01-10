import React, { useState, useEffect } from "react";
import axios from "../../../config/axios";
import { Table, Modal } from "antd";
import "./customer.css";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { toast } from "react-toastify";

const Customers = () => {
  const { confirm } = Modal;
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
      render: (address) => (
        <div className="mng-address-item">
          {address?.map((item, index) => {
            return <span key={index}>{item}</span>;
          })}
        </div>
      ),
    },

    {
      title: "Hành động",
      render: (record) => {
        return (
          <>
            <DeleteOutlined
              onClick={() => {
                handleRemoveUser(record._id);
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
    const url = "/api/user/get-all-user";
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
    confirm({
      title: "Xóa người dùng khỏi hệ thống?",
      icon: <ExclamationCircleFilled />,
      // content: "Some descriptions",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk() {
        const url = `/api/user/remove-user/${id}`;
        axios
          .delete(url)
          .then(function (response) {
            toast.success("Xóa người dùng thành công");
            getAllUser();
            console.log(response);
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

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
