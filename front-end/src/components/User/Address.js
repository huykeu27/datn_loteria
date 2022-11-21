import React, { useState } from "react";
import { Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
function Address() {
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
  return (
    <div className="address-content">
      <div className="add-new-address">
        <h3>THÊM ĐỊA CHỈ </h3>
        <EditOutlined onClick={showModal} />
        <>
          <Modal
            title="Thêm địa chỉ"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Thêm địa chỉ"
            cancelText="Hủy"
          >
            <input type="text" />
          </Modal>
        </>
      </div>
    </div>
  );
}

export default Address;
