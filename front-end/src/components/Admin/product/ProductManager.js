import React, { useEffect } from "react";
import axios from "../../../config/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "./productmanager.css";
import { Space, Table, Tag, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function ProductManager() {
  const [listproducts, setListProducts] = useState([]);
  const [listcategory, setListCategory] = useState([]);

  const [state, setState] = useState({
    productname: "",
    categoryId: "",
    price: 0,
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
            <EditOutlined />
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
          toast.success("thanh cong", {
            theme: "colored",
          });
        }
      })
      .catch(function (error) {
        if (error.response.data.errCode === 1) {
          toast.error(error.response.data.message, {
            theme: "colored",
          });
        } else if (error.response.data.errCode === 2) {
          toast.error("da ton tai", {
            theme: "dark",
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
  return (
    <div className="product-manager ">
      <div className="form-create-product">
        <div>
          <span>Tên sản phẩm</span>
          <input
            value={state.productname}
            name="productname"
            type="text"
            id="product"
            onChange={(e) => {
              onChangeValue(e);
            }}
          />
        </div>
        <div>
          Phân loại
          <select
            value={state.categoryId}
            name="categoryId"
            id=""
            onChange={(e) => {
              onChangeValue(e);
            }}
          >
            <option value="">Select Category</option>
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
            value={state.price}
            name="price"
            type="number"
            id="price"
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
      <></>
    </div>
  );
}

export default ProductManager;
