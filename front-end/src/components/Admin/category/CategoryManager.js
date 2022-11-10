import React, { useEffect } from "react";
import axios from "../../../config/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "./categorymanager.css";
import { Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function CategoryManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listcategory, setListCategory] = useState([]);
  const [state, setState] = useState({
    id: "",
    categoryName: "",
  });

  const handleCancel = () => {
    setState({ ...state, categoryName: "" });
    setIsModalOpen(false);
  };
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
            <EditOutlined
              onClick={() => {
                setState({
                  ...state,
                  id: record._id,
                  categoryName: record.categoryName,
                });
                setIsModalOpen(true);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                if (window.confirm("Bạn chắc chắn muốn xóa không???")) {
                  handleDeleteCategory(record._id);
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
  useEffect(() => {
    getAllCategory();
  }, [state]);

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

  const onchangeInput = (event) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleCreateNewCategory = async () => {
    const url = "/category/create-category";
    await axios
      .post(url, {
        categoryName: state.categoryName,
      })
      .then(function (response) {
        setState({ ...state, categoryName: "" });
        toast.success("Thêm danh mục thành công");
      })
      .catch(function (err) {
        if (err.response.data.errcode === 1) {
          toast.warning("Điền đầy đủ thông tin");
        } else if (err.response.data.errcode === 2) {
          toast.error("Danh mục đã tồn tại");
        }
      });
  };

  const handleDeleteCategory = async (id) => {
    const url = `/category/delete-category/${id}`;
    await axios
      .delete(url)
      .then(function (response) {
        toast.success("Xóa danh mục thành công");
        getAllCategory();
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleUpdateCategory = async () => {
    const url = `/category/update-category/${state.id}`;
    console.log(state.categoryName);
    await axios
      .put(url, { categoryName: state.categoryName })
      .then((response) => {
        toast.success("Update thành công");
        getAllCategory();
        setIsModalOpen(false);
      })
      .catch((err) => {
        if (err.response.data.errcode === 1) {
          toast.warning("Không được để trống");
        } else if (err.response.data.errcode === 2) {
          toast.error("Danh mục đã tồn tại");
        } else {
          alert("Không xác định");
        }
        console.log(err);
      });
  };
  return (
    <div className="category-manager">
      <div className="create-new-category">
        <input
          placeholder="Tên danh mục"
          className="form__field"
          value={state.categoryName}
          name="categoryName"
          type="text"
          id="category"
          onChange={onchangeInput}
        />
        <div className="add-category">
          <button
            className="submit"
            onClick={() => {
              handleCreateNewCategory();
            }}
          >
            thêm
          </button>
        </div>
      </div>

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
      <>
        <Modal
          title="Thông tin danh mục"
          open={isModalOpen}
          onOk={handleUpdateCategory}
          onCancel={handleCancel}
        >
          <span>ID</span>
          <input value={state.id} type="text" id="category" disabled />
          <br />
          <span>Danh mục</span>
          <input
            value={state.categoryName}
            name="categoryName"
            type="text"
            id="category"
            onChange={onchangeInput}
          />
        </Modal>
      </>
    </div>
  );
}

export default CategoryManager;
