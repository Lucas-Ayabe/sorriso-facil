import { matchWith } from "@/helpers";
import { PayloadAction } from "@reduxjs/toolkit";
import { useReducer } from "react";

type Payload = Partial<{ value: string; index: number }>;
type Actions = "FIELD_ADDED" | "FIELD_UPDATED" | "FIELD_REMOVED";
type Reducer = (
  state: string[],
  action: PayloadAction<Payload, Actions>
) => string[];

const multiFieldReducer: Reducer = (state, action) => {
  const matchWithPattern = matchWith({
    FIELD_ADDED: [...state, action.payload?.value ?? ""],
    FIELD_UPDATED: state.map((value, index) => {
      const isUpdated = action.payload.index === index;
      return !isUpdated ? value : action.payload.value ?? "";
    }),
    FIELD_REMOVED: state.filter((_, index) => action.payload.index !== index),
  });

  return matchWithPattern(action.type) ?? state;
};

export const useMultiField = (initialValues: string[] = [""]) => {
  const [values, dispatch] = useReducer(multiFieldReducer, initialValues);
  const addField = (value = "") => {
    return dispatch({ type: "FIELD_ADDED", payload: { value } });
  };

  const removeField = (index: number) => {
    return dispatch({ type: "FIELD_REMOVED", payload: { index } });
  };

  const onChange = (value: string, index: number) => {
    return dispatch({ type: "FIELD_UPDATED", payload: { value, index } });
  };

  return {
    values,
    addField,
    removeField,
    onChange,
  };
};
