import { auth, sorrisoFacilApi } from "@modules/http";
import { MaybeAsync } from "purify-ts";
import { Dentist } from "../dentist.slice";

export const findLogged = (token: string) => {
  const endpoint = "/dentist";
  const config = {
    headers: auth(token),
  };

  return MaybeAsync(async () => {
    return sorrisoFacilApi
      .get<Dentist>(endpoint, config)
      .then(({ data }) => data);
  });
};
