import axios from "axios";

export const sorrisoFacilbBaseURL = "https://sorriso-facil.herokuapp.com";

export const sorrisoFacilApi = axios.create({
  baseURL: sorrisoFacilbBaseURL,
});
