import React, { useEffect } from "react";
import axios from "../../../config/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "./categorymanager.css";
import { Space, Table, Tag, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
function CategoryManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listcategory, setListCategory] = useState([]);
  // const [newcategory, setNewCategory] = useState("");
  // const [detailcategory, setDetailCategory] = useState("");
  const [state, setState] = useState({
    id: "",
    newcategory: "",
    detailcategory: "",
  });

  const handleCancel = () => {
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
                  detailcategory: record.categoryName,
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

  const handleCreateNewCategory = async () => {
    const url = "/category/create-category";
    await axios
      .post(url, {
        categoryName: state.newcategory,
      })
      .then(function (response) {
        setState({ ...state, newcategory: "" });
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
  console.log(state);
  const onchangeInput = (event) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleDeleteCategory = async (id) => {
    const url = `/category/delete-category/${id}`;
    await axios
      .delete(url)
      .then(function (response) {
        getAllCategory();
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleUpdateCategory = async () => {
    const url = `/category/update-category/${state.id}`;
    console.log(state.detailcategory);
    await axios
      .put(url, { categoryName: state.detailcategory })
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
      <div>
        <span>Danh mục</span>
        <input
          value={state.newcategory}
          name="newcategory"
          type="text"
          id="category"
          onChange={onchangeInput}
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
      <>
        <Modal
          title="Thay đổi danh mục"
          open={isModalOpen}
          onOk={handleUpdateCategory}
          onCancel={handleCancel}
        >
          <span>ID</span>
          <input value={state.id} type="text" id="category" disabled />
          <br />
          <span>Danh mục</span>
          <input
            value={state.detailcategory}
            name="detailcategory"
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
