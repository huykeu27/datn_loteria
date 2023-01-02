import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../Categorys/category.css";
import axios from "../../config/axios";
function Category() {
  const [categorys, setListCategory] = useState([]);
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
  }, []);

  return (
    <div className="categoryList">
      {categorys.map((item, index) => (
        <div className={item.categoryName} key={index}>
          <NavLink to={`/category/${item._id}`}>
            <img src={item.imageUrl} alt="" />
            <h3>{item.categoryName}</h3>
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default Category;
