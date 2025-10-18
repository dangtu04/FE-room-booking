import axios from "../axios.customize";



export const createReview = (data) => {
  return axios.post("/v1/api/create-review", data);
};

export const updateReview = (data) => {
  return axios.put("/v1/api/update-review", data);
};


export const getReviewsByPropertyId = (propertyId) => {
  return axios.get(`/v1/api/get-reviews-by-property-id?propertyId=${propertyId}`);
};
