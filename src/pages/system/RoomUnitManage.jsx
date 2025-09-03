import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Table } from "antd";
import { fetchListRoomUnit } from "../../redux/slices/roomSlice";

const RoomUnitManage = () => {
  const { state: data } = useLocation();
  const roomTypeId = data.roomTypeId;
  const dispatch = useDispatch();
  const listRoomUnit = useSelector((state) => state.room.listRoomUnit);
  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    dispatch(fetchListRoomUnit(roomTypeId));
  }, [dispatch, roomTypeId]);

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
    // {
    //   title: "Room Type ID",
    //   dataIndex: "roomTypeId",
    //   key: "roomTypeId",
    // },
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
        // pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default RoomUnitManage;
