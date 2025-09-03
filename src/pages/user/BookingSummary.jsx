import dayjs from "dayjs";
import "./BookingSummary.scss";
import { useSelector } from "react-redux";
import { Col, Row, Typography } from "antd";

const BookingSummary = ({ bookingInfo }) => {
  const {
    checkIn,
    checkOut,
    selectedQuantities,
    listRoomType,
    selectedRoomType,
    roomTypes,
    totalBookingPrice,
  } = bookingInfo;
  const { Text } = Typography;

  const language = useSelector((state) => state.app.language);


  

  const formatDateWithDay = (date, language) => {
    if (!date) return "Chưa chọn";

    if (language === "vi") {
      const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
      const dow = dayjs(date).day(); 
      return `${days[dow]}, ${dayjs(date)
        .locale("vi")
        .format("D [tháng] M YYYY")}`;
    } else {
      return dayjs(date).locale("en").format("ddd, MMMM D, YYYY");
    }
  };
  return (
    <div className="booking-summary">
      <div className="summary-details">
       
        <Row>
          <Col span={12}>
            <div className="detail-section">
              <Text strong>Nhận phòng</Text>
              <div>{formatDateWithDay(checkIn, language)}</div>
              {/* <div>13:30 – 00:00</div> */}
            </div>
          </Col>

          <Col span={12}>
            <div className="detail-section">
              <Text strong>Trả phòng</Text>
              <div>{formatDateWithDay(checkOut, language)}</div>
              {/* <div>00:00 – 00:00</div> */}
            </div>
          </Col>
        </Row>

        {Object.entries(selectedQuantities).length === 0 ? (
          <p className="empty-selection">Chưa chọn phòng</p>
        ) : (
          <ul className="room-list">
            {Object.entries(selectedQuantities).map(
              ([roomTypeId, quantity]) => {
                const roomType = listRoomType.find(
                  (item) => item.id === Number(roomTypeId)
                );
                if (!roomType) return null;

                const nights =
                  checkIn && checkOut
                    ? dayjs(checkOut).diff(dayjs(checkIn), "day")
                    : 1;
                const totalPrice = roomType.price * quantity * nights;

                return (
                  <li key={roomTypeId} className="room-item">
                    <span className="room-name">
                      {roomTypes.find(
                        (item) => item.keyMap === selectedRoomType[roomTypeId]
                      )
                        ? language === "vi"
                          ? roomTypes.find(
                              (item) =>
                                item.keyMap === selectedRoomType[roomTypeId]
                            ).valueVi
                          : roomTypes.find(
                              (item) =>
                                item.keyMap === selectedRoomType[roomTypeId]
                            ).valueEn
                        : "Loại phòng không xác định"}
                    </span>
                    <span className="room-info">
                      {quantity} phòng × {nights} đêm
                    </span>
                    <span className="room-price">
                      {totalPrice.toLocaleString()} VND
                    </span>
                  </li>
                );
              }
            )}
          </ul>
        )}

        {Object.entries(selectedQuantities).length > 0 && (
          <div className="total-price">
            <strong>Tổng cộng:</strong> {totalBookingPrice.toLocaleString()} VND
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;
