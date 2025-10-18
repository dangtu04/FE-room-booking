import axios from "../axios.customize";

export const getListRoomTypeByPropertyId = (
  propertyId,
  page = 1,
  limit = 10
) => {
  return axios.get(
    `/v1/api/get-list-roomtype-by-propertyid?propertyId=${propertyId}`,
    {
      params: {
        page,
        limit,
      },
    }
  );
};

export const getListRoomUnitByRoomTypeId = (
  roomTypeId,
  page = 1,
  limit = 10
) => {
  return axios.get(
    `/v1/api/get-list-roomunit-by-roomtypeid?roomTypeId=${roomTypeId}`,
    {
      params: {
        page,
        limit,
      },
    }
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
