import { useEffect, useState } from "react";
import {
  getAllCode,
  getPropertyAmenitiesByPropertyId,
  getPropertyById,
} from "../../utils/api";
import { useSelector } from "react-redux";
import "./PropertyInfo.scss";
import ImagesProperty from "./ImagesProperty";
import { useTranslation } from "react-i18next";

const PropertyInfo = ({ propertyId }) => {
  const [property, setProperty] = useState({});
  const language = useSelector((state) => state.app.language);
  const [amenities, setAmenities] = useState([]);
  const [propertyAmenities, setPropertyAmenities] = useState([]);
  const { t } = useTranslation("common");
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

  // fetch amenities
  const fetchPropertyAmenitiesByPropertyId = async () => {
    const res = await getPropertyAmenitiesByPropertyId(propertyId);
    if (res && res.errCode === 0) {
      setAmenities(res.data.map((item) => item.propertyAmenityCode));
    }
  };
  // fetch PROPERTY_AMENITY
  useEffect(() => {
    const fetchPropertyAmanity = async () => {
      const res = await getAllCode("PROPERTY_AMENITY");
      if (res && res.errCode === 0) {
        console.log("res PROPERTY_AMENITY", res);
        setPropertyAmenities(res.data);
      }
    };

    fetchPropertyAmanity();
  }, []);

  useEffect(() => {
    fetchPropertyAmenitiesByPropertyId();
  }, [propertyId]);

  const mappedAmenities = amenities.map((amenityCode) => {
    const detail = propertyAmenities.find((a) => a.keyMap === amenityCode);
    return {
      valueEn: detail?.valueEn || "",
      valueVi: detail?.valueVi || "",
      key: amenityCode,
    };
  });

  return (
    <div className="property-info-container">
      {/* Header Section */}
      <div className="property-header">
        <div className="property-title-section">
          <h2 className="property-title">{property?.name}</h2>
          <div className="property-location">
            <i className="fa-solid fa-location-dot"></i>
            <span>{property?.address}</span>
          </div>
        </div>

        <div className="property-type-badge">
          <span className="type-label">
            {language === "vi"
              ? property?.typeData?.valueVi
              : property?.typeData?.valueEn}
          </span>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="property-gallery-section">
        <ImagesProperty propertyId={propertyId} />
      </div>

      {/* Content Grid */}
      <div className="property-content-grid">
        {/* Left Column - Description */}
        <div className="property-main-content">
          <div className="content-card">
            <h2 className="section-title">{t("detail_info")}</h2>
            <div
              className="property-html-content"
              dangerouslySetInnerHTML={{ __html: property.contentHTML }}
            />
          </div>
        </div>

        {/* Right Column - Quick Info (có thể thêm sau) */}
        <div className="property-sidebar">
          <div className="quick-info-card">
            <h3 className="card-title">{t("amenities")}</h3>

            {mappedAmenities && mappedAmenities.length > 0 ? (
              <span>
                {" "}
                {mappedAmenities.map((amenity) => (
                  <div className="info-item" key={amenity.key}>
                    <span>
                      {language === "vi" ? amenity.valueVi : amenity.valueEn}
                    </span>
                  </div>
                
                ))}
              </span>
            ) : (
              <p>Không có tiện ích</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
