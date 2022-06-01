import { MaybeAsync } from "purify-ts";

export type Props<T extends { id: number } = { id: number }> = {
  user: { token: string; admin: boolean };
  entity: T;
};

export type SuccessReturn<T extends { id: number } = { id: number }> = {
  props: Props<T>;
};

export interface ErrorReturn {
  redirect: {
    destination: string;
    permanent: boolean;
  };
}

type GetServerSidePropsReturnConfig<T extends { id: number }> = {
  user: { token: string; admin: boolean };
  maybe: MaybeAsync<T>;
  onFailDestination: string;
};

export const getServerSidePropsReturn = <T extends { id: number }>({
  maybe,
  onFailDestination,
  user,
}: GetServerSidePropsReturnConfig<T>) => {
  return maybe.caseOf<SuccessReturn<T> | ErrorReturn>({
    Just: (entity) => {
      return {
        props: {
          user,
          entity,
        },
      };
    },
    Nothing: () => {
      return {
        redirect: {
          destination: onFailDestination,
          permanent: false,
        },
      };
    },
  });
};
