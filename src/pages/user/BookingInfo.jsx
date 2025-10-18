import React, { useEffect, useState } from "react";
import { Card, Row, Col, Form, Input, Button, Typography, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import "./BookingInfo.scss";
import HotelInfoCard from "./HotelInfoCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createBooking, getPropertyById } from "../../utils/api";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const BookingInfo = () => {
  const [form] = Form.useForm();

  const location = useLocation();
  const { bookingInfo, propertyId } = location.state || {};
  const guestCount = useSelector((state) => state.search.guestCount);
  const language = useSelector((state) => state.app.language);
  const [property, setProperty] = useState({});
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  const handleCreateBooking = async (values) => {
    const selectedQuantities = bookingInfo?.selectedQuantities || {};

    // mapping sang bookingItems
    const bookingItems = Object.entries(selectedQuantities).map(
      ([roomTypeId, quantity]) => ({
        roomTypeId: Number(roomTypeId),
        quantity,
      })
    );

    // tính tổng numRooms = sum(quantity)
    const numRooms = Object.values(selectedQuantities).reduce(
      (total, q) => total + q,
      0
    );

    const data = {
      userName: values.lastName,
      userEmail: values.email,
      userPhone: values.phone,
      totalPrice: bookingInfo?.totalBookingPrice,
      checkInDate: bookingInfo?.checkIn,
      checkOutDate: bookingInfo?.checkOut,
      numPeople: guestCount,
      numRooms,
      bookingItems,
      language,
      propertyName: property?.name || "",
      propertyAddress: property?.address || "",
      checkInTimeData: property?.checkInTimeData || {},
      checkOutTimeData: property?.checkOutTimeData || {},
      typeData: property?.typeData || {},
      propertyId: propertyId,
    };

    const res = await createBooking(data);
    if (res && res.errCode === 0) {
      message.success("Đặt phòng thành công!");
      navigate("/");
    } else {
      message.error("Đặt phòng thất bại. Vui lòng thử lại.");
      console.log("Booking error response:", res);
    }
  };

  useEffect(() => {
    const fetchPropertyById = async (propertyId) => {
      const res = await getPropertyById(propertyId);
      setProperty(res.data);
      if (res && res.errCode === 0 && res.data) {
        setProperty(res.data);
      }
    };

    if (propertyId) {
      fetchPropertyById(propertyId);
    }
  }, [propertyId]);

  return (
    <div className="hotel-booking">
      <Row gutter={24}>
        {/* Hotel Information */}
        <Col xs={24} lg={11}>
          <HotelInfoCard bookingInfo={bookingInfo} property={property} />
        </Col>

        {/* Booking Form */}
        <Col xs={24} lg={13}>
          <Card className="booking-form-card">
            <Title level={3}>{t("enter_your_details")}</Title>

            <div className="info-notice">
              <InfoCircleOutlined />
              <Text>{t("almost_done")}</Text>
              <div>{t("latin_notice")}</div>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleCreateBooking}
              className="booking-form"
            >
              <Form.Item
                label={t("full_name")}
                name="lastName"
                rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={t("email_address")}
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Text className="email-note">{t("booking_email_notice")}</Text>

              <Form.Item
                label={t("phone_number")}
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Text className="phone-note">{t("phone_notice")}</Text>

              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block>
                  {t("booking")}
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
