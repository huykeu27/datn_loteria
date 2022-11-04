import React from "react";

import { Space, Table, Tag } from "antd";
import "./customer.css";

const columns = [
  {
    title: "FullName",
    dataIndex: "name",

    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Tags",

    dataIndex: "tags",
  },
  {
    title: "Action",

    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
const Customers = () => {
  return (
    <div className="customer">
      <Table
        className="customer-table"
        columns={columns}
        dataSource={data}
        rowKey="key"
      />
    </div>
  );
};

export default Customers;
