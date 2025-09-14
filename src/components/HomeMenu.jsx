import React, { useState } from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import "./HomeMenu.scss";
import { useNavigate } from "react-router-dom";

const HomeMenu = () => {
  const { t } = useTranslation("common");
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const items = [
    {
      label: <span onClick={() => navigate("/")}>{t("home")}</span>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: "Navigation Two",
      key: "app",
      icon: <AppstoreOutlined />,
    },
    {
      label: "Navigation Three - Submenu",
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            { label: "Option 1", key: "setting:1" },
            { label: "Option 2", key: "setting:2" },
          ],
        },
        {
          type: "group",
          label: "Item 2",
          children: [
            { label: "Option 3", key: "setting:3" },
            { label: "Option 4", key: "setting:4" },
          ],
        },
      ],
    },
  ];
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      theme="none"
      className="custom-home-menu"
    />
  );
};
export default HomeMenu;
