import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../../redux/slices/propertySlice";
import { fetchRoomType } from "../../redux/slices/allcodeSlice";
import { Select, Form, InputNumber, Button, message } from "antd";
import { createRoomType } from "../../utils/api";

const CreateRoomType = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const propertyId = useSelector((state) => state.user.propertyId);

  const properties = useSelector((state) => state.property.properties);
  const roomTypes = useSelector((state) => state.allcode.roomTypes);
  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    dispatch(fetchProperties());
    dispatch(fetchRoomType());
  }, [dispatch]);

  const buildPropertyOptions = (data) =>
    data?.map((item) => ({ label: item.name, value: item.id })) || [];

  const handleSubmit = async (values) => {
    const dataToSend = {
      ...values,
      propertyId: propertyId || values.propertyId,
      availableQuantity: values.totalQuantity,
    };
    const res = await createRoomType(dataToSend);
    if (res && res.errCode === 0) {
      form.resetFields();
      message.success("Thêm loại phòng thành công!");
    } else {
      message.error(res?.message);
    }
  };

  return (
    <>
      <h1>Tạo loại phòng</h1>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{ availableQuantity: 0 }}
      >
        {!propertyId && (
          <Form.Item
            label="Chọn cơ sở"
            name="propertyId"
            rules={[{ required: true, message: "Vui lòng chọn cơ sở!" }]}
          >
            <Select
              options={buildPropertyOptions(properties)}
              placeholder="Chọn cơ sở"
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>
        )}

        <Form.Item
          label="Loại phòng"
          name="typeCode"
          rules={[{ required: true, message: "Vui lòng chọn loại phòng!" }]}
        >
          <Select
            placeholder="Chọn loại phòng"
            showSearch
            optionFilterProp="label"
          >
            {roomTypes &&
              roomTypes.length > 0 &&
              roomTypes.map((item, index) => (
                <Option key={index} value={item.keyMap}>
                  {language === "vi" ? item.valueVi : item.valueEn}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Giá phòng"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá phòng!" }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="Nhập giá phòng"
          />
        </Form.Item>

        <Form.Item
          label="Tổng số lượng phòng"
          name="totalQuantity"
          rules={[{ required: true, message: "Vui lòng nhập tổng số lượng!" }]}
        >
          <InputNumber
            min={1}
            style={{ width: "100%" }}
            placeholder="Nhập tổng số lượng"
          />
        </Form.Item>

        <Form.Item
          label="Số người ở tối đa"
          name="numPeople"
          rules={[{ required: true, message: "Vui lòng nhập số người!" }]}
        >
          <InputNumber
            min={1}
            style={{ width: "100%" }}
            placeholder="Nhập số người ở tối đa"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tạo loại phòng
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateRoomType;
