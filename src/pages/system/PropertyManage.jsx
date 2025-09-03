import { notification, Space, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { deleteUserApi, getAllProperty, getUserApi } from "../../utils/api";
import "./PropertyManage.scss";
import { useTranslation } from "react-i18next";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../../redux/slices/allcodeSlice";
import { useNavigate } from "react-router-dom";
import { fetchProperties } from "../../redux/slices/propertySlice";
const PropertyManage = () => {
  const [dataSource, setDataSource] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation("admin");
  const language = useSelector((state) => state.app.language);
  const properties = useSelector((state) => state.property.properties);
  const navigate = useNavigate();
  console.log("check properties", properties);

  useEffect(() => {
    dispatch(fetchProperties());
  }, []);

  useEffect(() => {
    setDataSource(properties);
  }, [properties]);
  const columns = [
    {
      title: t("id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) =>
        avatar ? (
          <img
            src={avatar}
            alt="avatar"
            style={{
              width: "100px",
              // height: "40px",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Province",
      dataIndex: "provinceData",
      key: "provinceData",
      render: (provinceData) => {
        if (!provinceData) return "";
        return language === "vi" ? provinceData.valueVi : provinceData.valueEn;
      },
    },

    {
      title: "Type",
      dataIndex: "typeData",
      key: "typeData",
      render: (typeData) => {
        if (!typeData) return "";
        return language === "vi" ? typeData.valueVi : typeData.valueEn;
      },
    },
    {
      title: t("actions"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a className="action-edit"
           onClick={() => {
              navigate("/system/property/edit", {
                state: { propertyId: record.id },
              });
            }}
            >
            <EyeOutlined /> Chi tiết
          </a>
        
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <h1 className="system-title">Quản lý cơ sở</h1>
        <Table dataSource={dataSource} columns={columns} rowKey={"id"} />
      </div>
    </>
  );
};

export default PropertyManage;
