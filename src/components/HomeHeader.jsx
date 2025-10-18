import React from "react";
import { Button } from "antd";
import "./HomeHeader.scss";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/userSlice";
import { changeLanguage } from "../redux/slices/appSlice";
import i18n from "../i18n";
import { GlobalOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";

const Header = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const fullName = useSelector((state) => state.user.fullName);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const language = useSelector((state) => state.app.language);

  const navigate = useNavigate();

  const handleChangeLanguage = (language) => {
    dispatch(changeLanguage({ language }));
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };
  return (
    <header className="main-header">
      <div className="header-left">
        <div className="logo">Room.Booking</div>
      </div>

      <div className="header-center">
        {/* Để trống hoặc sau này thêm gì đó */}
      </div>

      <div className="header-right">
        <p className="user-fullname">{fullName}</p>

        <Button type="text" className="header-btn">
          {language === "vi" ? (
            <p onClick={() => handleChangeLanguage("en")}><GlobalOutlined />{" "}English</p>
          ) : (
            <p onClick={() => handleChangeLanguage("vi")}><GlobalOutlined />{" "}Tiếng Việt</p>
          )}
        </Button>
        <Button type="text" className="header-btn">
          {isAuthenticated ? (
            <p
              onClick={() => {
                dispatch(logout());
              }}
            >
              {t("logout")}{" "}<LogoutOutlined />
            </p>
          ) : (
            <p
              onClick={() => {
                navigate("/login");
              }}
            >
              {t("login")}{" "}<LoginOutlined />
            </p>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
