import React, { useState } from "react";
import {
  UserOutlined,
  TeamOutlined,
  PoweroffOutlined,
  DashboardOutlined,
  BranchesOutlined,
  ApartmentOutlined,
  PictureOutlined,
  ProductOutlined,
  DollarOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./AdminLayout.scss";
import { changeLanguage } from "../../redux/slices/appSlice";
import i18n from "../../i18n";
import { logout } from "../../redux/slices/userSlice";
import { useTranslation } from "react-i18next";

const { Header, Content, Footer, Sider } = Layout;

const OwnerLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const language = useSelector((state) => state.app.language);
  const { t } = useTranslation("admin");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Điều hướng khi chọn menu
  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      dispatch(logout());
      navigate("/login");
    } else {
      navigate(`/owner/${key}`);
    }
  };

  const handleChangeLanguage = (language) => {
    dispatch(changeLanguage({ language }));
    i18n.changeLanguage(language);
  };

  const items = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: t("menu.dashboard"),
    },

    {
      key: "roomtype",
      icon: <BranchesOutlined />,
      label: "Quản lý phòng",
      children: [
        {
          key: "roomtype/list",
          label: "Danh sách loại phòng",
        },
        {
          key: "roomtype/create",
          label: "Thêm loại phòng",
        },
        {
          key: "roomunit/create",
          label: "Thêm phòng",
        },
      ],
    },
    {
      key: "image",
      icon: <PictureOutlined />,
      label: "Hình ảnh",
      children: [
        {
          key: "image/property",
          label: "Hình ảnh cơ sở",
        },
      ],
    },
    {
      key: "amenity",
      icon: <ProductOutlined />,
      label: "Tiện ích",
      children: [
        {
          key: "amenity/property",
          label: "Tiện ích cơ sở",
        },
      ],
    },
    {
      key: "booking",
      icon: <CarryOutOutlined />,
      label: "Đặt phòng",
      children: [
        {
          key: "booking/manage",
          label: "Quản lý đặt phòng",
        },
      ],
    },
    {
      key: "revenue",
      icon: <DollarOutlined />,
      label: "Doanh thu",
    },

    {
      key: "logout",
      icon: <PoweroffOutlined />,
      label: t("menu.logout"),
    },
  ];

  // Tự động lấy phần cuối path để làm breadcrumb
  const pathName = location.pathname.split("/").filter(Boolean);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {collapsed ? "O" : "Owner"}
        </div>
        <Menu
          theme="dark"
          // mode="inline"
          onClick={handleMenuClick}
          selectedKeys={[pathName[1] || "dashboard"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header className="header">
          <div className="language-selector">
            <span
              onClick={() => handleChangeLanguage("vi")}
              className={`language-item ${language === "vi" ? "active" : ""}`}
            >
              VI
            </span>
            <span style={{ color: "#fff" }}>{" | "}</span>
            <span
              onClick={() => handleChangeLanguage("en")}
              className={`language-item ${language === "en" ? "active" : ""}`}
            >
              EN
            </span>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Owner Dashboard ©{new Date().getFullYear()} Created by You
        </Footer>
      </Layout>
    </Layout>
  );
};

export default OwnerLayout;
