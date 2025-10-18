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
  CarryOutOutlined,
  DollarOutlined,
  CheckSquareOutlined,
  MailOutlined,
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

const AdminLayout = () => {
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

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      dispatch(logout());
      navigate("/login");
    } else {
      navigate(`/system/${key}`);
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
      key: "user",
      icon: <UserOutlined />,
      label: t("menu.user"),
      children: [
        {
          key: "user/list",
          label: t("menu.user-list"),
        },
        {
          key: "user/create",
          label: t("menu.user-add"),
        },
      ],
    },
    {
      key: "property",
      icon: <ApartmentOutlined />,
      label: t("menu.facility-manage"),
      children: [
        {
          key: "property/list",
          label: t("menu.facility-list"),
        },
        {
          key: "property/create",
          label: t("menu.facility-add"),
        },
      ],
    },
    {
      key: "roomtype",
      icon: <BranchesOutlined />,
      label: t("menu.room-manage"),
      children: [
        {
          key: "roomtype/list",
          label: t("menu.room-type-list"),
        },
        {
          key: "roomtype/create",
          label: t("menu.room-type-add"),
        },
        {
          key: "roomunit/create",
          label: t("menu.room-add"),
        },
      ],
    },
    {
      key: "image",
      icon: <PictureOutlined />,
      label: t("menu.image"),
      children: [
        {
          key: "image/province",
          label: t("menu.image-province"),
        },
        {
          key: "image/property",
          label: t("menu.image-facility"),
        },
      ],
    },
    {
      key: "amenity",
      icon: <ProductOutlined />,
      label: t("menu.amenity"),
      children: [
        {
          key: "amenity/property",
          label: t("menu.amenity-facility"),
        },
      ],
    },

    {
      key: "booking",
      icon: <CarryOutOutlined />,
      label: t("menu.booking"),
      children: [
        {
          key: "booking/manage",
          label: t("menu.booking-manage"),
        },
      ],
    },
    {
      key: "revenue",
      icon: <DollarOutlined />,
      label: t("menu.revenue"),
    },
     {
      key: "contact",
      icon:<MailOutlined />,
      label: t("menu.contact"),
    },
     {
      key: "about",
      icon: <CheckSquareOutlined />,
      label:t("menu.referral"),
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
          {collapsed ? "A" : t("menu.admin")}
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
          Admin Dashboard ©{new Date().getFullYear()} Created by You
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
