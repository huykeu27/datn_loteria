import React, { useEffect } from "react";
import axios from "../../../config/axios";
import { useState } from "react";
import { toast } from "react-toastify";

import "./productmanager.css";
import { Table, Modal, Form, Input, Select, Button, Upload } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import FormDisabledDemo from "./FormDisabledDemo";

function ProductManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [listproducts, setListProducts] = useState([]);
  const [listcategory, setListCategory] = useState([]);
  const [state, setState] = useState({
    id: "",
    productname: "",
    categoryId: "",
    price: "",
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Ngày phát hành",
      dataIndex: "createdAt",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
    },
    {
      title: "Danh mục",
      dataIndex: ["categoryId", "categoryName"],
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
                  productname: record.name,
                  price: record.price,
                });
                setIsModalOpen(true);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                if (window.confirm("Bạn chắc chắn muốn xóa không???")) {
                  handleDeleteProduct(record._id);
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

  const getAllProduct = async () => {
    const url = "/product/get-all-product";
    await axios
      .get(url)
      .then((response) => {
        setListProducts(response.data.listProducts);
        // buildData(res.data.listCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllCategory = () => {
    const url = "/category/get-all-category";
    axios
      .get(url)
      .then((res) => {
        setListCategory(res.data.listCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllProduct();
    getAllCategory();
  }, [state]);
  const hanleAddProduct = () => {
    setShowForm(!showForm);
  };
  const onChangeValue = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const onChangSelect = (value) => {
    setState((prevState) => {
      return {
        ...prevState,
        categoryId: value,
      };
    });
  };

  const handleCancel = () => {
    setState({ ...state, productname: "", categoryId: "", price: 0 });
    setIsModalOpen(false);
  };
  const handleCreateNewProduct = async () => {
    const url = "/product/create-product";
    await axios
      .post(url, {
        name: state.productname,
        categoryId: state.categoryId,
        price: state.price,
      })
      .then(function (response) {
        if (response.data.product) {
          setState({ ...state, productname: "", categoryId: "", price: 0 });
          toast.success("Thêm sản phẩm thành công", {
            theme: "colored",
          });
        }
      })
      .catch(function (error) {
        if (error.response.data.errCode === 1) {
          toast.error("Mời nhập đầy đủ thông tin", {
            theme: "colored",
          });
        } else if (error.response.data.errCode === 2) {
          toast.error("Sản phẩm đã tồn tại", {
            theme: "colored",
          });
        } else {
          alert("Không xác định");
        }
      });
  };

  const handleDeleteProduct = async (id) => {
    const url = `/product/delete-product/${id}`;
    await axios
      .delete(url)
      .then(function (response) {
        toast.success("Xóa danh mục thành công");
        getAllProduct();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleUpdateProduct = async () => {
    const url = `/product/update-product/${state.id}`;
    await axios
      .put(url, {
        name: state.productname,
        price: state.price,
        categoryId: state.categoryId,
      })
      .then((response) => {
        toast.success("Update thành công");
        getAllProduct();
        setIsModalOpen(false);
      })
      .catch((err) => {
        if (err.response.data.errcode === 1) {
          toast.warning("Mời nhập đầy đủ thông tin", {
            theme: "colored",
          });
        } else if (err.response.data.errcode === 2) {
          toast.warning("Sản phẩm đã tồn tại", {
            theme: "colored",
          });
        } else {
          alert("Không xác định");
        }
        console.log(err);
      });
  };
  return (
    <div className="product-manager ">
      <div className="add-new-product">
        <span>Thêm mới sản phẩm</span>
        <PlusOutlined onClick={hanleAddProduct} />
      </div>

      {showForm && (
        <div className="form-create-product">
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
            <Form.Item label="Input">
              <Input
                placeholder="Tên sản phẩm"
                value={state.productname}
                name="productname"
                type="text"
                id="product"
                onChange={(e) => {
                  onChangeValue(e);
                }}
              />
            </Form.Item>
            <Form.Item label="Select">
              <Select
                value={state.categoryId}
                options={listcategory.map((item) => ({
                  value: item._id,
                  label: item.categoryName,
                  disabled: item.enable === true ? false : true,
                }))}
                onChange={onChangSelect}
              ></Select>
            </Form.Item>

            <Form.Item label="Giá">
              <Input
                min={1}
                value={state.price}
                name="price"
                type="number"
                id="price"
                placeholder="VNĐ"
                onChange={(e) => {
                  onChangeValue(e);
                }}
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

            <Button
              type="primary"
              onClick={() => {
                handleCreateNewProduct();
              }}
            >
              Thêm mới
            </Button>
          </Form>
        </div>
      )}

      <Table
        className="customer-table"
        columns={columns}
        dataSource={listproducts}
        rowKey="_id"
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10 ", "15"],
        }}
      />
      <Modal
        title="Thông tin sản phẩm"
        open={isModalOpen}
        onOk={handleUpdateProduct}
        onCancel={handleCancel}
      >
        <span>ID</span>
        <input value={state.id} type="text" id="idproduct" disabled />
        <br />
        <span>Tên sản phẩm</span>
        <input
          value={state.productname}
          name="productname"
          type="text"
          id="product-name"
          onChange={onChangeValue}
        />
        <span>Giá</span>
        <input
          value={state.price}
          name="price"
          type="text"
          id="product-price"
          placeholder="VNĐ"
          onChange={onChangeValue}
        />
        <select
          value={state.categoryId}
          name="categoryId"
          id=""
          onChange={(e) => {
            onChangeValue(e);
          }}
        >
          <option value="">Danh mục</option>
          {listcategory &&
            listcategory.length > 0 &&
            listcategory.map((item) => (
              <option value={item._id} key={item._id}>
                {item.categoryName}
              </option>
            ))}
        </select>
      </Modal>
      {/* <FormDisabledDemo /> */}
    </div>
  );
}

export default ProductManager;
