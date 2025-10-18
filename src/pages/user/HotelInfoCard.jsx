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
import { useTranslation } from "react-i18next";
const HotelInfoCard = ({ bookingInfo, property }) => {
  const language = useSelector((state) => state.app.language);
  const stayDays = useSelector((state) => state.search.stayDays);
  const { t } = useTranslation("common");
  if (!property) return null;

  return (
    <>
      <Card className="hotel-info-card">
        <div className="hotel-image">
          <img src={property?.avatar} alt="UK Hotel Dalat" />
        </div>

        <div className="hotel-details">
          <div className="hotel-rating">
            <Text>
              {language === "vi"
                ? property?.typeData?.valueVi
                : property?.typeData?.valueEn}
            </Text>

            <Tag color="orange">ROOM.BOOKING</Tag>
          </div>

          <Title level={3} className="hotel-name">
            {property?.name}
          </Title>

          <div className="hotel-address">
            <EnvironmentOutlined />
            <Text>{property?.address}</Text>
          </div>
          {property?.Reviews?.totalRating > 0 && (
            <>
              <div className="score-badge">
                {parseFloat(property?.Reviews?.avgRating)}
              </div>
              <Text> {property?.Reviews?.totalRating} {t("evaluate")}</Text>
            </>
          )}
        </div>

        <div className="booking-details">
          <Title level={4}>{t("your_room_details")}</Title>

          <BookingSummary bookingInfo={bookingInfo} />
        </div>
      </Card>
    </>
  );
};
export default HotelInfoCard;
