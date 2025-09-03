import axios from "./utils/axios.customize";
import { useEffect } from "react";
import "./styles/global.scss";
import { Outlet } from "react-router-dom";
import HomeMenu from "./components/HomeMenu";
import Header from "./components/HomeHeader";

function App() {
  return (
    <>
      <Header />
      <HomeMenu/>
      <Outlet/>
    </>
  );
}

export default App;
