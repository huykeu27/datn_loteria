import React, { useEffect } from "react";
import axios from "../../config/axios";
import { useState } from "react";
import { toast } from "react-toastify";

function Login() {
  // const [listproduct, setListproduct] = useState([]);
  const [listcategory, setListCategory] = useState([]);
  const [productname, setPoductName] = useState("");
  const [categoryid, setCategoryId] = useState("");
  const [img, setImg] = useState();
  // const getlistProduct = () => {
  //   const url = "/product/get-all-product";
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       setListproduct(res.data.listProducts);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const handleChangeImg = async (e) => {
    let file = e.target.files[0];

    if (file) {
      let base64 = JSON.stringify(file.toString("base64"));
      // let objectURrl = URL.createObjectURL(file);
      // setImg(base64);
      console.log(base64);
    }
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
  const handleCreateNewCategory = async () => {
    const url = "/product/create-product";
    await axios
      .post(url, {
        name: productname,
        categoryId: categoryid,
        image: img,
      })
      .then(function (response) {
        if (response.data.product) {
          toast.success("thanh cong", {
            theme: "colored",
          });
        } else {
          if (response.data.errCode === 1) {
            toast.error(response.data.message, {
              theme: "colored",
            });
          } else {
            toast.error("da ton tai", {
              theme: "dark",
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllCategory();
  }, [productname, categoryid, img]);

  const onchangeInput = (e) => {
    setPoductName(e.target.value);
  };
  const onchangeSelect = (e) => {
    setCategoryId(e.target.value);
  };
  function handleUpload() {
    let input = document.querySelector("#upload");
    var reader = new FileReader();
    reader.readAsDataURL(input.files[0]);

    reader.onloadend = function () {
      document.querySelector("img").src = reader.result;
    };

    var formData = new FormData();
    formData.append("myfile", input.files[0]);

    //call api

    axios
      .post("/upload", {
        data: formData,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
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

      <select
        name=""
        id=""
        onChange={(e) => {
          onchangeSelect(e);
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

      <button
        onClick={() => {
          handleCreateNewCategory();
        }}
      >
        send
      </button>
    </>
  );
}

export default Login;
