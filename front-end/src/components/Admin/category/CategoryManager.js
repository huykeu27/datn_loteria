import React, { useEffect } from "react";
import axios from "../../../config/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "./categorymanager.css";
import { Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
function CategoryManager() {
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Danh mục",
      dataIndex: "categoryName",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Hành động",
      render: (record) => {
        return (
          <>
            <EditOutlined />
            <DeleteOutlined
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

  // const [listproduct, setListproduct] = useState([]);
  const [listcategory, setListCategory] = useState([]);
  const [newcategory, setNewCategory] = useState("");
  useEffect(() => {
    const getAllCategory = async () => {
      const url = "/category/get-all-category";
      await axios
        .get(url)
        .then((res) => {
          buildData(res.data.listCategories);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllCategory();
  }, [newcategory]);

  const buildData = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((item) => {
        let obj = {};
        obj._id = item._id;
        obj.categoryName = item.categoryName;
        obj.status =
          item.enable === true ? "Đang hoạt động" : "Ngưng hoạt động";
        result.push(obj);
      });
    }
    setListCategory(result);
  };

  const handleCreateNewCategory = async () => {
    const url = "/category/create-category";
    await axios
      .post(url, {
        categoryName: newcategory,
      })
      .then(function (response) {
        toast.success("Thêm sản phẩm thành công");
      })
      .catch(function (err) {
        if (err.response.data.errcode === 1) {
          toast.warning("Điền đầy đủ thông tin");
        } else if (err.response.data.errcode === 2) {
          toast.error("Danh mục đã tồn tại");
        }
      });
  };

  const onchangeInput = (e) => {
    setNewCategory(e.target.value);
  };

  return (
    <div className="category-manager">
      <div>
        <span>name</span>
        <input
          type="text"
          id="category"
          onChange={(e) => {
            onchangeInput(e);
          }}
        />
      </div>

      <button
        onClick={() => {
          handleCreateNewCategory();
        }}
      >
        thêm
      </button>

      <Table
        className="customer-table"
        columns={columns}
        dataSource={listcategory}
        rowKey="_id"
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10 ", "15"],
        }}
      />
    </div>
  );
}

export default CategoryManager;
