import axios from "../axios.customize";

export const loginApi = (email, password) => {
  return axios.post("/v1/api/login", { email, password });
};

export const registerApi = (data) => {
  return axios.post("/v1/api/register", data);
};
