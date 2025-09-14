import { Select, Table, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../../redux/slices/propertySlice";
import { fetchListRoomType } from "../../redux/slices/roomSlice";
import {
  EditOutlined,
  ScheduleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const RoomTypeManage = () => {
  const propertyId = useSelector((state) => state.user.propertyId);
  const [selectedPropertyId, setSelectedPropertyId] = useState(
    propertyId || null
  );

  const dispatch = useDispatch();
  const properties = useSelector((state) => state.property.properties);
  const listRoomType = useSelector((state) => state.room.listRoomType);
  const language = useSelector((state) => state.app.language);

  // console.log("propertyId", propertyId);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProperties());
  }, []);
  useEffect(() => {
    // Nếu đã có propertyId thì set luôn, không cần đợi chọn
    if (propertyId) {
      setSelectedPropertyId(propertyId);
    }
  }, [propertyId]);
  useEffect(() => {
    if (selectedPropertyId) {
      dispatch(fetchListRoomType(selectedPropertyId));
    }
    console.log("selectedPropertyId", selectedPropertyId);
  }, [selectedPropertyId]);

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

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Kiểu phòng",
      dataIndex: "roomTypeData",
      key: "roomTypeData",
      render: (roomTypeData) => {
        if (!roomTypeData) return "";
        return language === "vi" ? roomTypeData.valueVi : roomTypeData.valueEn;
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => price.toLocaleString("vi-VN") + "₫",
    },
    {
      title: "Số người",
      dataIndex: "numPeople",
      key: "numPeople",
    },
    {
      title: "Tổng số phòng",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
    },
    {
      title: "Số phòng trống",
      dataIndex: "availableQuantity",
      key: "availableQuantity",
    },
    {
      title: "Action",
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
            <EditOutlined /> Sửa
          </a>
          {/* <a
            className="action-edit"
            onClick={() => {
              if (propertyId) {
                navigate("/owner/amenity", {
                  state: {
                    roomTypeId: record.id,
                    roomTypeData: record.roomTypeData,
                  },
                });
              } else {
                navigate("/system/amenity", {
                  state: {
                    roomTypeId: record.id,
                    roomTypeData: record.roomTypeData,
                  },
                });
              }
            }}
          >
            <ScheduleOutlined /> Tiên ích
          </a> */}
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
            <UnorderedListOutlined /> Danh sách phòng
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1 className="system-title">Quản lý loại phòng</h1>
      {/* <Select
        style={{ width: "100%", marginBottom: 20 }}
        placeholder="Chọn cơ sở"
        showSearch
        optionFilterProp="label"
        value={selectedPropertyId}
        options={options}
        onChange={handleOnchangeSelectProperty}
      /> */}

      {!propertyId && (
        <Select
          style={{ width: "100%", marginBottom: 20 }}
          placeholder="Chọn cơ sở"
          showSearch
          optionFilterProp="label"
          value={selectedPropertyId}
          options={options}
          onChange={handleOnchangeSelectProperty}
        />
      )}
      <Table
        dataSource={listRoomType || []}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </>
  );
};

export default RoomTypeManage;
