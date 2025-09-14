import { Button, Form, message, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../../redux/slices/propertySlice";
import {
  getAllCode,
  getPropertyAmenitiesByPropertyId,
  savePropertyAmenity,
} from "../../utils/api";

const PropertyAmenityManage = () => {
  const propertyId = useSelector((state) => state.user.propertyId);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [propertyAmenity, setPropertyAmenity] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const dispatch = useDispatch();
  const properties = useSelector((state) => state.property.properties);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  useEffect(() => {
    setSelectedPropertyId(propertyId);
  }, [propertyId]);

  const buildDataListProperties = (data) => {
    if (data && data.length > 0) {
      return data.map((item) => ({
        label: item.name,
        value: item.id,
      }));
    }
    return [];
  };

  const options = buildDataListProperties(properties);

  const handleOnchangeSelectProperty = (value) => {
    setSelectedPropertyId(value);
  };

  // fetch PROPERTY_AMENITY từ allcode
  useEffect(() => {
    const fetchPropertyAmanity = async () => {
      const res = await getAllCode("PROPERTY_AMENITY");
      if (res && res.errCode === 0) {
        setPropertyAmenity(res.data);
      }
    };

    fetchPropertyAmanity();
  }, []);

  // fetch amenities từ propertyId
  const fetchPropertyAmenitiesByPropertyId = async () => {
    const res = await getPropertyAmenitiesByPropertyId(selectedPropertyId);
    if (res && res.errCode === 0) {
      setSelectedAmenities(res.data.map((item) => item.propertyAmenityCode));
    }
  };

  // gọi hàm khi selectedPropertyId thay đổi
  useEffect(() => {
    fetchPropertyAmenitiesByPropertyId();
  }, [selectedPropertyId]);

  const handleFinish = async () => {
    if (!selectedPropertyId) {
      message.error("Vui lòng chọn cơ sở trước!");
      return;
    }
    const data = {
      propertyId: selectedPropertyId,
      propertyAmenityCode: selectedAmenities,
    };

    const res = await savePropertyAmenity(data);
    if (res && res.errCode === 0) {
      message.success("Lưu tiện ích thành công!");
    } else {
      message.error("Lưu tiện ích thất bại!");
    }
  };
  return (
    <>
      <h1>PropertyAmenityManage</h1>

      <Form layout="vertical" onFinish={handleFinish}>
        {
          !propertyId && (
            <Form.Item
              label="Chọn cơ sở"
              name="propertyId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn một cơ sở!",
                },
              ]}
            >
              <Select
                style={{ width: "100%", marginBottom: 20 }}
                placeholder="Chọn cơ sở"
                showSearch
                optionFilterProp="label"
                value={selectedPropertyId}
                options={options}
                onChange={handleOnchangeSelectProperty}
              />
            </Form.Item>
          )
        }
        <Form.Item label="Chọn tiện ích">
          <Select
            mode="multiple"
            style={{ width: "100%", marginBottom: 20 }}
            placeholder="Chọn tiện ích"
            value={selectedAmenities}
            options={propertyAmenity.map((item) => ({
              label: item.valueVi,
              value: item.keyMap,
            }))}
            onChange={(values) => setSelectedAmenities(values)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default PropertyAmenityManage;
