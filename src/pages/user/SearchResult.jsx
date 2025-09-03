import { useNavigate, useSearchParams } from "react-router-dom";
import "./SearchResult.scss";
import { useEffect, useState } from "react";
import { saerchPropertiesByProvince } from "../../utils/api";
import { useSelector } from "react-redux";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const provinceCode = searchParams.get("provinceCode");
  const language = useSelector((state) => state.app.language);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPropertiesByProvince = async (provinceCode) => {
      const res = await saerchPropertiesByProvince(provinceCode);
      if (res && res.errCode === 0 && res.data) {
        setProperties(res?.data);
      }
    };
    if (provinceCode) {
      fetchPropertiesByProvince(provinceCode);
    }
  }, [provinceCode]);

  const handleOnClickProperty = (propertyId) => {
    navigate(`/property?propertyId=${propertyId}`);
  };
  return (
    <div className="search-result">
      <div className="search-left">
        <h3>Chọn lọc theo:</h3>
        <div className="filter-group">
          <label>
            <input type="checkbox" /> Nhà khách
          </label>
          <label>
            <input type="checkbox" /> Nhà nghỉ B&B
          </label>
          <label>
            <input type="checkbox" /> Căn hộ
          </label>
          <label>
            <input type="checkbox" /> Biệt thự
          </label>
        </div>
      </div>
      <div className="search-right">
        <h2>Tìm thấy {properties.length} chỗ nghỉ</h2>
        {properties.map((item) => (
          <div
            key={item.id}
            className="card"
            onClick={() => handleOnClickProperty(item.id)}
          >
            <img src={item.avatar} alt={item.name} />
            <div className="info">
              <h3>{item.name}</h3>
              <p>
                {" "}
                {language === "vi"
                  ? item.typeData.valueVi
                  : item.typeData.valueEn}
              </p>
              <p className="address">{item.address}</p>
              <p className="desc">{item.description}</p>
              <div className="rating-box">
                <span className="rating-label">Rất tốt</span>
                <span className="rating-score">9.8</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
