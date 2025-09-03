import { useEffect, useState } from "react";
import "./OutstandingLocation.scss";
import { getOutstandingLocation } from "../utils/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OutstandingLocation = () => {
  const [locations, setLocations] = useState([]);
  const language = useSelector((state) => state.app.language);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOutstandingLocations = async () => {
      const res = await getOutstandingLocation();
      if (res && res.errCode === 0) {
        setLocations(res.data);
      } else {
        console.error("Failed to fetch outstanding locations");
      }
    };

    fetchOutstandingLocations();
  }, []);

  const handleOnClick = (provinceCode) => {
   navigate(`/search?provinceCode=${provinceCode}`);

  };

  return (
    <div className="outstanding-location">
      <h2 className="title">OutstandingLocation</h2>
      <div className="grid">
        {locations.map((item, index) => (
          <div
            className="card"
            key={index}
            onClick={() => handleOnClick(item.keyMap)}
          >
            <img src={item.image?.url} alt={item.valueEn} />
            <div className="label">
              {language === "vi" ? item.valueVi : item.valueEn}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutstandingLocation;
