import axios from "axios";

export const baseURL = "/api";

export const apiRoutes = axios.create({
  baseURL,
});
