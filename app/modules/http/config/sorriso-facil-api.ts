import axios from "axios";

export const sorrisoFacilbBaseURL = "http://sorriso-facil.herokuapp.com";

export const sorrisoFacilApi = axios.create({
  baseURL: sorrisoFacilbBaseURL,
});
