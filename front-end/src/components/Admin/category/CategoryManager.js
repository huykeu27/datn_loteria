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
    image: {},
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
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const getAllCategory = async () => {
    const url = "/category/get-all-category";
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
  const onChangeUpload = (e) => {
    console.log(e.file);
    setState({ ...state, image: e.file });
  };

  const handleCreateNewCategory = async () => {
    const url = "/category/create-category";
    // var formData = new FormData().append("img-cat");

    await axios
      .post(
        url,
        {
          categoryName: state.categoryName,
          file: state.image,
        }
        // {
        //   headers: { "Content-Type": "multipart/form-data" },
        //   processData: false,
        //   contentType: false,
        // }
      )
      .then(function (response) {
        setState({ ...state, categoryName: "", image: {} });
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
  const hanleAddCategory = () => {
    setShowForm(!showform);
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

    await axios
      .put(url, { categoryName: state.categoryName, enable: state.enable })
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

            <Form.Item label="Upload" valuePropName="fileList">
              {/* <Upload action={} listType="picture-card" onChange={onChangeUpload}>
                <div>
                  <PlusOutlined />
                  Upload
                </div>
              </Upload> */}
              <Upload
                listType="picture-card"
                maxCount={1}
                onChange={onChangeUpload}
              >
                <div>
                  <PlusOutlined />
                  Upload
                </div>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  handleCreateNewCategory();
                }}
              >
                Thêm mới
              </Button>
            </Form.Item>
          </Form>
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
          okText="Lưu thay đổi"
          cancelText="Hủy"
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

            <Form.Item label="Upload" valuePropName="fileList">
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item label="Trạng thái">
              <Switch checked={state.enable} onChange={onChangeSwitch} />
            </Form.Item>
          </Form>
        </Modal>
      </>
    </div>
  );
}

export default CategoryManager;
