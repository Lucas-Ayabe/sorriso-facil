import axios from "axios";

export const baseURL = "http://localhost:3000/api";

export const apiRoutes = axios.create({
  baseURL,
});
