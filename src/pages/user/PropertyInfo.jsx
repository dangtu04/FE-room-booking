import { useEffect, useState } from "react";
import { getPropertyById } from "../../utils/api";
import { useSelector } from "react-redux";
import "./PropertyInfo.scss";

const PropertyInfo = ({ propertyId }) => {
  const [property, setProperty] = useState({});
  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    const fetchPropertyById = async (propertyId) => {
      const res = await getPropertyById(propertyId);
      if (res && res.errCode === 0 && res.data) {
        setProperty(res.data);
      }
    };

    if (propertyId) {
      fetchPropertyById(propertyId);
    }
  }, [propertyId]);

  return (
    <div className="property-info-container">
      <h1 className="property-title">{property?.name}</h1>

      <div className="property-basic-info">
        <p className="property-description">{property?.description}</p>
        <p><strong><i className="fa-solid fa-location-dot"></i> Address:</strong> {property?.address}</p>
        <p>
          <strong>🏠 Type:</strong>{" "}
          {language === "vi"
            ? property?.typeData?.valueVi
            : property?.typeData?.valueEn}
        </p>
        {/* <p>
          <strong>🕑 Check-in:</strong>{" "}
          {language === "vi"
            ? property?.checkInTimeData?.valueVi
            : property?.checkInTimeData?.valueEn}
        </p>
        <p>
          <strong>🕚 Check-out:</strong>{" "}
          {language === "vi"
            ? property?.checkOutTimeData?.valueVi
            : property?.checkOutTimeData?.valueEn}
        </p> */}
      </div>

      <div className="property-image-gallery">
        <h2>🖼 Hình ảnh</h2>
        <div>ở đây tôi sẽ đặt một component để call danh sách ảnh của cơ sở</div>
      </div>

      <div className="property-html-content">
        <h2>📄 Thông tin chi tiết</h2>
        <div dangerouslySetInnerHTML={{ __html: property.contentHTML }}></div>
      </div>
    </div>
  );
};

export default PropertyInfo;
