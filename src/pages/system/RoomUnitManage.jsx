import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Table } from "antd";
import { getListRoomUnitByRoomTypeId } from "../../utils/api";
import { useSelector } from "react-redux";

const RoomUnitManage = () => {
  const { state: data } = useLocation();
  const roomTypeId = data.roomTypeId;

  const language = useSelector((state) => state.app.language);

  const [listRoomUnit, setListRoomUnit] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const res = await getListRoomUnitByRoomTypeId(roomTypeId, page, limit);
      if (res.errCode === 0) {
        setListRoomUnit(res.data);
        setPagination({
          current: res.pagination.currentPage,
          pageSize: res.pagination.pageSize,
          total: res.pagination.totalItems,
        });
      }
    } catch (error) {
      console.error("Failed to fetch room units:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (roomTypeId) {
      fetchData(pagination.current, pagination.pageSize);
    }
  }, [roomTypeId]);

  // Columns for antd Table
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Room Number",
      dataIndex: "roomNumber",
      key: "roomNumber",
    },
    {
      title: "Status",
      dataIndex: "roomStatusData",
      key: "roomStatusData",
      render: (roomStatusData) => {
        if (!roomStatusData) return "";
        return language === "vi"
          ? roomStatusData.valueVi
          : roomStatusData.valueEn;
      },
    },
  ];

  return (
    <>
      <h1>Room Unit Manage</h1>
      <Table
        columns={columns}
        dataSource={listRoomUnit}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) => fetchData(page, pageSize),
        }}
      />
    </>
  );
};

export default RoomUnitManage;
