import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../../redux/slices/propertySlice";
import { useEffect, useState } from "react";
import { Button, Form, Input, message, Select } from "antd";
import { createRoomUnit, getListRoomTypeByPropertyId } from "../../utils/api";
import { fetchRoomStatus } from "../../redux/slices/allcodeSlice";

const CreateRoomUnit = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
    const propertyId = useSelector((state) => state.user.propertyId);
  const properties = useSelector((state) => state.property.properties);
  const language = useSelector((state) => state.app.language);
  const roomStatus = useSelector((state) => state.allcode.roomStatus);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [listRoomType, setListRoomType] = useState([]);

  useEffect(() => {
    dispatch(fetchProperties());
    dispatch(fetchRoomStatus());
  }, [dispatch]);


    useEffect(() => {
    // Nếu có propertyId thì set luôn selectedProperty
    if (propertyId) {
      setSelectedProperty(propertyId);
    }
  }, [propertyId]);

  const buildPropertyOptions = (data) =>
    data?.map((item) => ({ label: item.name, value: item.id })) || [];

  const handleOnchangSelectProperty = (value) => {
    setSelectedProperty(value);
    form.setFieldsValue({ roomTypeId: undefined });
  };

  useEffect(() => {
    const fetchRoomTypes = async (propertyId) => {
      const res = await getListRoomTypeByPropertyId(propertyId);
      if (res && res.errCode === 0) {
        setListRoomType(res?.data);
      }
    };
    fetchRoomTypes(selectedProperty);
  }, [selectedProperty]);

  const handleSubmit = async (values) => {
    const res = await createRoomUnit(values);
    if (res && res.errCode === 0) {
      message.success("Create room unit successfully");
      form.setFieldsValue({ roomNumber: undefined });
    } else {
      message.error("Create room unit fail");
    }
  };

  return (
    <>
      <h1>CreateRoomUnit</h1>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
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
              onChange={handleOnchangSelectProperty}
            />
          </Form.Item>
        )}

        <Form.Item
          label="Chọn kiểu phòng"
          name="roomTypeId"
          key={selectedProperty}
          rules={[{ required: true, message: "Vui lòng chọn kiểu phòng!" }]}
        >
          <Select
            placeholder="Chọn kiểu phòng"
            showSearch
            optionFilterProp="label"
          >
            {listRoomType &&
              listRoomType.length > 0 &&
              listRoomType.map((item, index) => (
                <Select.Option key={index} value={item.id}>
                  {language === "vi"
                    ? item.roomTypeData.valueVi
                    : item.roomTypeData.valueEn}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Số phòng"
          name="roomNumber"
          rules={[{ required: true, message: "Vui lòng nhập số phòng" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Trạng thái phòng"
          name="statusCode"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          <Select placeholder="Chọn trạng thái">
            {roomStatus &&
              roomStatus.length > 0 &&
              roomStatus.map((item, index) => (
                <Select.Option key={index} value={item.keyMap}>
                  {language === "vi" ? item.valueVi : item.valueEn}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm phòng
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default CreateRoomUnit;
