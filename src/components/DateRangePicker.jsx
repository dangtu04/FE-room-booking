import React, { useEffect, useState } from "react";
import { DatePicker, ConfigProvider, message } from "antd";
import viVN from "antd/locale/vi_VN";
import enUS from "antd/locale/en_US";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const DateRangePicker = ({ value, onChange }) => {
  const { RangePicker } = DatePicker;
  const language = useSelector((state) => state.app.language);
  const { t } = useTranslation("common");
  const [selectedDates, setSelectedDates] = useState([null, null]);

  const handleChange = (dates, dateStrings) => {
    // Nếu chọn đủ 2 ngày và trùng nhau thì cảnh báo và xóa ngày kết thúc
    if (dates && dates[0] && dates[1] && dates[0].isSame(dates[1], "day")) {
      message.warning("Vui lòng chọn tối thiểu 1 đêm!");
      setSelectedDates([dates[0], null]);
      if (onChange) onChange([dates[0], null], [dateStrings[0], ""]);
      return;
    }
    setSelectedDates(dates);
    if (onChange) onChange(dates, dateStrings);
  };

 useEffect(() => {
  if (value && (value[0] || value[1])) {
    setSelectedDates([
      value[0] ? dayjs(value[0]) : null,
      value[1] ? dayjs(value[1]) : null,
    ]);
  } else {
    setSelectedDates([null, null]);
  }
}, [value]);

  return (
    <ConfigProvider locale={language === "vi" ? viVN : enUS}>
      <RangePicker
        format="DD/MM/YYYY"
        disabledDate={(current) => current && current < dayjs().startOf("day")}
        placeholder={[t("check-in-date"), t("check-out-date")]}
        className="search-input"
        value={selectedDates}
        onChange={handleChange}
      />
    </ConfigProvider>
  );
};

export default DateRangePicker;
