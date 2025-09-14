import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Search.scss";
import {
  Select,
  DatePicker,
  ConfigProvider,
  Popover,
  Button,
  InputNumber,
  message,
} from "antd";
import viVN from "antd/locale/vi_VN";
import enUS from "antd/locale/en_US";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import "dayjs/locale/en";
import { useDispatch, useSelector } from "react-redux";
import GuestPicker from "./GuestPicker";
import LocationSelect from "./LocationSelect";
import DateRangePicker from "./DateRangePicker";
import { setSearchInfo } from "../redux/slices/searchSlice";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const language = useSelector((state) => state.app.language);
  const [openGuestPicker, setOpenGuestPicker] = useState(false);
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    location: savedLocation,
    checkIn: savedCheckIn,
    checkOut: savedCheckOut,
    guestCount: savedGuestCount,
    roomCount: savedRoomCount,
  } = useSelector((state) => state.search);

  const [selectedLocation, setSelectedLocation] = useState(savedLocation);
  const [guestCount, setGuestCount] = useState(savedGuestCount);
  const [roomCount, setRoomCount] = useState(savedRoomCount);
  const [checkIn, setCheckIn] = useState(savedCheckIn);
  const [checkOut, setCheckOut] = useState(savedCheckOut);

  // Cập nhật locale của dayjs
  useEffect(() => {
    dayjs.locale(language);
  }, [language]);

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

    if (!selectedLocation) missingFields.push("địa điểm");
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
        location: selectedLocation,
        guestCount,
        roomCount,
        checkIn,
        checkOut,
      })
    );
    localStorage.setItem("location", selectedLocation);
    localStorage.setItem("checkIn", checkIn);
    localStorage.setItem("checkOut", checkOut);
    localStorage.setItem("guestCount", guestCount);
    localStorage.setItem("roomCount", roomCount);
    const nights =
      checkIn && checkOut ? dayjs(checkOut).diff(dayjs(checkIn), "day") : 1;

    localStorage.setItem("stayDays", nights > 1 ? nights : 1);
    navigate(`/search?provinceCode=${selectedLocation}`);
  };

  return (
    <>
      <div className="search-container">
        <div className="location">
          <LocationSelect
            value={selectedLocation}
            onChange={setSelectedLocation}
          />
        </div>
        <div className="time-range">
          <DateRangePicker
            value={[checkIn, checkOut]}
            onChange={(dates, dateStrings) =>
              handleOnchangeDate(dates, dateStrings)
            }
          />
        </div>
        <div className="guest-picker">
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
            onOpenChange={(visible) => setOpenGuestPicker(visible)}
            placement="bottom"
          >
            <Button className="search-input">
              {guestCount} Người lớn - {roomCount} Phòng
            </Button>
          </Popover>
        </div>
        <Button
          className="search-btn"
          type="primary"
          onClick={handleOnClickSearch}
        >
          Tìm
        </Button>
      </div>
    </>
  );
};
export default Search;

