import axios from "../axios.customize";

export const createBooking = (data) => {
  return axios.post("/v1/api/create-booking", data);
};

export const verifyBooking = (data) => {
  return axios.post("/v1/api/verify-booking", data);
};

// export const getBookingList = (data) => {
//   console.log("check data api: ", data);
//   return axios.get(`/v1/api/get-booking-list?propertyId=${data.propertyId}&statusCode=${data.statusCode}&startDate=${data.startDate}&endDate=${data.endDate}`);
// };

export const getBookingList = (data) => {
  const params = new URLSearchParams();

  if (data.propertyId) params.append("propertyId", data.propertyId);
  if (data.statusCode) params.append("statusCode", data.statusCode);
  if (data.startDate) params.append("startDate", data.startDate);
  if (data.endDate) params.append("endDate", data.endDate);

  return axios.get(`/v1/api/get-booking-list?${params.toString()}`);
};


export const getOwnerRevenue = (data) => {
  const params = new URLSearchParams();

  if (data.propertyId) params.append("propertyId", data.propertyId);
  if (data.statusCode) params.append("statusCode", data.statusCode);
  if (data.startDate) params.append("startDate", data.startDate);
  if (data.endDate) params.append("endDate", data.endDate);
  if (data.type) params.append("type", data.type);

  return axios.get(`/v1/api/get-owner-revenue?${params.toString()}`);
};




export const changeBookingStatus = (bookingId, statusCode) => {
  return axios.put("/v1/api/change-booking-status", { bookingId, statusCode });
}