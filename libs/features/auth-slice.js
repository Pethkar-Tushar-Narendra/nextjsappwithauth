import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    fetch: "movie",
  },
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    action1: () => {
      return initialState;
    },
    action2: (state, action) => {
      return {
        value: {
          fetch: action.payload,
        },
      };
    },
  },
});

export const { action1, action2 } = auth.actions;
export default auth.reducer;
