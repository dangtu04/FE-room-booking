import axios from "../axios.customize";

export const getUserApi = () => axios.get("/v1/api/get-all-users");

export const getOwnersApi = () => axios.get("/v1/api/get-all-owners");

export const editUserApi = (userData) => axios.put("/v1/api/edit-user", userData);

export const deleteUserApi = (userId) => axios.delete("/v1/api/delete-user",{
    data: {
      id: userId,
    },
  });
