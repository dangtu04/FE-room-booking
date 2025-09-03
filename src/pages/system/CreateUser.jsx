import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  notification,
  DatePicker,
  Radio,
  Select,
} from "antd";
import { registerApi } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenders, fetchRoles } from "../../redux/slices/allcodeSlice";
import { useTranslation } from "react-i18next";

const CreateUser = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language);
  const allGenders = useSelector((state) => state.allcode.genders);
  const allRoles = useSelector((state) => state.allcode.roles);
  const [form] = Form.useForm();
  const { t } = useTranslation("admin");

  useEffect(() => {
    dispatch(fetchGenders());
    dispatch(fetchRoles());
  }, [language, dispatch]);

  // thêm người dùng
  const onFinish = async (values) => {
    const payload = {
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
      dateOfBirth: values.dateOfBirth.format("DD/MM/YYYY"),
      gender: values.gender,
      roleCode: values.roleCode,
    };
    const res = await registerApi(payload);

    if (res && res.errCode === 0) {
      form.resetFields();
      notification.success({
        message: "CREATE USER",
        description: "User registered successfully!",
      });
    } else {
      notification.error({
        message: "CREATE USER",
        description: "Registration failed.",
      });
    }
  };

  return (
    <div style={{ padding: "50px 100px" }}>
      <h1 className="system-title"> {t("add-user")}</h1>
      <Form
        form={form}
        name="registerForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label={t("name")}
          name="fullName"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("email")}
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Invalid email format!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("phone")}
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
            {
              pattern: /^[0-9]{9,11}$/,
              message: "Invalid phone number!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("password")}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label={t("date-of-birth")}
          name="dateOfBirth"
          rules={[
            { required: true, message: "Please select your birth date!" },
          ]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label={t("gender")}
          name="gender"
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select placeholder="Select a role">
            {allGenders &&
              allGenders.length > 0 &&
              allGenders.map((item, index) => (
                <Radio key={index} value={item.keyMap}>
                  {language === "vi" ? item.valueVi : item.valueEn}
                </Radio>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={t("role")}
          name="roleCode"
          rules={[{ required: true, message: "Please select role!" }]}
        >
          <Select placeholder="Select a role">
            {allRoles &&
              allRoles.length > 0 &&
              allRoles.map((item, index) => (
                <Radio key={index} value={item.keyMap}>
                  {language === "vi" ? item.valueVi : item.valueEn}
                </Radio>
              ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {t("add-user")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateUser;
