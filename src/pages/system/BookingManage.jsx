import React, { useEffect, useState } from "react";
import {
  Table,
  Select,
  DatePicker,
  Button,
  Tag,
  Space,
  Modal,
  Descriptions,
  Card,
  Row,
  Col,
  Typography,
  Popconfirm,
  message,
} from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../../redux/slices/propertySlice";
import { changeBookingStatus, getBookingList } from "../../utils/api";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

const BookingManage = () => {
  const propertyId = useSelector((state) => state.user.propertyId);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateRange, setDateRange] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    setSelectedPropertyId(propertyId);
  }, [propertyId]);

  const fetchBoookingList = async (data) => {
    const res = await getBookingList(data);
    if (res && res.errCode === 0) {
      setBookings(res.data);
      console.log("list booking: ", res.data);
    } else {
      console.log("Get booking list failed!");
    }
  };

  useEffect(() => {
    fetchBoookingList({ propertyId: selectedPropertyId });
  }, [selectedPropertyId]);

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
  const options = buildDataListProperties(properties);

  const handleOnchangeSelectProperty = (value) => {
    setSelectedPropertyId(value);
  };

  const statusConfig = {
    PENDING: {
      color: "orange",
      valueVi: "Chờ xác nhận",
      valueEn: "Pending confirmation",
    },
    CONFIRMED: { color: "blue", valueVi: "Đã xác nhận", valueEn: "Confirmed" },
    CHECKED_IN: {
      color: "green",
      valueVi: "Đã nhận phòng",
      valueEn: "Checked in",
    },
    CHECKED_OUT: {
      color: "purple",
      valueVi: "Đã trả phòng",
      valueEn: "Checked out",
    },
    CANCELLED: { color: "red", valueVi: "Đã hủy", valueEn: "Cancelled" },
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    console.log("Update status: ", bookingId, newStatus);

    const res = await changeBookingStatus(bookingId, newStatus);
    if (res && res.errCode !== 0) {
      message.error("Cập nhật trạng thái thất bại!");
      return;
    }

    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, statusCode: newStatus }
          : booking
      )
    );
    message.success("Cập nhật trạng thái thành công!");
  };

  const handleCancelBooking = async (bookingId) => {
    handleStatusChange(bookingId, "CANCELLED");
  };

  const showDetail = (booking) => {
    setSelectedBooking(booking);
    setDetailModalVisible(true);
  };

  const filteredBookings = bookings.filter((booking) => {
    let statusMatch =
      selectedStatus === "all" || booking.statusCode === selectedStatus;

    let dateMatch = true;
    if (dateRange && dateRange.length === 2) {
      const checkInDate = new Date(booking.checkInDate);
      const startDate = dateRange[0].toDate();
      const endDate = dateRange[1].toDate();
      dateMatch = checkInDate >= startDate && checkInDate <= endDate;
    }

    return statusMatch && dateMatch;
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Khách hàng",
      key: "customer",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{record.userName}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            {record.userPhone}
          </div>
        </div>
      ),
    },
    {
      title: "Check-in",
      dataIndex: "checkInDate",
      key: "checkInDate",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Check-out",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Phòng/Người",
      key: "roomPeople",
      render: (_, record) =>
        `${record.numRooms} phòng / ${record.numPeople} người`,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => (
        <Select
          value={record.statusCode}
          style={{ width: 140 }}
          onChange={(value) => handleStatusChange(record.id, value)}
        >
          {Object.entries(statusConfig).map(([key, config]) => (
            <Option key={key} value={key}>
              <Tag color={config.color}>
                {language === "vi" ? config.valueVi : config.valueEn}
              </Tag>
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            ghost
            size="small"
            icon={<EyeOutlined />}
            onClick={() => showDetail(record)}
          >
            Chi tiết
          </Button>
          {record.statusCode !== "CANCELLED" && (
            <Popconfirm
              title="Bạn có chắc muốn hủy booking này?"
              onConfirm={() => handleCancelBooking(record.id)}
              okText="Có"
              cancelText="Không"
            >
              <Button danger size="small" icon={<DeleteOutlined />}>
                Hủy
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Quản lý đặt phòng</Title>

      <Card style={{ marginBottom: "24px" }}>
        {!propertyId && (
          <>
            <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
              Chọn cơ sở:
            </div>
            <Select
              style={{ width: "100%", marginBottom: 16 }}
              placeholder="Chọn cơ sở"
              showSearch
              optionFilterProp="label"
              value={selectedPropertyId}
              options={options}
              onChange={handleOnchangeSelectProperty}
            />
          </>
        )}
        <Row gutter={16} align="middle">
          <Col span={8}>
            <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
              Lọc theo trạng thái:
            </div>
            <Select
              value={selectedStatus}
              onChange={setSelectedStatus}
              style={{ width: "100%" }}
              placeholder="Chọn trạng thái"
            >
              <Option value="all">Tất cả trạng thái</Option>
              {Object.entries(statusConfig).map(([key, config]) => (
                <Option key={key} value={key}>
                  {language === "vi" ? config.valueVi : config.valueEn}
                </Option>
              ))}
            </Select>
          </Col>

          <Col span={8}>
            <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
              Lọc theo ngày check-in:
            </div>
            <RangePicker
              value={dateRange}
              onChange={setDateRange}
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
            />
          </Col>

          <Col span={8}>
            <div style={{ marginBottom: "8px", color: "transparent" }}>.</div>
            <Button
              onClick={() => {
                setSelectedStatus("all");
                setDateRange(null);
              }}
            >
              Xóa bộ lọc
            </Button>
          </Col>
        </Row>
      </Card>

      <Card>
        <div style={{ marginBottom: "16px" }}>
          <strong>Tổng: {filteredBookings.length} booking</strong>
        </div>

        <Table
          columns={columns}
          dataSource={filteredBookings}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Tổng ${total} booking`,
          }}
        />
      </Card>

      {/* Modal chi tiết booking */}
      <Modal
        title="Chi tiết đặt phòng"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Đóng
          </Button>,
        ]}
        width={700}
      >
        {selectedBooking && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Booking ID" span={2}>
              {selectedBooking.id}
            </Descriptions.Item>
            <Descriptions.Item label="Tên khách hàng">
              {selectedBooking.userName}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {selectedBooking.userPhone}
            </Descriptions.Item>
            <Descriptions.Item label="Email" span={2}>
              {selectedBooking.userEmail}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày check-in">
              {new Date(selectedBooking.checkInDate).toLocaleDateString(
                "vi-VN"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày check-out">
              {new Date(selectedBooking.checkOutDate).toLocaleDateString(
                "vi-VN"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Số phòng">
              {selectedBooking.numRooms}
            </Descriptions.Item>
            <Descriptions.Item label="Số người">
              {selectedBooking.numPeople}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={statusConfig[selectedBooking.statusCode]?.color}>
                {language === "vi"
                  ? statusConfig[selectedBooking.statusCode]?.valueVi
                  : statusConfig[selectedBooking.statusCode]?.valueEn}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">
              <strong style={{ color: "#1890ff" }}>
                {formatCurrency(selectedBooking.totalPrice)}
              </strong>
            </Descriptions.Item>
            {/* <Descriptions.Item label="Danh sách phòng" span={2}>
              {selectedBooking.bookingItems?.map((item, index) => (
                <div key={index}>
                  {item.roomTypeName} x {item.quantity}
                </div>
              ))}
            </Descriptions.Item> */}
            <Descriptions.Item label="Token" span={2}>
              <code>{selectedBooking.token}</code>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default BookingManage;
