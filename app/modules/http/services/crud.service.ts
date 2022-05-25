import { AxiosInstance } from "axios";
import { MaybeAsync } from "purify-ts";
import { sorrisoFacilApi } from "../config";
import { auth } from "../helpers";

export interface CrudServiceConfig {
  token: string;
  resource: {
    singular: string;
    plural: string;
  };
}

export class CrudService<Entity, Dto> {
  private readonly httpClient: AxiosInstance;
  private readonly token: string;
  private readonly resource: {
    singular: string;
    plural: string;
  };

  constructor({ token, resource }: CrudServiceConfig) {
    this.token = token;
    this.resource = resource;
    this.httpClient = sorrisoFacilApi;

    this.findAll = this.findAll.bind(this);
  }

  private get auth() {
    return { headers: auth(this.token) };
  }

  async findAll(): Promise<Entity[]> {
    const endpoint = `/${this.resource.plural}`;
    const response = await this.httpClient.get(endpoint, this.auth);

    return response.data.content;
  }

  findById(id: number) {
    const endpoint = `/${this.resource.singular}/${id}`;

    return MaybeAsync<Entity>(async () => {
      const { data } = await this.httpClient.get(endpoint, this.auth);
      return data;
    });
  }

  async create(resource: Dto) {
    return this.httpClient
      .post(`/${this.resource.singular}`, resource, this.auth)
      .then(() => true)
      .catch(() => false);
  }

  async update(id: number, resource: Dto) {
    return this.httpClient
      .put(`/${this.resource.singular}/${id}`, resource, this.auth)
      .then(() => true)
      .catch(() => false);
  }

  async delete(id: number) {
    return this.httpClient
      .delete(`/${this.resource.singular}/${id}`, this.auth)
      .then(() => true)
      .catch(() => false);
  }
}
