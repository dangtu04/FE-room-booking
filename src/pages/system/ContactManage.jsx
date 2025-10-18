import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button, Empty, message } from "antd";
import { InboxOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { deleteContact, getContacts } from "../../utils/api/contactApi";
import { useTranslation } from "react-i18next";

const ContactManage = () => {
  const [contacts, setContacts] = useState([]);
  const { t } = useTranslation("admin");

  const columns = [
    {
      title: t("contact_manage.no"),
      key: "index",
      width: 60,
      render: (text, record, index) => index + 1,
    },
    {
      title: t("contact_manage.email"),
      dataIndex: "contactEmail",
      key: "contactEmail",
      render: (text) => (
        <a
          href={`mailto:${text}`}
          style={{
            color: "#1890ff",
            textDecoration: "none",
            display: "block",
          }}
          onClick={(e) => e.preventDefault()}
        >
          {text}
        </a>
      ),
    },
    {
      title: t("contact_manage.message_content"),
      dataIndex: "message",
      key: "message",
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <div
          style={{
            maxWidth: 300,
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: t("contact_manage.sent_time"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      title: t("contact_manage.action"),
      key: "action",
      width: 120,
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            size="small"
          >
            {t("contact_manage.delete")}
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchAllContacts = async () => {
      const res = await getContacts();
      if (res && res.errCode === 0) {
        setContacts(res.data);
      } else {
        console.log("Get contact error");
      }
    };
    fetchAllContacts();
  }, []);

  // xóa contact
  const handleDelete = async (id) => {
    const result = window.confirm("Bạn có chắc muốn xóa liên hệ này?");
    if (!result) return;

    const res = await deleteContact(id);
    if (res && res.errCode !== 0) {
      message.error("Xoá liên hệ không thành công, vui lòng thử lại");
      return;
    }

    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
    message.success("Xóa thành công");
  };

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0, color: "#1f1f1f" }}>{t("contact_manage.manage_contact")}</h2>
      </div>

      {contacts.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>{t("contact_manage.no_contact")}</span>}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={contacts}
          rowKey="id"
          scroll={{ x: 1000 }}
          bordered
          size="middle"
          rowClassName={(record, index) => (index % 2 === 0 ? "even-row" : "")}
        />
      )}
    </div>
  );
};

export default ContactManage;
