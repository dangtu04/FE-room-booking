import { notification, Space, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { deleteUserApi, getUserApi } from "../../utils/api";
import "./UserManage.scss";
import { useTranslation } from "react-i18next";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../../redux/slices/allcodeSlice";
import { useNavigate } from "react-router-dom";
const UserManage = () => {
  const [dataSource, setDataSource] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation("admin");
  const language = useSelector((state) => state.app.language);
  const roles = useSelector((state) => state.allcode.roles);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleDeleteUser = async (userId) => {
    if (userId) {
      const res = await deleteUserApi(userId);
      if (res && res.errCode === 0) {
        notification.success({
          message: "DELETE USER",
          description: "User deleted successfully!",
        });
        fetchUser();
      }
    } else {
      notification.error({
        message: "DELETE USER",
        description: "Delete failed.",
      });
      return;
    }
  };
  const fetchUser = useCallback(async () => {
    const res = await getUserApi();
    if (res) {
      const mappedData = (res.data || []).map((user) => {
        const role = roles.find((r) => r.keyMap === user.roleCode);
        return {
          ...user,
          roleName: role
            ? language === "vi"
              ? role.valueVi
              : role.valueEn
            : "notfound",
        };
      });
      setDataSource(mappedData);
    }
  }, [roles, language]);


  useEffect(() => {
    if (roles.length > 0) {
      fetchUser();
    }
  }, [roles, language, fetchUser]);
  const columns = [
    {
      title: t("id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("name"),
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: t("email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("role"),
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: t("actions"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a className="action-edit"
            onClick={() => {
              navigate("/system/user/edit", {
                state: { user: record },
              });
            }}
          >
            <EditOutlined /> {t("edit")}
          </a>
          <a
            className="action-delete"
            onClick={() => handleDeleteUser(record.id)}
          >
            <DeleteOutlined /> {t("delete")}
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <h1 className="system-title">{t("menu.user-list")}</h1>
        <Table dataSource={dataSource} columns={columns} rowKey={"id"} />
      </div>
    </>
  );
};

export default UserManage;
