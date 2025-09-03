import axios from "../axios.customize";

export const saerchPropertiesByProvince = (provinceCode) => {
  return axios.get(
    `/v1/api/search-properties-by-province?provinceCode=${provinceCode}`
  );
};

export const getSuitableRoomTypes = ({
  propertyId,
  totalGuests,
  roomsRequested,
  checkInDate,
  checkOutDate,
}) => {
  
  return axios.get("/v1/api/get-suitable-roomtypes", {
    params: {
      propertyId: propertyId,
      totalGuests: totalGuests,
      roomsRequested: roomsRequested,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    },
  });
};
