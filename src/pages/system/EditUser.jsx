import { Form, Input, Button, Select, DatePicker, notification } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenders, fetchRoles } from "../../redux/slices/allcodeSlice";
import { editUserApi } from "../../utils/api";

const EditUser = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state: userData } = useLocation();
  const language = useSelector((state) => state.app.language);
  const allGenders = useSelector((state) => state.allcode.genders);
  const allRoles = useSelector((state) => state.allcode.roles);
  useEffect(() => {
    dispatch(fetchGenders());
    dispatch(fetchRoles());
  }, [language, dispatch]);

  // custom date format và  setFieldsValue
  useEffect(() => {
    if (userData) {
      const user = userData.user;
      console.log("user: ", user);
      form.setFieldsValue({
        ...user,
        dateOfBirth: user.dateOfBirth
          ? dayjs(user.dateOfBirth, "DD/MM/YYYY")
          : null,
      });
    }
  }, [userData, form]);

  const handleUpdate = async (values) => {
    const formattedValues = {
      ...values,
      dateOfBirth: values.dateOfBirth
        ? values.dateOfBirth.format("DD/MM/YYYY")
        : null,
    };

    const res = await editUserApi(formattedValues);
    if (res && res.errCode === 0) {
      notification.success({
        message: "Update User",
        description: "Success",
      });
      navigate("/system/user/list");
    } else {
      notification.error({
        message: "Update User",
        description: "Failed to update user.",
      });
      return;
    }

    console.log("Updated User Data: ", formattedValues);
  };
  console.log("check: ", userData);
  return (
    <div style={{ maxWidth: 500, margin: "auto", marginTop: 40 }}>
      <h2>Chỉnh sửa người dùng</h2>
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>
        <Form.Item name="fullName" label="Họ tên" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ngày sinh"
          name="dateOfBirth"
          rules={[
            { required: true, message: "Please select your birth date!" },
          ]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="gender" label="Giới tính">
          <Select>
            {allGenders &&
              allGenders.length > 0 &&
              allGenders.map((item, index) => (
                <Select.Option key={index} value={item.keyMap}>
                  {language === "vi" ? item.valueVi : item.valueEn}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item name="roleCode" label="Vai trò">
          <Select>
            {allRoles &&
              allRoles.length > 0 &&
              allRoles.map((item, index) => (
                <Select.Option key={index} value={item.keyMap}>
                  {language === "vi" ? item.valueVi : item.valueEn}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form>
    </div>
  );
};

export default EditUser;
