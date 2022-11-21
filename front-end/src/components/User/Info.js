import React from "react";
import { Button, DatePicker, Form, Input } from "antd";
const config = {
  rules: [
    {
      type: "object",
      required: false,
      message: "Please select time!",
    },
  ],
};
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
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <div className="info-account">
        <h3>THÔNG TIN CÁ NHÂN</h3>
        <Form.Item
          name={["user", "name"]}
          label="Họ tên"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="date-picker" label="Ngày sinh" {...config}>
          <DatePicker />
        </Form.Item>
      </div>
      <div className="info-password">
        <h3>THAY ĐỔI MẬT KHẨU</h3>
        <Form.Item
          name="passwordold"
          label="Mật khẩu cũ"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu của bạn!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="passwordnew"
          label="Mật khẩu mới"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu của bạn!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Nhập lại mật khẩu"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận mật khẩu của bạn!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("passwordnew") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Hai mật khẩu bạn đã nhập không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </div>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit" color="red">
          Lưu thông tin
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Info;
