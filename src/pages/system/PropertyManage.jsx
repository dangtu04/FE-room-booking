import { notification, Space, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { getAllProperty } from "../../utils/api";
import "./PropertyManage.scss";
import { useTranslation } from "react-i18next";
import { EyeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PropertyManage = () => {
  const [dataSource, setDataSource] = useState({ data: [], pagination: {} });
  const { t } = useTranslation("admin");
  const language = useSelector((state) => state.app.language);
  const navigate = useNavigate();

  // call lấy danh sách property
  const fetchProperties = useCallback(async (page = 1, pageSize = 5) => {
    const res = await getAllProperty(page, pageSize);
    if (res && res.data) {
      setDataSource({
        data: res.data,
        pagination: res.pagination,
      });
    }
  }, []);


  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const columns = [
    {
      title: t("id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("property-manage.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("property-manage.avatar"),
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) =>
        avatar ? (
          <img
            src={avatar}
            alt="avatar"
            style={{
              width: "100px",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: t("property-manage.address"),
      dataIndex: "address",
      key: "address",
    },
    {
      title: t("property-manage.province"),
      dataIndex: "provinceData",
      key: "provinceData",
      render: (provinceData) => {
        if (!provinceData) return "";
        return language === "vi" ? provinceData.valueVi : provinceData.valueEn;
      },
    },
    {
      title: t("property-manage.room-type"),
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
          <a
            className="action-edit"
            onClick={() => {
              navigate("/system/property/edit", {
                state: { propertyId: record.id },
              });
            }}
          >
            <EyeOutlined /> {t("property-manage.details")}
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <h1 className="system-title">{t("property-manage.title")}</h1>
        <Table
          dataSource={dataSource.data}
          columns={columns}
          rowKey={"id"}
          pagination={{
            current: dataSource.pagination?.currentPage,
            pageSize: dataSource.pagination?.pageSize,
            total: dataSource.pagination?.totalItems,
            onChange: (page, pageSize) => {
              fetchProperties(page, pageSize);
            },
          }}
        />
      </div>
    </>
  );
};

export default PropertyManage;
