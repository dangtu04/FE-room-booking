import axios from "../axios.customize";


export const postContact = (data) => {
  return axios.post("/v1/api/create-contact", data);
};

export const getContacts = () => {
  return axios.get("/v1/api/get-contacts");
};

export const deleteContact = (id) => {
  return axios.delete("/v1/api/delete-contact",{
    data: {
      id: id,
    },
  });
};


