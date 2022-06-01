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
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  private get auth() {
    return { headers: auth(this.token) };
  }

  async findAll(customEndpoint?: string): Promise<Entity[]> {
    const endpoint = customEndpoint
      ? customEndpoint
      : `/${this.resource.plural}`;
    const response = await this.httpClient.get(endpoint, this.auth);

    return response.data.content;
  }

  findById(id: number, customEndpoint?: string) {
    const endpoint = customEndpoint
      ? customEndpoint
      : `/${this.resource.singular}/${id}`;

    return MaybeAsync<Entity>(async () => {
      const { data } = await this.httpClient.get(endpoint, this.auth);
      return data;
    });
  }

  create(resource: Dto, customEndpoint?: string) {
    const endpoint = customEndpoint
      ? customEndpoint
      : `/${this.resource.singular}`;

    return MaybeAsync<Entity>(async () => {
      const { createdResource } = await this.httpClient
        .post(endpoint, resource, this.auth)
        .then(({ data }) => ({ createdResource: data as Entity }));
      return createdResource;
    });
  }

  async update(id: number, resource: Dto, customEndpoint?: string) {
    const endpoint = customEndpoint
      ? customEndpoint
      : `/${this.resource.singular}/${id}`;
    return this.httpClient
      .put(endpoint, resource, this.auth)
      .then(() => true)
      .catch(() => false);
  }

  async delete(id: number, customEndpoint?: string) {
    const endpoint = customEndpoint
      ? customEndpoint
      : `/${this.resource.singular}/${id}`;

    return this.httpClient
      .delete(endpoint, this.auth)
      .then(() => true)
      .catch(() => false);
  }
}
