import axios from "../axios.customize";

export const getAllProperty = () => {
  return axios.get("/v1/api/get-all-properties");
};

export const getPropertyById = (propertyId) => {
  return axios.get(`/v1/api/get-property-by-id?id=${propertyId}`);
};

export const createProperty = (data) => {
  return axios.post("/v1/api/create-property", data);
};

export const editProperty = (data) => {
  return axios.put("/v1/api/edit-property", data);
};

export const getImagesProperty = (targetId) => {
  return axios.get(`/v1/api/get-images-property?targetId=${targetId}`);
};

export const savePropertyAmenity = (data) => {
  return axios.post("/v1/api/save-property-amenity", data);
};

export const getPropertyAmenitiesByPropertyId = (propertyId) => {
  return axios.get(`/v1/api/get-property-amenity-by-property-id?propertyId=${propertyId}`);
};