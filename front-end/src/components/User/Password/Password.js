import React from "react";
import { Button, Form, Input } from "antd";
import axios from "../../../config/axios";
import { useState } from "react";
import { toast } from "react-toastify";
function Password() {
  let email = JSON.parse(localStorage.getItem("info")).email;
  const [oldpass, setOldPass] = useState("");

  const handleChangePass = async () => {
    const resp = await axios.patch("/user/change-pass", {
      email: email,
      oldpass: oldpass,
    });
    console.log(resp);
  };

  const onFinish = async (values) => {
    try {
      const resp = await axios.patch("/user/change-pass", {
        email: email,
        passwordold: values.passwordold,
        passwordnew: values.passwordnew,
      });
      console.log(resp);
      if (resp.status === 200) {
        toast.success("Cập nhật mật khẩu mới thành công");
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.warning("Vui lòng kiểm tra lại");
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    toast.error("Vui lòng kiểm tra lại");
  };

  return (
    <div className="info-user-content">
      <h2 className="head-title">Thông tin mật khẩu</h2>
      <div className="info-user">
        <Form
          layout="vertical"
          name="form-name"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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
              <Input.Password
                placeholder="Nhập mật khẩu cũ"
                onChange={(e) => {
                  setOldPass(e.target.value);
                }}
              />
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
          <Form.Item className="password-item-content">
            <Button type="primary" htmlType="submit" className="btn-save-pass">
              Lưu thông tin
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Password;
