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
      label: <span onClick={() => navigate("/about")}>{t("about")}</span>,
      key: "about",
      icon: <AppstoreOutlined />,
    },
    {
      label: <span onClick={() => navigate("/contact")}>{t("contact")}</span>,
      key: "contact",
      icon: <MailOutlined />,
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
