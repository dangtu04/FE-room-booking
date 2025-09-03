import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Checkbox,
  Typography,
  Tag,
  Space,
  Rate,
} from "antd";
const { Title, Text } = Typography;
import {
  WifiOutlined,
  CarOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import BookingSummary from "./BookingSummary";
import { useSelector } from "react-redux";
import { getPropertyById } from "../../utils/api";
import { useEffect, useState } from "react";
const HotelInfoCard = ({ bookingInfo, propertyId }) => {
  const language = useSelector((state) => state.app.language);
    const stayDays = useSelector((state) => state.search.stayDays);
  const [property, setProperty] = useState({});
  useEffect(() => {
    const fetchPropertyById = async (propertyId) => {
      const res = await getPropertyById(propertyId);
      setProperty(res.data);
      console.log("Check res property by id: ", res);
      if (res && res.errCode === 0 && res.data) {
        setProperty(res.data);
      }
    };

    if (propertyId) {
      fetchPropertyById(propertyId);
    }
  }, [propertyId]);

  return (
    <>
      <Card className="hotel-info-card">
        <div className="hotel-image">
          <img
            src={property?.avatar}
            alt="UK Hotel Dalat"
          />
        </div>

        <div className="hotel-details">
          <div className="hotel-rating">
            <Text>{language === "vi" ? property?.typeData?.valueVi: property?.typeData?.valueEn}</Text>
            <Rate disabled defaultValue={2} />
            <Tag color="orange">Mới trên Booking.com</Tag>
          </div>

          <Title level={3} className="hotel-name">
           {property?.name}
          </Title>

          <div className="hotel-address">
            <EnvironmentOutlined />
            <Text>{property?.address}</Text>
          </div>

          <div className="hotel-score">
            <Text className="score-link">Vị trí tuyệt vời — 8.8</Text>
          </div>

          <div className="score-badge">7.8</div>
          <Text>Tốt • 30 đánh giá</Text>

          <div className="hotel-amenities">
            <Space>
              <div className="amenity">
                <WifiOutlined />
                <Text>WiFi miễn phí</Text>
              </div>
              <div className="amenity">
                <CarOutlined />
                <Text>Xe đưa đón sân bay</Text>
              </div>
              <div className="amenity">
                <CarOutlined />
                <Text>Chỗ đỗ xe</Text>
              </div>
            </Space>
          </div>
        </div>

        <div className="booking-details">
          <Title level={4}>Chi tiết đặt phòng của bạn</Title>

          <div className="stay-duration">
            <Text strong>Tổng thời gian lưu trú:</Text>
            <div>{stayDays || 1} đêm</div>
          </div>

          {/* <div className="room-selection">
            <Text strong>Bạn đã chọn</Text>
            <Select
            //   value={selectedRoom}
            //   onChange={setSelectedRoom}
              className="room-select"
            >
              <Option value="1 phòng cho 2 người lớn">
                1 phòng cho 2 người lớn
              </Option>
              <Option value="1 phòng cho 1 người lớn">
                1 phòng cho 1 người lớn
              </Option>
              <Option value="2 phòng cho 4 người lớn">
                2 phòng cho 4 người lớn
              </Option>
            </Select>
          </div> */}
          <BookingSummary bookingInfo={bookingInfo} />

          <Button type="link" className="change-selection">
            Đổi lựa chọn của bạn
          </Button>
        </div>
      </Card>
    </>
  );
};
export default HotelInfoCard;
