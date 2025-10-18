import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, InputNumber, Button, Select, Card, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomType } from "../../redux/slices/allcodeSlice";
import { updateRoomType } from "../../utils/api";

const EditRoomType = () => {
  const { state: data } = useLocation();
  const roomType = data?.roomType;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const roomTypes = useSelector((state) => state.allcode.roomTypes);
  const language = useSelector((state) => state.app.language);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchRoomType());
  }, [dispatch]);
  useEffect(() => {
    if (roomType) {
      form.setFieldsValue({
        propertyId: roomType.propertyId,
        typeCode: roomType.typeCode,
        price: roomType.price,
        totalQuantity: roomType.totalQuantity,
      });
    }
  }, [roomType, form]);

  const handleFinish = async (values) => {
    console.log("Updated values:", values);
    const res = await updateRoomType(values);
    if (res && res.errCode === 0) {
      message.success("Sửa loại phòng thành công!");
      navigate("/system/roomtype/list")
    } else {
      message.error(res?.message);
    }
  };

  return (
    <Card
      title="Chỉnh sửa loại phòng"
      style={{ maxWidth: 600, margin: "0 auto" }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={roomType}
      >

          <Form.Item
          name="id"
          rules={[{ required: true}]}
          noStyle
        >
          <InputNumber style={{ width: "100%" }} disabled />
        </Form.Item>
        <Form.Item
          name="propertyId"
          label="Mã cơ sở"
          rules={[{ required: true, message: "Vui lòng nhập mã cơ sở!" }]}
        >
          <InputNumber style={{ width: "100%" }} disabled />
        </Form.Item>

        <Form.Item
          name="typeCode"
          label="Kiểu phòng"
          rules={[{ required: true, message: "Vui lòng chọn kiểu phòng!" }]}
        >
          <Select
            placeholder="Chọn loại phòng"
            showSearch
            optionFilterProp="label"
          >
            {roomTypes &&
              roomTypes.length > 0 &&
              roomTypes.map((item, index) => (
                <Select.Option key={index} value={item.keyMap}>
                  {language === "vi" ? item.valueVi : item.valueEn}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="price"
          label="Giá phòng"
          rules={[{ required: true, message: "Vui lòng nhập giá phòng!" }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          name="totalQuantity"
          label="Tổng số phòng"
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
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
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditRoomType;
