import { Tabs } from "antd";
import { useSearchParams } from "react-router-dom";
import ListRoomType from "./ListRoomType";
import "./PropertyDetail.scss";
import PropertyInfo from "./PropertyInfo";
import PropertyReview from "./PropertyReview";
import { useTranslation } from "react-i18next";

const PropertyDetail = () => {
  const [propertyParams] = useSearchParams();
  const propertyId = propertyParams.get("propertyId");
  const { t } = useTranslation("common");

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "roomType",
      label: t("room_type"),
      children: <ListRoomType propertyId={propertyId} />,
    },
    {
      key: "propertyInfo",
      label: t("information"),
      children: <PropertyInfo propertyId={propertyId} />,
    },
    {
      key: "reviews",
      label: t("ratings"),
      children: <PropertyReview propertyId={propertyId}/>,
    },
  ];
  return (
    <>
      <div className="property-detail-container">
        <Tabs defaultActiveKey="propertyInfo" items={items} onChange={onChange} />
      </div>
    </>
  );
};
export default PropertyDetail;
