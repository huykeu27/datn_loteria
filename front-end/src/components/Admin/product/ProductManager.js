import React, { useEffect } from "react";
import axios from "../../../config/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "./productmanager.css";
import { Table, Modal, Form, Input, Select, Button, Upload } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

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

  console.log(state);
  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "_id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Ảnh sản phẩm",
      render: (record) => {
        return (
          <>
            <img src={record.imageUrl} alt="" width={80} height={60} />
          </>
        );
      },
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
      filters: listcategory.map((item) => {
        return {
          text: item.categoryName,
          value: item.categoryName,
        };
      }),
      onFilter: (value, record) =>
        record.categoryId.categoryName.indexOf(value) === 0,
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
                  categoryId: record.categoryId._id,
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
    const form = document.querySelector(".form-create");
    const formData = new FormData(form);
    formData.append("name", state.productname);
    formData.append("categoryId", state.categoryId);
    formData.append("price", state.price);

    await axios
      .post(url, formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
        },
      })
      .then(function (response) {
        setState({
          ...state,
          productname: "",
          categoryId: "",
          price: 0,
        });
        getAllProduct();
        toast.success("Thêm sản phẩm thành công", {
          theme: "colored",
        });
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
    const form = document.querySelector(".form-update");
    const formData = new FormData(form);
    formData.append("name", state.productname);
    formData.append("categoryId", state.categoryId);
    formData.append("price", state.price);
    await axios
      .put(url, formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
        },
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
            <Form.Item label="Tên sản phẩm">
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
            <Form.Item label="Chọn danh mục">
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

            {/* <Form.Item label="Upload" valuePropName="fileList">
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
            </Form.Item> */}
          </Form>
          <form action="/stats" method="post" className="form-create">
            <input
              type="file"
              className="form-control-file"
              name="productThump"
            />
          </form>
          <Button
            type="primary"
            onClick={() => {
              handleCreateNewProduct();
            }}
          >
            Thêm mới
          </Button>
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
            <Input value={state.id} type="text" id="product" disabled></Input>
          </Form.Item>
          <Form.Item label="Tên sản phẩm">
            <Input
              value={state.productname}
              name="productname"
              type="text"
              id="product-name"
              onChange={onChangeValue}
            />
          </Form.Item>
          <Form.Item label="Giá">
            <Input
              value={state.price}
              name="price"
              type="text"
              id="product-price"
              placeholder="VNĐ"
              onChange={onChangeValue}
            />
          </Form.Item>
          <Form.Item label="Danh mục">
            <select
              value={state.categoryId}
              name="categoryId"
              className="select_category"
              onChange={(e) => {
                onChangeValue(e);
              }}
            >
              <option value="" disabled>
                Danh mục
              </option>
              {listcategory &&
                listcategory.length > 0 &&
                listcategory.map((item) => (
                  <option value={item._id} key={item._id}>
                    {item.categoryName}
                  </option>
                ))}
            </select>
          </Form.Item>
        </Form>
        <form action="/stats" method="post" className="form-update">
          <input
            type="file"
            className="form-control-file"
            name="productThump"
          />
        </form>
      </Modal>
      {/* <FormDisabledDemo /> */}
    </div>
  );
}

export default ProductManager;
