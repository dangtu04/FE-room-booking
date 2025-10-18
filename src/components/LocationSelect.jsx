import { Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProvinces } from "../redux/slices/allcodeSlice";
import { useTranslation } from "react-i18next";
const LocationSelect = ({ value, onChange }) => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language);
  const allProvinces = useSelector((state) => state.allcode.provinces);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const { t } = useTranslation("common");
  useEffect(() => {
    dispatch(fetchProvinces());
  }, [dispatch, language]);

  useEffect(() => {
    if (value !== undefined && value !== null) setSelectedProvince(value);
  }, [value]);

  const buildDataInputSelect = (allProvinces) => {
    return allProvinces.map((item) => ({
      label: language === "vi" ? item.valueVi : item.valueEn,
      value: item.keyMap,
    }));
  };

  let options = buildDataInputSelect(allProvinces);

  const handleOnChangeSelect = (value) => {
    setSelectedProvince(value);
    if (onChange) onChange(value);
  };

  return (
    <>
      <Select
        showSearch
        placeholder={t("placeholder-province")}
        optionFilterProp="label"
        options={options}
        className="search-input"
        value={selectedProvince}
        onChange={handleOnChangeSelect}
      />
    </>
  );
};

export default LocationSelect;
