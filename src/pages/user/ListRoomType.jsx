import { Button, Popover, Select, Table, message } from "antd";
import GuestPicker from "../../components/GuestPicker";
import DateRangePicker from "../../components/DateRangePicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./ListRoomType.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInfo } from "../../redux/slices/searchSlice";
import { getSuitableRoomTypes } from "../../utils/api";
import { fetchRoomType } from "../../redux/slices/allcodeSlice";
import { SyncOutlined } from "@ant-design/icons";
import BookingSummary from "./BookingSummary";
import { useNavigate } from "react-router-dom";

const ListRoomType = ({ propertyId }) => {
  const savedGuestCount = Number(localStorage.getItem("guestCount")) || 1;
  const savedRoomCount = Number(localStorage.getItem("roomCount")) || 1;
  const savedCheckIn = localStorage.getItem("checkIn") || null;
  const savedCheckOut = localStorage.getItem("checkOut") || null;

  const [guestCount, setGuestCount] = useState(savedGuestCount);
  const [roomCount, setRoomCount] = useState(savedRoomCount);
  const [checkIn, setCheckIn] = useState(savedCheckIn);
  const [checkOut, setCheckOut] = useState(savedCheckOut);
  const [openGuestPicker, setOpenGuestPicker] = useState(false);
  const [listRoomType, setListRoomType] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [selectedRoomType, setSelectedRoomType] = useState({});

  const language = useSelector((state) => state.app.language);
  const roomTypes = useSelector((state) => state.allcode.roomTypes);
  const checkInRedux = useSelector((state) => state.search.checkIn);
  const checkOutRedux = useSelector((state) => state.search.checkOut);
  const stayDays = useSelector((state) => state.search.stayDays);
  const guestCountRedux = useSelector((state) => state.search.guestCount);
  const roomCountRedux = useSelector((state) => state.search.roomCount);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomType());
  }, []);

  const handleOnchangeDate = (dates, dateStrings) => {
    if (!dates) {
      setCheckIn(null);
      setCheckOut(null);
    } else {
      setCheckIn(dayjs(dates?.[0]).format("YYYY-MM-DD"));
      setCheckOut(dayjs(dates?.[1]).format("YYYY-MM-DD"));
    }
  };

  const handleOnClickSearch = () => {
    const missingFields = [];

    if (!guestCount) missingFields.push("số khách");
    if (!roomCount) missingFields.push("số phòng");
    if (!checkIn) missingFields.push("ngày check-in");
    if (!checkOut) missingFields.push("ngày check-out");

    if (missingFields.length > 0) {
      message.warning(`Vui lòng chọn: ${missingFields.join(", ")}`);
      return;
    }

    dispatch(
      setSearchInfo({
        guestCount,
        roomCount,
        checkIn,
        checkOut,
      })
    );
    localStorage.setItem("checkIn", checkIn);
    localStorage.setItem("checkOut", checkOut);
    localStorage.setItem("guestCount", guestCount);
    localStorage.setItem("roomCount", roomCount);

    message.success("Cập nhật thông tin tìm kiếm thành công!");
  };

  useEffect(() => {
    const fetchRoomTypes = async () => {
      const data = {
        propertyId: propertyId,
        totalGuests: guestCountRedux,
        roomsRequested: roomCountRedux,
        checkInDate: checkIn,
        checkOutDate: checkOut,
      };

      const res = await getSuitableRoomTypes(data);

      if (res && res.data) {
        setListRoomType(res.data);
      }
    };

    fetchRoomTypes();
  }, [guestCountRedux, roomCountRedux, checkIn, checkOut]);

  const columns = [
    {
      title: "Room Type",
      dataIndex: "type",
      render: (_, record) =>
        language === "vi"
          ? record.roomTypeData?.valueVi
          : record.roomTypeData?.valueEn,
    },
    {
      title: "Guests",
      dataIndex: "numPeople",
      key: "numPeople",
    },
    {
      title: "Price (VND)",
      dataIndex: "price",
      key: "price",
      render: (price) => price.toLocaleString(),
    },
    {
      title: "Available Rooms",
      dataIndex: "availableQuantity",
      key: "availableQuantity",
    },
    {
      key: "selectQty",
      title: "Quantity",
      render: (_, record) => {
        const options = Array.from(
          { length: record.availableQuantity },
          (_, i) => ({
            value: i + 1,
            label: i + 1,
          })
        );

        return (
          <Select
            placeholder="Select"
            style={{ width: 80 }}
            value={selectedQuantities[record.id] ?? null}
            onChange={(value) => {
              if (value === null) {
                setSelectedQuantities((prev) => {
                  const updated = { ...prev };
                  delete updated[record.id];
                  return updated;
                });
                setSelectedRoomType((prev) => {
                  const updated = { ...prev };
                  delete updated[record.id];
                  return updated;
                });
              } else {
                setSelectedQuantities((prev) => ({
                  ...prev,
                  [record.id]: value,
                }));
                setSelectedRoomType((prev) => ({
                  ...prev,
                  [record.id]: record.typeCode,
                }));
              }
            }}
          >
            <Select.Option value={null}>0</Select.Option>
            {options.map((opt) => (
              <Select.Option key={opt.value} value={opt.value}>
                {opt.label}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
  ];

  let totalBookingPrice = 0;
  Object.entries(selectedQuantities).forEach(([roomTypeId, quantity]) => {
    const roomType = listRoomType.find(
      (item) => item.id === Number(roomTypeId)
    );
    if (!roomType) return;
    const nights =
      checkIn && checkOut ? dayjs(checkOut).diff(dayjs(checkIn), "day") : 1;
    totalBookingPrice += roomType.price * quantity * nights;
  });

  useEffect(() => {
    console.log("check selectedQuantities: ", selectedQuantities);
  }, [selectedQuantities]);

  useEffect(() => {
    console.log("check selectedRoomType: ", selectedRoomType);
  }, [selectedRoomType]);

  useEffect(() => {
    console.log("check listRoomType: ", listRoomType);
  }, [listRoomType]);

  const bookingInfo = {
    checkIn,
    checkOut,
    selectedQuantities,
    listRoomType,
    selectedRoomType,
    roomTypes,
    totalBookingPrice,
  };
  const handleBooking = () => {
    console.log("Check click", bookingInfo);
    navigate("/booking-info", { state: { bookingInfo, propertyId } });
  };

  return (
    <div className="list-room-type-container">
      <h1 className="page-title">Choose Your Room</h1>
      <div className="search-section">
        <DateRangePicker
          value={
            checkIn && checkOut
              ? [dayjs(checkIn), dayjs(checkOut)]
              : [null, null]
          }
          onChange={handleOnchangeDate}
          className="date-picker"
        />
        <Popover
          content={
            <GuestPicker
              guestCount={guestCount}
              setGuestCount={setGuestCount}
              roomCount={roomCount}
              setRoomCount={setRoomCount}
              onClose={() => setOpenGuestPicker(false)}
            />
          }
          trigger="click"
          open={openGuestPicker}
          onOpenChange={setOpenGuestPicker}
          placement="bottom"
        >
          <Button className="guest-button">
            {guestCount} Guest{guestCount > 1 ? "s" : ""} - {roomCount} Room
            {roomCount > 1 ? "s" : ""}
          </Button>
        </Popover>
        <Button
          className="search-button"
          type="primary"
          onClick={handleOnClickSearch}
        >
          <SyncOutlined /> Áp dụng
        </Button>
      </div>

      <div className="room-table-section">
        <Table
          dataSource={listRoomType}
          columns={columns}
          rowKey="id"
          pagination={false}
          className="room-table"
        />
      </div>

      <BookingSummary bookingInfo={bookingInfo} />
      <Button
        disabled={Object.keys(selectedRoomType).length === 0}
        type="primary"
        className="book-btn"
        onClick={handleBooking}
      >
        <i className="fas fa-bed"></i> Tiến hành đặt phòng
      </Button>
    </div>
  );
};

export default ListRoomType;
