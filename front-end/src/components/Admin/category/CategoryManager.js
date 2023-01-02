import React, { useEffect } from "react";
import axios from "../../../config/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "./categorymanager.css";
import {
  Table,
  Modal,
  Tag,
  Switch,
  Form,
  Input,
  Button,
  Upload,
  uploadButton,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

function CategoryManager() {
  const [showform, setShowForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listcategory, setListCategory] = useState([]);
  const [state, setState] = useState({
    id: "",
    categoryName: "",
    categorythump: "",
    imageUrl: "",
    enable: true,
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
      title: "Ảnh",
      render: (record) => {
        return (
          <>
            <img src={record.imageUrl} alt="" width={60} height={60} />
          </>
        );
      },
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
                <Tag color="red">Ngưng hoạt động</Tag>
              </>
            )}
          </>
        );
      },
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
                  enable: record.enable,
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
    const url = "/api/category/get-all-category";
    await axios
      .get(url)
      .then((res) => {
        setListCategory(res.data.listCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllCategory();
  }, [state]);

  const onchangeInput = (event) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const onChangeSwitch = (checked) => {
    setState({ ...state, enable: checked });
  };

  const handleCreateNewCategory = () => {
    let url = "/api/category/create-category";
    const form = document.querySelector(".form-create");
    const formData = new FormData(form);
    formData.append("categoryName", state.categoryName);

    axios
      .post(url, formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
        },
      })
      .then((response) => {
        console.log(response);
        setState({ ...state, categoryName: "", categorythump: "" });
        toast.success("Thêm danh mục thành công");
      })
      .catch((err) => {
        if (err.response.data.errcode === 1) {
          toast.warning("Điền đầy đủ thông tin");
        } else if (err.response.data.errcode === 2) {
          toast.error("Danh mục đã tồn tại");
        }
      });
  };
  const hanleAddCategory = () => {
    setShowForm(!showform);
  };
  const handleDeleteCategory = async (id) => {
    const url = `/api/category/delete-category/${id}`;
    await axios
      .delete(url)
      .then(function (response) {
        toast.success("Xóa danh mục thành công");
        getAllCategory();
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.errcode === 1) {
          toast.warning("Điền đầy đủ thông tin");
        } else if (err.response.data.errcode === 2) {
          toast.error("Danh mục đã tồn tại");
        }
      });
  };

  const handleUpdateCategory = async () => {
    const url = `/api/category/update-category/${state.id}`;
    const form = document.querySelector(".form-update");
    const formData = new FormData(form);
    formData.append("categoryName", state.categoryName);
    formData.append("enable", state.enable);
    await axios
      .patch(url, formData)
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
      <div className="add-new-category">
        <span>Thêm mới danh mục</span>
        <PlusOutlined onClick={hanleAddCategory} />
      </div>
      {showform && (
        <div className="create-new-category">
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
            <Form.Item label="Danh mục">
              <Input
                value={state.categoryName}
                name="categoryName"
                type="text"
                id="category"
                onChange={onchangeInput}
              />
            </Form.Item>
          </Form>
          <form
            action="/stats"
            // enctype="multipart/form-data"
            method="post"
            className="form-create"
          >
            <div>
              <span>Ảnh minh họa</span>
            </div>
            <input
              type="file"
              className="form-control-file"
              name="categorythump"
            />
          </form>
          <Button
            type="primary"
            onClick={() => {
              handleCreateNewCategory();
            }}
          >
            Thêm mới
          </Button>
        </div>
      )}

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
          width={850}
          okText="Cập nhật"
          cancelText="Hủy bỏ"
        >
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
            <Form.Item label="ID">
              <Input
                value={state.id}
                type="text"
                id="category"
                disabled
              ></Input>
            </Form.Item>
            <Form.Item label="Danh mục">
              <Input
                value={state.categoryName}
                name="categoryName"
                type="text"
                id="category"
                onChange={onchangeInput}
              />
            </Form.Item>

            <Form.Item label="Trạng thái">
              <Switch checked={state.enable} onChange={onChangeSwitch} />
            </Form.Item>
          </Form>
          <form
            action="/stats"
            // enctype="multipart/form-data"
            method="post"
            className="form-update"
          >
            <input
              type="file"
              className="form-control-file"
              name="categorythump"
            />
          </form>
        </Modal>
      </>
    </div>
  );
}

export default CategoryManager;
