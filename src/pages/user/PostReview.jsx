import React, { useEffect, useState } from "react";
import {
  Card,
  Rate,
  Input,
  Button,
  Form,
  DatePicker,
  Select,
  Typography,
  Space,
  message,
  Avatar,
  Divider,
} from "antd";
import {
  UserOutlined,
  SendOutlined,
  HomeOutlined,
  CalendarOutlined,
  StarOutlined,
} from "@ant-design/icons";
import "./PostReview.scss";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPropertyById } from "../../utils/api/propertyApi";
import { updateReview } from "../../utils/api";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

const PostReview = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const language = useSelector((state) => state.app.language);
  const token = queryParams.get("token");
  const propertyId = queryParams.get("propertyId");
  const [property, setProperty] = useState({});

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);

  const { t } = useTranslation("common");

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      let date = new Date();
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");
      let formattedDate = `${year}/${month}/${day}`;

      const reviewData = {
        ...values,
        rating: rating,
        propertyId,
        reviewToken: token,
        reviewDate: formattedDate,
      };

      const res = await updateReview(reviewData);
      if (res && res.errCode !== 0) {
        message.error("Đánh giá thất bại, vui lòng thử lại");
        return;
      }

      console.log("check submit: ", reviewData);

      message.success("Đánh giá của bạn đã được gửi thành công!");
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      const res = await getPropertyById(propertyId);
      if (res && res.errCode === 0) {
        setProperty(res.data);
      }
    };
    fetchProperty();
  }, [propertyId]);

  const getRatingDescription = (value) => {
    const descriptions = {
      1: language === "vi" ? "Rất tệ" : "Very bad",
      2: language === "vi" ? "Tệ" : "Bad",
      3: language === "vi" ? "Không tốt" : "Not good",
      4: language === "vi" ? "Kém" : "Poor",
      5: language === "vi" ? "Trung bình" : "Average",
      6: language === "vi" ? "Khá" : "Fair",
      7: language === "vi" ? "Tốt" : "Good",
      8: language === "vi" ? "Rất tốt" : "Very good",
      9: language === "vi" ? "Tuyệt vời" : "Excellent",
      10: language === "vi" ? "Hoàn hảo" : "Perfect",
    };
    return descriptions[value] || "";
  };

  return (
    <div className="post-review-container">
      <Card className="post-review-card">
        <div className="review-header">
          <div className="hotel-info">
            <Avatar
              size={48}
              icon={<HomeOutlined />}
              className="hotel-avatar"
            />
            <div className="hotel-details">
              <Title level={4} className="hotel-name">
                {language === "vi"
                  ? property?.typeData?.valueVi
                  : property?.typeData?.valueEn}{" "}
                {property.name}
              </Title>
              <Text type="secondary">{t("share_experience")}</Text>
            </div>
          </div>
        </div>

        <Divider />

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="review-form"
        >
          <div className="rating-section">
            <Form.Item label={t("overall_rating")} required>
              <div className="rating-wrapper">
                <Rate
                  count={10}
                  value={rating}
                  onChange={setRating}
                  className="custom-rate"
                  character={<StarOutlined />}
                />
                <div className="rating-info">
                  <span className="rating-score">{rating}/10</span>
                  {rating > 0 && (
                    <span className="rating-desc">
                      {getRatingDescription(rating)}
                    </span>
                  )}
                </div>
              </div>
            </Form.Item>
          </div>

          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Form.Item name="comment" label={t("detailed_review")}>
              <TextArea
                rows={6}
                placeholder={t("share_experience_description")}
                maxLength={500}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={rating === 0}
                icon={<SendOutlined />}
                size="large"
                className="submit-btn"
                block
              >
                {loading ? t("submitting") : t("submit_review")}
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default PostReview;
