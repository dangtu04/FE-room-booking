import axios from "../axios.customize";

export const getAllCode = (inputType) => {
  return axios.get(`/v1/api/get-allcode?type=${inputType}`);
};

export const getListProvince = () => {
  return axios.get("/v1/api/get-listprovince-allcode");
};

export const bulkAddImages = (data) => {
  return axios.post("/v1/api/bulk-add-images", data);
};

export const singleAddImage = (data) => {
  return axios.post("/v1/api/single-add-image", data);
};

export const deleteImageCloud = (publicId) => {
  return axios.post("/v1/api/delete-image-by-public-id", publicId);
};

export const updateImage = (data) => {
  return axios.post("/v1/api/update-image", data);
};
export const getImageByTargetId = (targetId) => {
  return axios.get(`/v1/api/get-image-by-target-id?targetId=${targetId}`);
};

export const deleteImageByTargetId = (targetId) => {
  return axios.delete("/v1/api/delete-image-by-target-id", {
    data: {
      targetId: targetId,
    },
  });
};

export const deleteImageById = (id) => {
  return axios.delete("/v1/api/delete-image-by-id", {
    data: {
      id: id,
    },
  });
};

export const getOutstandingLocation = () => {
  return axios.get("/v1/api/get-out-standing-location");
};
