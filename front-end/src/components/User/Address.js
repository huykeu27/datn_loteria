import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { EditOutlined, DeleteOutlined, HomeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import "./address.css";
import axios from "../../config/axios";
function Address() {
  const selector = useSelector((state) => state);
  const userinfo = selector.userinfo;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDelAdress = () => {
    axios.delete("/user/address", {
      id: userinfo.id,
    });
  };

  return (
    <div className="address-content">
      <h2 className="head-title">
        <button className="btn-add-adddress" title="Thêm">
          + Thêm
        </button>
        Địa chỉ giao hàng
      </h2>
      <div className="add-new-address">
        {!userinfo ? (
          <h3>THÊM ĐỊA CHỈ </h3>
        ) : (
          <div className="content-address">
            <div className="address-header">
              <p className="address-name">
                <HomeOutlined />
                {userinfo.fullName}
              </p>
            </div>

            <div className="add-content">
              {userinfo.address.map((item, index) => {
                return (
                  <div className="address_user" key={index}>
                    {item}
                    <div className="action">
                      <EditOutlined onClick={showModal} />
                      <DeleteOutlined onClick={handleDelAdress} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <>
          <Modal
            title="Thêm địa chỉ"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Cập nhật"
            cancelText="Hủy bỏ"
          >
            <Input />
          </Modal>
        </>
      </div>
    </div>
  );
}

export default Address;
