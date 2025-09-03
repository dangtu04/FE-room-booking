import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  message,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCheckInTime,
  fetchCheckOutTime,
  fetchPropertyType,
  fetchProvinces,
} from "../../redux/slices/allcodeSlice";
import { createProperty, getOwnersApi } from "../../utils/api";

const { Option } = Select;

const CreateProperty = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [listOwners, setListOwners] = useState([]);
  const allProvinces = useSelector((state) => state.allcode.provinces);
  const allType = useSelector((state) => state.allcode.propertyType);
  const checkInTime = useSelector((state) => state.allcode.checkInTime);
  const checkOutTime = useSelector((state) => state.allcode.checkOutTime);
  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    dispatch(fetchProvinces());
    dispatch(fetchPropertyType());
    dispatch(fetchCheckInTime());
    dispatch(fetchCheckOutTime());
  }, []);

  useEffect(() => {
    const getAllOwners = async () => {
      const res = await getOwnersApi();
      if (res && res.errCode === 0) {
        if (res.data) {
          setListOwners(res.data);
        }
      }
    };

    getAllOwners();
  }, []);

  const buildDataListOwners = (data) => {
    if (data && data.length > 0) {
      return data.map((item) => ({
        label: item.email,
        value: item.id,
      }));
    }
  };
  // console.log("check list owner: ", listOwners);

  const options = buildDataListOwners(listOwners);
  
  const handleFinish = async (values) => {
    console.log("Submitted values:", values);

    // Khởi tạo FormData để gửi dữ liệu dạng multipart/form-data
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("provinceCode", values.provinceCode);
    formData.append("address", values.address);
    formData.append("typeCode", values.typeCode);
    formData.append("ownerId", values.ownerId);
    formData.append("checkInTimeCode", values.checkInTimeCode);
    formData.append("checkOutTimeCode", values.checkOutTimeCode);

    // Lấy file từ upload
    const file = values.avatar?.[0]?.originFileObj;
    if (file) {
      formData.append("avatar", file);
    } else {
      notification.error({
        message: "Thiếu ảnh đại diện",
        description: "Vui lòng chọn ảnh trước khi gửi.",
      });
      return;
    }

    // gửi api
    const res = await createProperty(formData);

    if (res && res.errCode === 0) {
      form.resetFields();
      notification.success({
        message: "CREATE PROPERTY",
        description: "Property created successfully",
      });
    } else {
      notification.error({
        message: "CREATE PROPERTY",
        description: res?.message || "Có lỗi xảy ra khi tạo.",
      });
    }
  };

  return (
    <div className="create-property-container">
      <h2>Thêm cơ sở mới</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Tên cơ sở"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên cơ sở" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tỉnh/Thành (provinceCode)"
          name="provinceCode"
          rules={[{ required: true, message: "Vui lòng chọn tỉnh" }]}
        >
          <Select placeholder="Chọn tỉnh">
            {allProvinces &&
              allProvinces.length > 0 &&
              allProvinces.map((item, index) => (
                <Option key={index} value={item.keyMap}>
                  {language === "vi" ? item.valueVi : item.valueEn}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Loại cơ sở (typeCode)"
          name="typeCode"
          rules={[{ required: true, message: "Vui lòng chọn loại" }]}
        >
          <Select placeholder="Chọn loại cơ sở">
            {allType &&
              allType.length > 0 &&
              allType.map((item, index) => (
                <Option key={index} value={item.keyMap}>
                  {language === "vi" ? item.valueVi : item.valueEn}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Chủ cơ sở (ownerId)"
          name="ownerId"
          rules={[{ required: true, message: "Vui lòng nhập/chọn chủ cơ sở" }]}
        >
          <Select showSearch optionFilterProp="label" options={options} />
        </Form.Item>

        <Form.Item
          label="Giờ nhận phòng (checkInTimeCode)"
          name="checkInTimeCode"
          rules={[{ required: true, message: "Vui lòng chọn giờ nhận phòng" }]}
        >
          <Select placeholder="Chọn giờ">
            {checkInTime &&
              checkInTime.length > 0 &&
              checkInTime.map((item, index) => (
                <Option key={index} value={item.keyMap}>
                  {language === "vi" ? item.valueVi : item.valueEn}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Giờ trả phòng (checkOutTimeCode)"
          name="checkOutTimeCode"
          rules={[{ required: true, message: "Vui lòng chọn giờ trả phòng" }]}
        >
          <Select placeholder="Chọn giờ">
            {checkOutTime &&
              checkOutTime.length > 0 &&
              checkOutTime.map((item, index) => (
                <Option key={index} value={item.keyMap}>
                  {language === "vi" ? item.valueVi : item.valueEn}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Ảnh đại diện (avatar)"
          name="avatar"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
        >
          <Upload
            name="avatar"
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tạo cơ sở
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProperty;
