import { CrudService } from "@modules/http";
import { Service } from "../service.slice";

export interface ServiceDto {
  name: string;
  price: number;
}

export const serviceRepository = (token: string) => {
  return new CrudService<Service, ServiceDto>({
    token,
    resource: {
      plural: "services",
      singular: "service",
    },
  });
};

export const findAll = async (token: string) => {
  return serviceRepository(token).findAll();
};

export const findById = async (token: string, id: number) => {
  return serviceRepository(token).findById(id);
};

export const create = async (token: string, service: ServiceDto) => {
  return serviceRepository(token).create(service);
};

export const update = async (
  token: string,
  id: number,
  service: ServiceDto
) => {
  return serviceRepository(token).update(id, service);
};

export const deleteById = async (token: string, id: number) => {
  return serviceRepository(token).delete(id);
};
