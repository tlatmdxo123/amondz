import axios from "axios";
import { EditRequest } from ".";
import { SERVER_URL } from "../../constants";

const instance = axios.create({
  baseURL: SERVER_URL,
});

export const fetchAdd = (product: FormData) => {
  return instance.post("/products/new", product);
};

export const fetchEdit = (request: EditRequest) => {
  return instance.post(`/products/${request.id}`, request.data);
};

export const fetchRemove = (id: string) => {
  return instance.delete(`/products/${id}`);
};
