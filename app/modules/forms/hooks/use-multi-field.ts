import { useReducer } from "react";
import { PayloadAction } from "@reduxjs/toolkit";
import { MultiFieldValue } from "../components/MultiField";
import { matchWith } from "@/helpers";

type Payload = Partial<{ value: MultiFieldValue; index: number; id: string }>;
type Actions = "FIELD_ADDED" | "FIELD_UPDATED" | "FIELD_REMOVED";
type Reducer = (
  state: MultiFieldValue[],
  action: PayloadAction<Payload, Actions>
) => MultiFieldValue[];

const defaultFieldValue = { value: "" };

const multiFieldReducer: Reducer = (state, action) => {
  const matchWithPattern = matchWith({
    FIELD_ADDED: [...state, action.payload?.value ?? defaultFieldValue],
    FIELD_UPDATED: state.map((value, index) => {
      const isUpdated = action.payload.index === index;
      return !isUpdated ? value : action.payload.value ?? defaultFieldValue;
    }),
    FIELD_REMOVED: state.filter((_, index) => action.payload.index !== index),
  });

  return matchWithPattern(action.type) ?? state;
};

export const useMultiField = (
  initialValues: MultiFieldValue[] = [{ value: "" }]
) => {
  const [values, dispatch] = useReducer(multiFieldReducer, initialValues);
  const addField = (value = "", id = "") => {
    return dispatch({ type: "FIELD_ADDED", payload: { value: { value, id } } });
  };

  const removeField = (index: number, id = "") => {
    return dispatch({ type: "FIELD_REMOVED", payload: { index, id } });
  };

  const onChange = (value: MultiFieldValue, index: number, id = "") => {
    return dispatch({
      type: "FIELD_UPDATED",
      payload: { value, index },
    });
  };

  return {
    values,
    addField,
    removeField,
    onChange,
  };
};
