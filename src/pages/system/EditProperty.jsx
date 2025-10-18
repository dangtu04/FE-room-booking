import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Card, Upload, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { editProperty, getOwnersApi, getPropertyById } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCheckInTime,
  fetchCheckOutTime,
  fetchPropertyType,
  fetchProvinces,
} from "../../redux/slices/allcodeSlice";
import "./EditProperty.scss";
import MarkdownEditor from "../../components/MarkdownEditor";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const EditProperty = () => {
  const { state: data } = useLocation();
  const propertyId = data.propertyId;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [listOwners, setListOwners] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const allProvinces = useSelector((state) => state.allcode.provinces);
  const allType = useSelector((state) => state.allcode.propertyType);
  const checkInTime = useSelector((state) => state.allcode.checkInTime);
  const checkOutTime = useSelector((state) => state.allcode.checkOutTime);
  const language = useSelector((state) => state.app.language);
  const { t } = useTranslation("admin");

  useEffect(() => {
    dispatch(fetchProvinces());
    dispatch(fetchPropertyType());
    dispatch(fetchCheckInTime());
    dispatch(fetchCheckOutTime());
  }, []);

  // call api lấy dữ liệu property theo id
  useEffect(() => {
    const getProperty = async (propertyId) => {
      const res = await getPropertyById(propertyId);
      if (res && res.errCode === 0 && res.data) {
        const initialData = res.data;
        console.log("check initialData: ", initialData);
        form.setFieldsValue({
          name: initialData.name,
          provinceCode: initialData.provinceCode,
          address: initialData.address,
          typeCode: initialData.typeCode,
          ownerId: initialData.ownerId,
          checkInTimeCode: initialData.checkInTimeCode,
          checkOutTimeCode: initialData.checkOutTimeCode,
          contentMarkdown: initialData.contentMarkdown,
          contentHTML: initialData.contentHTML,
        });
        setAvatarUrl(initialData.avatar);
      }
    };

    getProperty(propertyId);
  }, [propertyId]);

  // call api get list owners
  useEffect(() => {
    const getAllOwners = async () => {
      const res = await getOwnersApi();
      if (res && res.errCode === 0) {
        if (res.data) {
          setListOwners(res.data);
        }
      }
    };

    getAllOwners();
  }, []);

  // build data owner cho select
  const buildDataListOwners = (data) => {
    if (data && data.length > 0) {
      return data.map((item) => ({
        label: item.email,
        value: item.id,
      }));
    }
  };
  // data cho Select
  const options = buildDataListOwners(listOwners);

  const handleOnChangeAvatar = (info) => {
    const file = info.fileList[0]?.originFileObj;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      console.log("check previewUrl: ", previewUrl);
      setAvatarUrl(previewUrl);
      setAvatarFile(file);
    }
  };

  // cleanup avatar url
  useEffect(() => {
    return () => {
      if (avatarUrl) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, [avatarUrl]);

  const handleSubmit = async (values) => {
    const formData = new FormData();

    formData.append("id", propertyId);
    formData.append("name", values.name);
    formData.append("provinceCode", values.provinceCode);
    formData.append("address", values.address);
    formData.append("typeCode", values.typeCode);
    formData.append("ownerId", values.ownerId);
    formData.append("checkInTimeCode", values.checkInTimeCode);
    formData.append("checkOutTimeCode", values.checkOutTimeCode);
    formData.append("contentHTML", values.contentHTML);
    formData.append("contentMarkdown", values.contentMarkdown);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    // Gửi API
    const res = await editProperty(formData);

    if (res && res.errCode === 0) {
      notification.success({
        message: "UPDATE PROPERTY",
        description: "Property updated successfully",
      });
    } else {
      notification.error({
        message: "UPDATE PROPERTY",
        description: res?.message || "Có lỗi xảy ra khi tạo.",
      });
    }
  };

  return (
    <div className="edit-property">
      <Card title={t("property-manage.edit")} bordered={false}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="form-section">
            <Form.Item
              name="name"
              label={t("property-manage.name")}
              rules={[
                { required: true, message: "Please enter property name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ownerId"
              label={t("property-manage.owner")}
              rules={[{ required: true, message: "Please select owner" }]}
            >
              <Select showSearch optionFilterProp="label" options={options} />
            </Form.Item>
          </div>

          <div className="form-section">
            <Form.Item
              name="typeCode"
              label={t("property-manage.room-type")}
              rules={[{ required: true, message: "Please select type" }]}
            >
              <Select placeholder={t("property-manage.select-property-type")}>
                {allType &&
                  allType.length > 0 &&
                  allType.map((item, index) => (
                    <Option key={index} value={item.keyMap}>
                      {language === "vi" ? item.valueVi : item.valueEn}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="provinceCode"
              label={t("property-manage.province")}
              rules={[{ required: true, message: "Please select province" }]}
            >
              <Select placeholder={t("property-manage.select-province")}>
                {allProvinces &&
                  allProvinces.length > 0 &&
                  allProvinces.map((item, index) => (
                    <Option key={index} value={item.keyMap}>
                      {language === "vi" ? item.valueVi : item.valueEn}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </div>

          <div className="form-section">
            <Form.Item
              name="checkInTimeCode"
              label={t("property-manage.checkin-time")}
              rules={[
                { required: true, message: "Please select check-in time" },
              ]}
            >
              <Select placeholder="Select check-in time">
                {checkInTime &&
                  checkInTime.length > 0 &&
                  checkInTime.map((item, index) => (
                    <Option key={index} value={item.keyMap}>
                      {language === "vi" ? item.valueVi : item.valueEn}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="checkOutTimeCode"
              label={t("property-manage.checkout-time")}
              rules={[
                { required: true, message: "Please select check-out time" },
              ]}
            >
              <Select placeholder="Select check-out time">
                {checkOutTime &&
                  checkOutTime.length > 0 &&
                  checkOutTime.map((item, index) => (
                    <Option key={index} value={item.keyMap}>
                      {language === "vi" ? item.valueVi : item.valueEn}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            className="form-full-width"
            name="address"
            label={t("property-manage.address")}
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="avatar-upload"
            name="avatar"
            label={t("property-manage.avatar")}
            valuePropName="fileList"
          >
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              accept="image/*"
              onChange={(info) => handleOnChangeAvatar(info)}
            >
              <Button icon={<UploadOutlined />}>
                {t("property-manage.choose-image")}
              </Button>
            </Upload>
            {avatarUrl && (
              <div className="avatar-preview">
                <img src={avatarUrl} alt="Avatar" />
              </div>
            )}
          </Form.Item>

          <Form.Item
            label={t("property-manage.introduction")}
            className="markdown-editor-item"
            shouldUpdate
          >
            {({ setFieldsValue, getFieldValue }) => (
              <MarkdownEditor
                value={getFieldValue("contentMarkdown") || ""}
                onChange={({ markdown, html }) => {
                  setFieldsValue({
                    contentMarkdown: markdown,
                    contentHTML: html,
                  });
                }}
              />
            )}
          </Form.Item>
          <Form.Item name="contentMarkdown" noStyle />
          <Form.Item name="contentHTML" noStyle />

          <Form.Item className="submit-button">
            <Button type="primary" htmlType="submit">
              {t("property-manage.save-changes")}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditProperty;
