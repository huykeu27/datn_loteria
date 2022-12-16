import React, { useEffect } from "react";
import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import "./info.css";
import axios from "../../config/axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
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
  const selector = useSelector((state) => state);
  const userinfo = selector.userinfo;

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(userinfo);
  }, [userinfo, form]);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
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
            <Form.Item
              name="InnerPicker"
              className="info-user-show"
              label="Ngày sinh"
            >
              <DatePicker
                Value={dayjs("01/01/2015", dateFormatList[0])}
                format={dateFormatList}
              />
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
              <Input.Password placeholder="Nhập mật khẩu cũ" />
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
              <Input.Password placeholder="Nhập mật khẩu mới" />
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
              <Input.Password placeholder="Nhập lại mật khẩu" />
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
      </div>
    </div>
  );
};
export default Info;
