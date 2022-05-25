import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Address {
  id: number;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  cep: string;
}

export interface Telephone {
  id: number;
  ddd: number;
  number: string;
}

export interface Contacts {
  id: number;
  address: Address;
  telephones: Telephone[];
}

export interface Client {
  id: number;
  name: string;
  age: number;
}

type WithoutId<T> = Omit<T, "id">;

export type CompleteClient = Client & {
  address: Address;
  telephones: Telephone[];
};

export interface ClientState {
  modal: {
    open: boolean;
    client: CompleteClient;
  };
}

const initialState: ClientState = {
  modal: {
    open: false,
    client: {
      id: 0,
      name: "",
      age: 0,
      address: {
        id: 0,
        country: "",
        cep: "",
        city: "",
        neighborhood: "",
        state: "",
        number: 0,
        street: "",
      },
      telephones: [{ id: 0, number: "", ddd: 99 }],
    },
  },
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    modalOpened(state, action: PayloadAction<CompleteClient>) {
      state.modal.open = true;
      state.modal.client = action.payload;
    },
    modalClosed(state) {
      state.modal.open = false;
      state.modal.client = initialState.modal.client;
    },
  },
});

export const { modalOpened, modalClosed } = clientSlice.actions;
export const clientReducer = clientSlice.reducer;
