import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import UserManage from "./pages/system/UserManage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import AdminLayout from "./components/layouts/AdminLayout.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import AuthProvider from "./components/AuthProvider.js";
import "./i18n/index.js";
import Dashboard from "./pages/system/Dashboard.jsx";
import CreateUser from "./pages/system/CreateUser.jsx";
import EditUser from "./pages/system/EditUser.jsx";
import PropertyManage from "./pages/system/PropertyManage.jsx";
import CreateProperty from "./pages/system/CreateProperty.jsx";
import EditProperty from "./pages/system/EditProperty.jsx";
import RoomTypeManage from "./pages/system/RoomTypeManage.jsx";
import RoomUnitManage from "./pages/system/RoomUnitManage.jsx";
import CreateRoomType from "./pages/system/CreateRoomType.jsx";
import EditRoomType from "./pages/system/EditRoomType.jsx";
import CreateRoomUnit from "./pages/system/CreateRoomUnit.jsx";
import AddImageProvince from "./pages/system/AddImageProvince.jsx";
import SearchResult from "./pages/user/SearchResult.jsx";
import PropertyDetail from "./pages/user/PropertyDetail.jsx";
import RoomAmenityManage from "./pages/system/RoomAmenityManage.jsx";
import BookingInfo from "./pages/user/BookingInfo.jsx";
import VerifyEmail from "./pages/user/VerifyEmail.jsx";
import AddImagesProperty from "./pages/system/AddImagesProperty.jsx";
import PropertyAmenityManage from "./pages/system/PropertyAmenityManage.jsx";
import OwnerLayout from "./components/layouts/OwnerLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.js";
import BookingManage from "./pages/system/BookingManage.jsx";
import OwnerRevenue from "./pages/system/OwnerRevenue.jsx";
import AdminRevenue from "./pages/system/AdminRevenue.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/search",
        element: <SearchResult />,
      },
      {
        path: "/property",
        element: <PropertyDetail />,
      },
      {
        path: "/booking-info",
        element: <BookingInfo />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
    ],
  },
  {
    path: "/system",
    element: (
      <AuthProvider>
        <ProtectedRoute allowedRoles={["R1"]}>
          <AdminLayout />
        </ProtectedRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "user/list",
        element: <UserManage />,
      },
      {
        path: "user/create",
        element: <CreateUser />,
      },
      {
        path: "user/edit",
        element: <EditUser />,
      },
      {
        path: "property/list",
        element: <PropertyManage />,
      },
      {
        path: "property/create",
        element: <CreateProperty />,
      },
      {
        path: "property/edit",
        element: <EditProperty />,
      },
      {
        path: "roomtype/list",
        element: <RoomTypeManage />,
      },
      {
        path: "roomtype/create",
        element: <CreateRoomType />,
      },
      {
        path: "roomunit/create",
        element: <CreateRoomUnit />,
      },
      {
        path: "roomtype/edit",
        element: <EditRoomType />,
      },
      {
        path: "roomunit/list",
        element: <RoomUnitManage />,
      },
      {
        path: "image/province",
        element: <AddImageProvince />,
      },
      {
        path: "image/property",
        element: <AddImagesProperty />,
      },
      {
        path: "amenity",
        element: <RoomAmenityManage />,
      },
      {
        path: "amenity/property",
        element: <PropertyAmenityManage />,
      },
      {
        path: "booking/manage",
        element: <BookingManage />,
      },
      {
        path: "revenue",
        element: <AdminRevenue />,
      },
    ],
  },
  {
    path: "/owner",
    element: (
      <AuthProvider>
        <ProtectedRoute allowedRoles={["R2"]}>
          <OwnerLayout />
        </ProtectedRoute>
      </AuthProvider>
    ),
    // children: [

    //   {
    //     path: "roomtype/list",
    //     element: <RoomTypeManage />,
    //   },
    //   {
    //     path: "roomtype/create",
    //     element: <CreateRoomType />,
    //   },
    //   {
    //     path: "roomunit/create",
    //     element: <CreateRoomUnit />,
    //   },
    //   {
    //     path: "roomtype/edit",
    //     element: <EditRoomType />,
    //   },
    //   {
    //     path: "roomunit/list",
    //     element: <RoomUnitManage />,
    //   },
    //   {
    //     path: "image/property",
    //     element: <AddImagesProperty />,
    //   },
    //   {
    //     path: "amenity",
    //     element: <RoomAmenityManage />,
    //   },
    //   {
    //     path: "amenity/property",
    //     element: <PropertyAmenityManage />,
    //   },
    // ],
        children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    


      {
        path: "property/edit",
        element: <EditProperty />,
      },
      {
        path: "roomtype/list",
        element: <RoomTypeManage />,
      },
      {
        path: "roomtype/create",
        element: <CreateRoomType />,
      },
      {
        path: "roomunit/create",
        element: <CreateRoomUnit />,
      },
      {
        path: "roomtype/edit",
        element: <EditRoomType />,
      },
      {
        path: "roomunit/list",
        element: <RoomUnitManage />,
      },

      {
        path: "image/property",
        element: <AddImagesProperty />,
      },
      {
        path: "revenue",
        element: <OwnerRevenue />,
      },
      {
        path: "amenity/property",
        element: <PropertyAmenityManage />,
      },
        {
        path: "booking/manage",
        element: <BookingManage />,
      }
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
