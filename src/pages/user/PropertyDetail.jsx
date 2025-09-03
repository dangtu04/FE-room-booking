import { Tabs } from "antd";
import { useSearchParams } from "react-router-dom";
import ListRoomType from "./ListRoomType";
import "./PropertyDetail.scss";
import PropertyInfo from "./PropertyInfo";





const PropertyDetail = () => {
  const [propertyParams] = useSearchParams();
  const propertyId = propertyParams.get("propertyId");

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "roomType",
      label: "Loại phòng",
      children: <ListRoomType propertyId={propertyId} />,
    },
    {
      key: "propertyInfo",
      label: "Thông tin",
      children: <PropertyInfo propertyId={propertyId}/>,
    },
    {
      key: "3",
      label: "Tiện ích",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <>
      <div className="property-detail-container">
        <Tabs defaultActiveKey="roomType" items={items} onChange={onChange} />
      </div>
    </>
  );
};
export default PropertyDetail;
