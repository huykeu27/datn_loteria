import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useSelector } from "react-redux";
import "./info.css";
import axios from "../../../config/axios";
import { toast } from "react-toastify";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} bắt buộc!",
  types: {
    email: "${label} không phải là một email hợp lệ!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const Info = () => {
  const user = JSON.parse(localStorage.getItem("info"));
  const [userinfo, setUserInfo] = useState();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(userinfo);
  }, [userinfo, form]);

  const getInfo = async () => {
    try {
      let resp = await axios.get(`/api/user/me/${user._id}`);
      setUserInfo(resp.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);

  const onFinish = async (values) => {
    console.log(values);
    try {
      let resp = await axios.patch(`/api/user/update-info/${user._id}`, {
        fullName: values.fullName,

        phoneNumber: values.phoneNumber,
      });
      if (resp.status === 200) {
        toast.success("Thay đổi thông tin cá nhân thành công");
        getInfo();
      }
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };
  return (
    <div className="info-user-content">
      <h2 className="head-title">Thông tin tài khoản</h2>
      <div className="info-user">
        <Form
          form={form}
          layout="vertical"
          name="form-name"
          initialValues={userinfo}
          validateMessages={validateMessages}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="info-account">
            <h3>THÔNG TIN CÁ NHÂN</h3>
            <Form.Item
              className="info-user-show"
              name="fullName"
              label="Họ tên"
              rules={[
                {
                  type: "text",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="info-user-show"
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              className="info-user-show"
              label="Số điện thoại"
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit" className="btn-save-pass">
              Lưu thông tin
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Info;
