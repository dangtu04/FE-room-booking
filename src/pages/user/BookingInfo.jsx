import React, { useEffect, useState } from "react";
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
import {
  WifiOutlined,
  CarOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import "./BookingInfo.scss";
import HotelInfoCard from "./HotelInfoCard";
import { useLocation } from "react-router-dom";


const { Title, Text } = Typography;
// const { Option } = Select;
// const { RangePicker } = DatePicker;

const BookingInfo = () => {
  const [form] = Form.useForm();

  const location = useLocation();
  const { bookingInfo, propertyId } = location.state || {};




  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div className="hotel-booking">
      <Row gutter={24}>
        {/* Hotel Information */}
        <Col xs={24} lg={11}>
          <HotelInfoCard bookingInfo={bookingInfo} propertyId={propertyId} />
        </Col>

        {/* Booking Form */}
        <Col xs={24} lg={13}>
          <Card className="booking-form-card">
            <Title level={3}>Nhập thông tin chi tiết của bạn</Title>

            <div className="info-notice">
              <InfoCircleOutlined />
              <Text>Gần xong rồi! Chỉ cần điền phần thông tin * bắt buộc</Text>
              <div>
                Vui lòng nhập thông tin của bạn bằng ký tự Latin để chỗ nghỉ có
                thể hiểu được
              </div>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="booking-form"
            >
              <Form.Item
                label="Họ tên"
                name="lastName"
                rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
              >
                <Input placeholder="ví dụ: Nguyễn Anh Tuấn" />
              </Form.Item>

              <Form.Item
                label="Địa chỉ email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Text className="email-note">
                Email xác nhận đặt phòng sẽ được gửi đến địa chỉ này
              </Text>

              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Text className="phone-note">
                Để xác minh đơn đặt và để chỗ nghỉ liên lạc khi cần
              </Text>

              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block>
                  Tiếp tục đặt phòng
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BookingInfo;
