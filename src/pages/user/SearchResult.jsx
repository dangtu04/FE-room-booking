import { useNavigate, useSearchParams } from "react-router-dom";
import "./SearchResult.scss";
import { useEffect, useState } from "react";
import { saerchPropertiesByProvince } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyType } from "../../redux/slices/allcodeSlice";
import { useTranslation } from "react-i18next";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const provinceCode = searchParams.get("provinceCode");
  const language = useSelector((state) => state.app.language);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const propertyType = useSelector((state) => state.allcode.propertyType);
  const { t } = useTranslation("common");
  // fetch propertyType list
  useEffect(() => {
    dispatch(fetchPropertyType());
  }, [dispatch]);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await saerchPropertiesByProvince({
        provinceCode,
        typeCode: selectedTypes,
      });
      if (res && res.errCode === 0 && res.data) {
        setProperties(res.data);
      } else {
        setProperties([]);
      }
    };

    if (provinceCode) {
      fetchProperties();
    }
  }, [provinceCode, selectedTypes]);

  const handleOnClickProperty = (propertyId) => {
    navigate(`/property?propertyId=${propertyId}`);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedTypes((prev) => [...prev, value]);
    } else {
      setSelectedTypes((prev) => prev.filter((item) => item !== value));
    }
  };

  return (
    <div className="search-result">
      <div className="search-left">
        <h3>{t("filter_by")}:</h3>
        <div className="filter-group">
          {propertyType &&
            propertyType.length > 0 &&
            propertyType.map((item, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  value={item.keyMap}
                  checked={selectedTypes.includes(item.keyMap)}
                  onChange={handleTypeChange}
                />
                {language === "vi" ? item.valueVi : item.valueEn}
              </label>
            ))}

          <p
            className="delete-filter"
            onClick={() => {
              setSelectedTypes([]);
            }}
          >
            {t("clear_filter")}
          </p>
        </div>
      </div>
      <div className="search-right">
        {language === "vi" ? (
          <h2>Tìm thấy {properties.length} chỗ nghỉ</h2>
        ) : (
          <h2>{properties.length} Properties found</h2>
        )}
        {properties.map((item) => (
          <div
            key={item.id}
            className="card"
            onClick={() => handleOnClickProperty(item.id)}
          >
            <img src={item.avatar} alt={item.name} />
            <div className="info">
              <h3>{item.name}</h3>
              {/* Giờ BE trả về trực tiếp typeCode, bạn có thể map sang text nếu muốn */}
              <p>{item.typeCode}</p>
              <p className="address">{item.address}</p>
              {item.description && <p className="desc">{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
