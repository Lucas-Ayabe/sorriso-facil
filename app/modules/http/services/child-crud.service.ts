import { AxiosInstance } from "axios";
import { MaybeAsync } from "purify-ts";
import { sorrisoFacilApi } from "../config";
import { auth } from "../helpers";

export interface ChildCrudServiceConfig {
  token: string;
  resource: {
    singular: string;
    plural: string;
  };
  parentResource: {
    id: number;
    singular: string;
    plural: string;
  };
}

export class ChildCrudService<Entity, Dto> {
  private readonly httpClient: AxiosInstance;
  private readonly token: string;
  private readonly resource: {
    singular: string;
    plural: string;
  };
  private readonly parentResource: {
    id: number;
    singular: string;
    plural: string;
  };

  constructor({ token, resource, parentResource }: ChildCrudServiceConfig) {
    this.token = token;
    this.resource = resource;
    this.parentResource = parentResource;
    this.httpClient = sorrisoFacilApi;

    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.singularEndpoint = this.singularEndpoint.bind(this);
  }

  private get auth() {
    return { headers: auth(this.token) };
  }

  private get parentBase() {
    const { singular, id } = this.parentResource;
    return `/${singular}/${id}`;
  }

  private get singularGeralEndpoint() {
    const { singular } = this.resource;
    return `${this.parentBase}/${singular}`;
  }

  private get pluralGeralEndpoint() {
    const { plural } = this.resource;
    return `${this.parentBase}/${plural}`;
  }

  private singularEndpoint(resourceId: number) {
    return `${this.singularGeralEndpoint}/${resourceId}`;
  }

  async findAll(customEndpoint?: string): Promise<Entity[]> {
    const endpoint = customEndpoint ? customEndpoint : this.pluralGeralEndpoint;
    const response = await this.httpClient.get(endpoint, this.auth);

    return response.data.content;
  }

  findById(id: number, customEndpoint?: string) {
    const endpoint = customEndpoint
      ? customEndpoint
      : this.singularEndpoint(id);

    return MaybeAsync<Entity>(async () => {
      const { data } = await this.httpClient.get(endpoint, this.auth);
      return data;
    });
  }

  create(resource: Dto, customEndpoint?: string) {
    const endpoint = customEndpoint
      ? customEndpoint
      : this.singularGeralEndpoint;

    return MaybeAsync<Entity>(async () => {
      return this.httpClient
        .post(endpoint, resource, this.auth)
        .then(({ data }) => data);
    });
  }

  async update(id: number, resource: Dto, customEndpoint?: string) {
    const endpoint = customEndpoint
      ? customEndpoint
      : this.singularEndpoint(id);

    return this.httpClient
      .put(endpoint, resource, this.auth)
      .then(() => true)
      .catch(() => false);
  }

  async delete(id: number, customEndpoint?: string) {
    const endpoint = customEndpoint
      ? customEndpoint
      : this.singularEndpoint(id);
    return this.httpClient
      .delete(endpoint, this.auth)
      .then(() => true)
      .catch(() => false);
  }
}
