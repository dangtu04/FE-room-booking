import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const RoomAmenityManage = () => {
  const { state: data } = useLocation();
  const language = useSelector((state) => state.app.language);
  const roomTypeId = data?.roomTypeId;
  const nameVi = data?.roomTypeData?.valueVi;
  const nameEn = data?.roomTypeData?.valueEn;
  return (
    <>
      <h1>RoomAmenityManages</h1>
      <h3>{language === "vi" ? nameVi : nameEn}</h3>
    </>
  );
};
export default RoomAmenityManage;
