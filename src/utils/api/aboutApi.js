import axios from "../axios.customize";


export const upsertAbout = (data) => {
  return axios.post("/v1/api/upsert-about", data);
};

export const getAbout = () => {
  return axios.get("/v1/api/get-about");
};



