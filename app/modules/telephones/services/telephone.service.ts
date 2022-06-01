import { ChildCrudService } from "@modules/http";
import { Telephone } from "../telephone.slice";

export type TelephoneDto = Omit<Telephone, "id">;

export const telephoneRepository = (token: string, parentId: number) => {
  return new ChildCrudService<Telephone, TelephoneDto>({
    token,
    resource: {
      singular: "telephone",
      plural: "telephones",
    },
    parentResource: {
      id: parentId,
      singular: "client",
      plural: "clients",
    },
  });
};
