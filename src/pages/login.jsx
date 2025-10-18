import React from "react";
import { Button, Form, Input, notification, Typography } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { HomeOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  const { t } = useTranslation("common");
  const onFinish = async (values) => {
    const resultAction = await dispatch(loginUser(values));
    const role = resultAction.payload?.roleCode;
    if (loginUser.fulfilled.match(resultAction)) {
      notification.success({
        message: "LOGIN",
        description: "Success",
      });
      switch (role) {
        case "R1":
          navigate("/system"); // AdminLayout
          break;
        case "R2":
          navigate("/owner"); // OwnerLayout
          break;
        case "R3":
        default:
          navigate("/");
          break;
      }
    } else {
      notification.error({
        message: "LOGIN",
        description: resultAction.payload || "Login failed",
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header có nút Trang chủ */}
        <div style={styles.header}>
          <Button
            type="link"
            icon={<HomeOutlined />}
            onClick={() => navigate("/")}
            style={{ padding: 0 }}
          >
            {t("home")}
          </Button>
        </div>

        <Title level={2} style={{ textAlign: "center", marginBottom: 20 }}>
          {t("login")}
        </Title>

        <Form
          name="login-form"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            label={t("password")}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder={t("enter_password")} />
          </Form.Item>

          <Form.Item style={{ textAlign: "center", marginTop: 20 }}>
            <Button type="primary" htmlType="submit" block>
              {t("login")}
            </Button>
          </Form.Item>
        </Form>

        {/* Footer có link Đăng ký */}
        <div style={styles.footer}>
          <Text> {t("no_acc")}</Text>
          <Link to="/register" style={styles.registerLink}>
            {t("register")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f0f2f5",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: "30px 25px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  footer: {
    marginTop: 16,
    textAlign: "center",
  },
  registerLink: {
    color: "#1677ff",
    fontWeight: 500,
    marginLeft: 4,
  },
};
