import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../../redux/slices/propertySlice";
import { fetchRoomType } from "../../redux/slices/allcodeSlice";
import { Select, Form, InputNumber, Button, message } from "antd";
import { createRoomType } from "../../utils/api";
import { useTranslation } from "react-i18next";

const CreateRoomType = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const propertyId = useSelector((state) => state.user.propertyId);

  const properties = useSelector((state) => state.property.properties);
  const roomTypes = useSelector((state) => state.allcode.roomTypes);
  const language = useSelector((state) => state.app.language);
  const { t } = useTranslation("admin");

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
      <h1>{t("create_room_type.create_room_type")}</h1>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{ availableQuantity: 0 }}
      >
        {!propertyId && (
          <Form.Item
            label={t("create_room_type.select_facility")}
            name="propertyId"
            rules={[{ required: true, message: "Vui lòng chọn cơ sở!" }]}
          >
            <Select
              options={buildPropertyOptions(properties)}
              placeholder={t("create_room_type.select_facility")}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>
        )}

        <Form.Item
          label={t("create_room_type.room_type")}
          name="typeCode"
          rules={[{ required: true, message: "Vui lòng chọn loại phòng!" }]}
        >
          <Select
            placeholder={t("create_room_type.select_room_type")}
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
          label={t("create_room_type.room_price")}
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá phòng!" }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder={t("create_room_type.enter_room_price")}
          />
        </Form.Item>

        <Form.Item
          label={t("create_room_type.total_rooms")}
          name="totalQuantity"
          rules={[{ required: true, message: "Vui lòng nhập tổng số lượng!" }]}
        >
          <InputNumber
            min={1}
            style={{ width: "100%" }}
            placeholder={t("create_room_type.enter_total_rooms")}
          />
        </Form.Item>

        <Form.Item
          label={t("create_room_type.max_capacity")}
          name="numPeople"
          rules={[{ required: true, message: "Vui lòng nhập số người!" }]}
        >
          <InputNumber
            min={1}
            style={{ width: "100%" }}
            placeholder={t("create_room_type.enter_max_capacity")}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t("create_room_type.create_room_type")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateRoomType;
