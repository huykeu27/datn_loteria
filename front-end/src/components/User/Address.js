import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Table } from "antd";
import { EditOutlined, DeleteOutlined, HomeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import "./address.css";
import axios from "../../config/axios";
import { toast } from "react-toastify";
function Address() {
  const selector = useSelector((state) => state);
  const address = selector.userinfo.address;
  const userinfo = selector.userinfo;
  const idUser = userinfo._id;
  const [newaddress, setNewAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModalCreate = () => {
    setIsModalOpen(true);
  };
  const showModalUpdate = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(idUser);

  const getAddress = async () => {
    try {
      let resp = await axios.get(`/user/address/${idUser}`);
    } catch (error) {}
  };

  useEffect(() => {
    getAddress();
  }, []);

  const handleNewAddress = async (id) => {
    try {
      let resp = await axios.patch(`/user/address/${id}`, {
        address: newaddress,
      });
      if (resp.status === 200) {
        let response = await axios.get(`/user/me/${id}`);
        localStorage.setItem("info", JSON.stringify(response.data.user));
      }
      setNewAddress("");
      toast.success("Thêm địa chỉ thành công");
      handleOk();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditAddress = async (id, address) => {
    try {
      let resp = await axios.patch(`/user/edit-address/${id}`, {
        address: address,
        newaddress: newaddress,
      });
      if (resp.status === 200) {
        let response = await axios.get(`/user/me/${id}`);
        localStorage.setItem("info", JSON.stringify(response.data.user));
      }
      setNewAddress("");
      toast.success("Thêm địa chỉ thành công");
      handleOk();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="address-contents">
      <h2 className="head-title">Địa chỉ giao hàng</h2>
      <div className="add-new-address">
        <div className="content-address">
          <div className="address-header">
            <p className="address-name">
              <HomeOutlined />
              {userinfo.fullName}
            </p>
            <span>
              Thêm địa chỉ
              <EditOutlined
                onClick={() => {
                  showModalCreate();
                }}
              />
            </span>
          </div>
          {address && address !== [] ? (
            <div className="add-content">
              {userinfo?.address.map((item, index) => (
                <div className="add-content-item" key={index}>
                  <div className="info-address">
                    <span>Địa chỉ số {index + 1}:</span>
                    <span>{item}</span>
                  </div>
                  <div className="add-action-item">
                    <EditOutlined
                      onClick={() => {
                        showModalUpdate();
                        handleEditAddress(idUser, item);
                      }}
                    />
                    <DeleteOutlined />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1>Chưa có địa chỉ nào cả</h1>
          )}
        </div>

        <>
          <Modal
            title="Thêm địa chỉ"
            open={isModalOpen}
            onOk={() => {
              handleNewAddress(idUser);
            }}
            onCancel={handleCancel}
            okText="Thêm"
            cancelText="Hủy bỏ"
          >
            <Input
              value={newaddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </Modal>
        </>
      </div>
    </div>
  );
}

export default Address;
