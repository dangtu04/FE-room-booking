import axios from "../axios.customize";

export const getListRoomTypeByPropertyId = (propertyId) => {
  return axios.get(
    `/v1/api/get-list-roomtype-by-propertyid?propertyId=${propertyId}`
  );
};

export const getListRoomUnitByRoomTypeId = (roomTypeId) => {
  return axios.get(
    `/v1/api/get-list-roomunit-by-roomtypeid?roomTypeId=${roomTypeId}`
  );
};

export const createRoomType = (data) => {
  return axios.post("/v1/api/create-roomtype", data);
};

export const updateRoomType = (data) => {
  return axios.put("/v1/api/update-roomtype", data);
};

export const createRoomUnit = (data) => {
  return axios.post("/v1/api/create-roomunit", data);
};
