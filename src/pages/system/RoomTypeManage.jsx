import { Select, Table, Space, notification } from "antd";
import { useEffect, useState, useCallback } from "react";
import { EditOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { fetchProperties } from "../../redux/slices/propertySlice";
import { getListRoomTypeByPropertyId } from "../../utils/api";

const RoomTypeManage = () => {
  const propertyId = useSelector((state) => state.user.propertyId);
  const language = useSelector((state) => state.app.language);
  const properties = useSelector((state) => state.property.properties);
  const dispatch = useDispatch();

  const [selectedPropertyId, setSelectedPropertyId] = useState(
    propertyId || null
  );
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation("admin");
  const navigate = useNavigate();

  // fetch list properties để fill vào Select
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  useEffect(() => {
    if (propertyId) {
      setSelectedPropertyId(propertyId);
    }
  }, [propertyId]);

  // fetch room type theo propertyId
  const fetchRoomTypes = useCallback(async (propertyId, page, limit) => {
    if (!propertyId) return;
    try {
      setLoading(true);
      const res = await getListRoomTypeByPropertyId(propertyId, page, limit);
      if (res && res.data) {
        setDataSource(res.data || []);
        setPagination({
          current: res.pagination.currentPage,
          pageSize: res.pagination.pageSize,
          total: res.pagination.totalItems,
        });
      }
    } catch (error) {
      notification.error({
        message: "FETCH ROOM TYPE ERROR",
        description: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    if (selectedPropertyId) {
      fetchRoomTypes(selectedPropertyId, 1, pagination.pageSize);
    }
  }, [selectedPropertyId, fetchRoomTypes, pagination.pageSize]);

  const buildDataListProperties = (data) => {
    if (data && data.length > 0) {
      return data.map((item) => ({
        label: item.name,
        value: item.id,
      }));
    }
    return [];
  };

  const options = buildDataListProperties(properties);

  const handleOnchangeSelectProperty = (value) => {
    setSelectedPropertyId(value);
  };

  const handleTableChange = (paginationConfig) => {
    fetchRoomTypes(
      selectedPropertyId,
      paginationConfig.current,
      paginationConfig.pageSize
    );
  };

  const columns = [
    {
      title: t("room_type_manage.id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("room_type_manage.room_type"),
      dataIndex: "roomTypeData",
      key: "roomTypeData",
      render: (roomTypeData) => {
        if (!roomTypeData) return "";
        return language === "vi" ? roomTypeData.valueVi : roomTypeData.valueEn;
      },
    },
    {
      title: t("room_type_manage.price"),
      dataIndex: "price",
      key: "price",
      render: (price) => price?.toLocaleString("vi-VN") + "₫",
    },
    {
      title: t("room_type_manage.capacity"),
      dataIndex: "numPeople",
      key: "numPeople",
    },
    {
      title: t("room_type_manage.total_rooms"),
      dataIndex: "totalQuantity",
      key: "totalQuantity",
    },
    {
      title: t("room_type_manage.available_rooms"),
      dataIndex: "availableQuantity",
      key: "availableQuantity",
    },
    {
      title: t("room_type_manage.action"),
      render: (_, record) => (
        <Space size="middle">
          <a
            className="action-edit"
            onClick={() => {
              if (propertyId) {
                navigate("/owner/roomtype/edit", {
                  state: { roomType: record },
                });
              } else {
                navigate("/system/roomtype/edit", {
                  state: { roomType: record },
                });
              }
            }}
          >
            <EditOutlined /> {t("room_type_manage.edit")}
          </a>

          <a
            className="action-edit"
            onClick={() => {
              if (propertyId) {
                navigate("/owner/roomunit/list", {
                  state: { roomTypeId: record.id },
                });
              } else {
                navigate("/system/roomunit/list", {
                  state: { roomTypeId: record.id },
                });
              }
            }}
          >
            <UnorderedListOutlined /> {t("room_type_manage.room_list")}
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1 className="system-title">{t("room_type_manage.manage_room_type")}</h1>
      {!propertyId && (
        <Select
          style={{ width: "100%", marginBottom: 20 }}
          placeholder={t("room_type_manage.select_facility")}
          showSearch
          optionFilterProp="label"
          value={selectedPropertyId}
          options={options}
          onChange={handleOnchangeSelectProperty}
        />
      )}
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
};

export default RoomTypeManage;
