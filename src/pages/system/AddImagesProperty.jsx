import { Button, Form, Select, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../../redux/slices/propertySlice";
import { UploadOutlined } from "@ant-design/icons";
import {
  bulkAddImages,
  deleteImageById,
  getImagesProperty,
} from "../../utils/api";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const AddImagesProperty = () => {
  const propertyId = useSelector((state) => state.user.propertyId);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const properties = useSelector((state) => state.property.properties);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const buildDataListProperties = (data) => {
    if (data && data.length > 0) {
      return data.map((item) => ({
        label: item.name,
        value: item.id,
      }));
    }
    return [];
  };

  useEffect(() => {
    // Nếu đã có propertyId thì set luôn, không cần đợi chọn
    if (propertyId) {
      setSelectedPropertyId(propertyId);
    }
  }, [propertyId]);

  const options = buildDataListProperties(properties);

  const handleOnchangeSelectProperty = (value) => {
    setSelectedPropertyId(value);
  };

  const handleFinish = async () => {
    if (!selectedPropertyId) {
      message.error("Vui lòng chọn cơ sở trước!");
      return;
    }
    if (fileList.length === 0) {
      message.error("Vui lòng chọn ít nhất một ảnh!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("type", "PROPERTY");
      formData.append("targetId", selectedPropertyId);
      formData.append("folder", "properties");
      fileList.forEach((file) => {
        formData.append("images", file.originFileObj);
      });

      const res = await bulkAddImages(formData);
      if (res.errCode === 0) {
        message.success("Upload ảnh thành công!");
        setFileList([]);
        // load lại ảnh mới
        fetchImagesForProperty(selectedPropertyId);
      } else {
        message.error(res.data.message || "Upload thất bại!");
      }
    } catch (err) {
      console.error("Upload error:", err);
      message.error("Có lỗi xảy ra!");
    }
  };

  const fetchImagesForProperty = async (propertyId) => {
    if (!propertyId) return;
    const res = await getImagesProperty(propertyId);
    if (res.errCode === 0) {
      setImages(res.data);
    }
  };

  useEffect(() => {
    fetchImagesForProperty(selectedPropertyId);
  }, [selectedPropertyId]);

  const handleDeleteImage = async (image) => {
    // gọi API xóa ở đây nếu có
    setImages((prev) => prev.filter((img) => img.id !== image.id));
    const res = await deleteImageById(image.id);
    if (res.errCode === 0) {
      message.success("Xoá ảnh thành công!");
    } else {
      message.error("Xoá ảnh thất bại!");
    }
  };

  return (
    <>
      <h1>Quản lý hình ảnh cơ sở</h1>
      {!propertyId && (
        <Select
          style={{ width: "100%", marginBottom: 20 }}
          placeholder="Chọn cơ sở"
          showSearch
          optionFilterProp="label"
          value={selectedPropertyId}
          options={options}
          onChange={handleOnchangeSelectProperty}
        />
      )}

      {/* Form upload ảnh mới */}
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Upload ảnh mới">
          <Upload
            multiple
            fileList={fileList}
            beforeUpload={() => false} // không upload tự động
            onChange={({ fileList }) => setFileList(fileList)}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Upload
          </Button>
        </Form.Item>
      </Form>

      {/* Hiển thị danh sách ảnh */}
      {images.length > 0 && (
        <PhotoProvider>
          <div
            style={{
              marginTop: 30,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 16,
            }}
          >
            {images.map((img) => (
              <div
                key={img.id}
                style={{
                  position: "relative",
                  border: "1px solid #eee",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                <PhotoView src={img.url}>
                  <img
                    src={img.url}
                    alt="property"
                    style={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                </PhotoView>
                <Button
                  danger
                  type="primary"
                  size="small"
                  style={{ position: "absolute", top: 8, right: 8 }}
                  onClick={() => handleDeleteImage(img)}
                >
                  Xoá
                </Button>
              </div>
            ))}
          </div>
        </PhotoProvider>
      )}
    </>
  );
};

export default AddImagesProperty;
