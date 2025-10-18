import React from "react";
import { Avatar, Space, Typography, Card } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import "./PropertyReviewItem.scss";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const { Text, Title } = Typography;

const PropertyReviewItem = ({ review }) => {
  const language = useSelector((state) => state.app.language);
  const { userName, rating, comment, reviewDate, booking } = review;
  const { checkInDate, checkOutDate, numPeople, bookingItems } = booking;
  const { t } = useTranslation("common");
  // format reviewDate VI
  const dateObject = new Date(reviewDate);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  // tính số đêm
  const checkInDateObj = new Date(checkInDate);
  const checkOutDateObj = new Date(checkOutDate);
  const timeDifference = checkOutDateObj.getTime() - checkInDateObj.getTime();
  const stayDays = Math.round(timeDifference / (1000 * 60 * 60 * 24));

  return (
    <Card className="property-review-card" style={{ padding: "16px" }}>
      <div className="review-header">
        <Space size={16} align="start">
          <Avatar size={48} icon={<UserOutlined />} className="review-avatar">
            A
          </Avatar>

          <div className="review-main-content">
            <div className="review-top">
              <Title level={5} className="review-title">
                {userName}
              </Title>

              <Text type="secondary" className="review-date">
                {language === "vi" ? formattedDate : reviewDate}
              </Text>
            </div>
          </div>
        </Space>
      </div>

      <div className="review-body">
        <Text className="review-content">{comment}</Text>
      </div>

      <div className="review-footer">
        <div className="footer-left">
          <Space size={16} wrap>
            <Space size={4}>
              <Text type="secondary">{numPeople} {numPeople?.length > 1 ?t("guests"):t("guest")}</Text>
            </Space>
            <Space size={4}>
              {bookingItems &&
                bookingItems.length > 0 &&
                bookingItems.map((item, index) => (
                  <Text key={index} type="secondary">
                    {language === "vi"
                      ? `${item.quantity} ${item.roomType?.roomTypeData?.valueVi}`
                      : `${item.quantity} ${item.roomType?.roomTypeData?.valueEn}`}
                    ,
                  </Text>
                ))}
            </Space>

            <Space size={4}>
              <CalendarOutlined className="footer-icon" />
              <Text type="secondary">{stayDays} {t("night")}</Text>
            </Space>
          </Space>
        </div>

        <div className="footer-right">
          <Text className="review-rating-text">{rating} / 10</Text>
        </div>
      </div>
    </Card>
  );
};

export default PropertyReviewItem;
