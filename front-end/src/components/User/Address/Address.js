import React, { useEffect, useState } from "react";
import { Input, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  HomeOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import "./address.css";
import axios from "../../../config/axios";
import { toast } from "react-toastify";
function Address() {
  const selector = useSelector((state) => state);
  const userinfo = selector.userinfo;
  const [newaddress, setNewAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState();
  const user = JSON.parse(localStorage.getItem("info"));
  const { confirm } = Modal;
  const showModalCreate = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getAddress = async () => {
    try {
      let resp = await axios.get(`/api/user/address/${user._id}`);
      console.log(resp.data.address);
      setAddress(resp.data.address);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  const handleNewAddress = async (id) => {
    try {
      let resp = await axios.post(`/api/user/address/${id}`, {
        address: newaddress,
      });
      if (resp.status === 200) {
        setNewAddress("");
        getAddress();
        toast.success("Thêm địa chỉ thành công");
      }

      handleOk();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAddress = async (address) => {
    try {
      confirm({
        title: "Xác nhận xóa địa chỉ ?",
        icon: <ExclamationCircleFilled />,
        okText: "Xác nhận",
        cancelText: "Hủy",
        onOk() {
          axios
            .patch(`/api/user/remove-address/${user._id}`, {
              address: address,
            })
            .then((resp) => {
              if (resp.status === 200) {
                toast.success("Xóa địa chỉ thành công");
                getAddress();
              }
            })
            .catch((err) => console.log(err));
        },
        onCancel() {
          console.log("Cancel");
        },
      });
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
              {address.map((item, index) => (
                <div className="add-content-item" key={index}>
                  <div className="info-address">
                    <span>Địa chỉ số {index + 1}:</span>
                    <span>{item}</span>
                  </div>
                  <div className="add-action-item">
                    <DeleteOutlined
                      onClick={() => {
                        handleRemoveAddress(item);
                      }}
                    />
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
              handleNewAddress(user._id);
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
