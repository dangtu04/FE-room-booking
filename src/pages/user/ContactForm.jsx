import React from "react";
import { Form, Input, Button, Card, Typography, Row, Col, message } from "antd";
import { MailOutlined, SendOutlined, MessageOutlined } from "@ant-design/icons";
import "./ContactForm.scss";
import { postContact } from "../../utils/api/contactApi";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;
const { TextArea } = Input;

const ContactForm = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation("common");

  const handleSubmit = async (values) => {
    try {
      const res = await postContact(values);
      if (res && res.errCode === 2) {
        message.warning("Email liên hệ này đã được sử dụng");
        return;
      }
      if (res && res.errCode !== 0) {
        message.error("Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại!");
        return;
      }

      message.success("Tin nhắn của bạn đã được gửi thành công!");
      form.resetFields();
    } catch (error) {
      message.error("Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại!");
    }
  };

  return (
    <div className="contact-form-wrapper">
      <div className="contact-form-container">
        <Card className="contact-form-card" bordered={false}>
          <Row gutter={48} align="middle">
            {/* Left Side - Content */}
            <Col xs={24} lg={12} className="left-content">
              <div className="content-section">
                <div className="header-icon">
                  <MailOutlined />
                </div>
                <Title level={2} className="main-title">
                  {t("contact_form.contact_us")}
                </Title>
                <Text className="main-description">
                  {t("contact_form.contact_description")}
                </Text>

                <div className="features-list">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <MailOutlined />
                    </div>
                    <div className="feature-text">
                      <Text className="feature-title">
                        {t("contact_form.quick_response")}
                      </Text>
                      <Text className="feature-desc">
                        {t("contact_form.within_24h")}
                      </Text>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <MessageOutlined />
                    </div>
                    <div className="feature-text">
                      <Text className="feature-title">
                        {t("contact_form.dedicated_support")}
                      </Text>
                      <Text className="feature-desc">
                        {t("contact_form.professional_team")}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            {/* Right Side - Form */}
            <Col xs={24} lg={12} className="right-form">
              <div className="form-section">
                <div className="form-header">
                  <Title level={3} className="form-title">
                    {t("contact_form.send_message")}
                  </Title>
                  <Text className="form-subtitle">
                    {t("contact_form.fill_information")}
                  </Text>
                </div>

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  className="form-content"
                >
                  <Form.Item
                    name="contactEmail"
                    label={t("contact_form.your_email")}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập email của bạn!",
                      },
                      {
                        type: "email",
                        message: "Email không hợp lệ!",
                      },
                    ]}
                    className="form-field"
                  >
                    <Input
                      prefix={<MailOutlined className="input-prefix-icon" />}
                      placeholder="your.email@example.com"
                      size="large"
                      className="custom-input"
                    />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label={t("contact_form.your_message")}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tin nhắn!",
                      },
                    ]}
                    className="form-field"
                  >
                    <TextArea
                      rows={4}
                      placeholder={t("contact_form.enter_your_message")}
                      showCount
                      maxLength={500}
                      className="custom-textarea"
                    />
                  </Form.Item>

                  <div className="submit-section">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        block
                        className="submit-button"
                        icon={<SendOutlined />}
                      >
                        {t("contact_form.send_message")}
                      </Button>
                    </Form.Item>
                  </div>

                  <div className="form-footer">
                    <Text className="footer-text">
                      {t("contact_form.confidential_info")}
                    </Text>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default ContactForm;
