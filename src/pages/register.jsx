import React from "react";
import { Button, Form, Input, notification } from "antd";
import { registerApi } from "../utils/api/authApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
  const onFinish = async (values) => {
    const { email, name, password } = values;
    const res = await registerApi(email, name, password)
    console.log("Success:", res);
    if(res) {
        notification.success({
            message: 'CREATE USER',
            description: 'Success'
        })
        navigate('/login')
    } else {
          notification.error({
            message: 'CREATE USER',
            description: 'Error'
        })
    }
  };

  return (
    <div style={{ padding: "100px" }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
