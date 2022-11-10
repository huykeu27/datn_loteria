import React, { useEffect } from "react";
import axios from "../../../config/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "./productmanager.css";
import { Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function ProductManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      title: "Danh mục",
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
  const onChangeValue = (event) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
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
      .put(url, { name: state.productname, price: state.price })
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
      <div className="form-create-product">
        <div>
          <input
            placeholder="Tên sản phẩm"
            className="form__field"
            value={state.productname}
            name="productname"
            type="text"
            id="product"
            onChange={(e) => {
              onChangeValue(e);
            }}
          />
        </div>
        <div className="select-category">
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
        </div>
        <div>
          <input
            className="form__field select-price"
            value={state.price}
            name="price"
            type="number"
            id="price"
            placeholder="VNĐ"
            onChange={(e) => {
              onChangeValue(e);
            }}
          />
        </div>

        <button
          onClick={() => {
            handleCreateNewProduct();
          }}
        >
          Thêm mới
        </button>
      </div>

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
      </Modal>
    </div>
  );
}

export default ProductManager;
