import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, notification } from "antd";
import "./register.scss";
import { registerApi } from "../utils/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await registerApi({
        email: values.email,
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        password: values.password,
      });
      if (res && res.errCode === 0) {
        notification.success({
          message: "Đăng ký thành công!",
        });
        form.resetFields();
      } else {
        notification.error({
          message: "Đăng ký thất bại!",
          description: res?.message || "Có lỗi xảy ra khi đăng ký.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Đăng ký thất bại!",
        description: "Không thể kết nối tới máy chủ.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card" bordered={false}>
        <div className="register-header">
          <Button
            type="link"
            icon={<HomeOutlined />}
            onClick={() => navigate("/")}
          >
            {t("home")}
          </Button>
        </div>
        <Title level={3} className="register-title">
          {t("register_account")}
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="register-form"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder= {t("enter_email")} />
          </Form.Item>
          <Form.Item
            label={t("full_name")}
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input placeholder={t("enter_full_name")} />
          </Form.Item>

          <Form.Item
            label={t("phone_number")}
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input placeholder={t("enter_phone_number")} />
          </Form.Item>

          <Form.Item
            label={t("password")}
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder={t("enter_password")} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {t("register")}
            </Button>
          </Form.Item>
        </Form>
        <div className="register-footer">
          <span>{t("already_have_account")} </span>
          <Link to="/login" className="register-link">
            {t("login")}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
