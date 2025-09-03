import React from "react";
import { Button, Form, Input, notification, Typography } from "antd";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const onFinish = async (values) => {
    const resultAction = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(resultAction)) {
      notification.success({
        message: "LOGIN",
        description: "Success",
      });
      navigate("/");
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
        <Title level={2} style={{ textAlign: "center", marginBottom: 20 }}>
          Login
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
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item style={{ textAlign: "center", marginTop: 20 }}>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
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
};
