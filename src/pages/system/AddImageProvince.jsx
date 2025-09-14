import { useEffect, useState } from "react";
import {
  bulkAddImages,
  deleteImageByTargetId,
  deleteImageCloud,
  getImageByTargetId,
  getListProvince,
} from "../../utils/api";
import { Form, Select, Upload, Button, Image, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const AddImageProvince = () => {
  const [listProvince, setListProvince] = useState([]);
  const [selectProvince, setSelectProvince] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [actionMode, setActionMode] = useState("CREATE");

  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    let isMounted = true;

    const fetchListProvince = async () => {
      try {
        const res = await getListProvince();
        if (res && res.errCode === 0 && res.data && isMounted) {
          setListProvince(res.data);
        }
      } catch (error) {
        message.error("Lỗi khi tải danh sách tỉnh");
      }
    };

    fetchListProvince();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChangeProvince = async (id) => {
    const res = await getImageByTargetId(id);
    if (res && res.errCode === 0 && res.data) {
      setSelectProvince(res.data);
    }
    // console.log("Selected province:", res);
    if (res?.data?.url) {
      setActionMode("UPDATE");
    } else {
      setActionMode("CREATE");
    }
  };

  useEffect(() => {
    // console.log("selectProvince", selectProvince);
  }, [selectProvince]);

  const handlePreview = (file) => {
    const preview = URL.createObjectURL(file);
    setPreviewImage(preview);
    setSelectedFile(file);

    return () => {
      URL.revokeObjectURL(preview);
    };
  };

  const uploadProps = {
    beforeUpload: (file) => {
      handlePreview(file);
      return false;
    },
    maxCount: 1,
    showUploadList: false,
  };

  const handleFinish = async (values) => {
    // console.log("Form values:", values);

    if (actionMode === "CREATE") {
      if (!selectedFile) {
        message.error("Vui lòng chọn ảnh để tải lên.");
        return;
      }

      const formData = new FormData();
      formData.append("type", "PROVINCE");
      formData.append("targetId", values.provinceId);
      formData.append("folder", "provinces");
      formData.append("images", selectedFile);

      const res = await bulkAddImages(formData);
      if (res && res.errCode === 0) {
        message.success("Ảnh đã được thêm thành công.");
        setPreviewImage(null);
        setSelectedFile(null);
        setSelectProvince({});
      } else {
        message.error("Có lỗi xảy ra khi thêm ảnh.");
      }
    }
    // ...existing code...
    else if (actionMode === "UPDATE") {
      if (!selectedFile) {
        message.error("Vui lòng chọn ảnh để cập nhật.");
        return;
      }

      // Xóa ảnh cũ theo targetId
      // console.log("Deleting old image for targetId:", values.provinceId);
      const delRes = await deleteImageByTargetId(values.provinceId);
      // console.log("Delete response:", delRes);
      if (delRes && delRes.errCode === 0) {

        const formData = new FormData();
        formData.append("type", "PROVINCE");
        formData.append("targetId", values.provinceId);
        formData.append("folder", "provinces");
        formData.append("images", selectedFile);

        const res = await bulkAddImages(formData);
        if (res && res.errCode === 0) {
          message.success("Cập nhật ảnh thành công.");
          setPreviewImage(null);
          setSelectedFile(null);
          setSelectProvince({});
        } else {
          message.error("Có lỗi xảy ra khi cập nhật ảnh.");
        }
      } else {
        message.error("Xóa ảnh cũ thất bại.");
      }
    }
  };

  useEffect(() => {
    // console.log("Action mode:", actionMode);
  }, [selectProvince, actionMode]);
  return (
    <Form layout="vertical" onFinish={handleFinish}>
      <h1>AddImageProvince</h1>

      <Form.Item
        label="Chọn địa điểm"
        name="provinceId"
        rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành!" }]}
      >
        <Select
          placeholder="Chọn địa điểm"
          onChange={handleChangeProvince}
          value={selectProvince?.id}
        >
          {listProvince.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {language === "vi" ? item.valueVi : item.valueEn}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {selectProvince?.url && (
        <div style={{ marginBottom: 16 }}>
          <p>Ảnh hiện tại:</p>
          <Image width={500} src={selectProvince.url} alt="Province" />
        </div>
      )}

      {previewImage && (
        <div style={{ marginBottom: 16 }}>
          <p>Ảnh xem trước:</p>
          <Image width={500} src={previewImage} alt="Preview" />
        </div>
      )}

      <Form.Item label="Upload ảnh mới">
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddImageProvince;
