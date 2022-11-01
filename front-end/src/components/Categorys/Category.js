import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../Categorys/category.css";

function Category() {
  const selector = useSelector((state) => state);
  const categorys = selector.categorys;
  return (
    <div className="categoryList">
      {categorys.map((item, index) => (
        <div className={item.categoryName} key={index}>
          <NavLink to={`/category/${item.categorylink}`}>
            <img src={item.thump} alt="" />
            <h3>{item.categoryName}</h3>
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default Category;
