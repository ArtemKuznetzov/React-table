import { createSlice } from "@reduxjs/toolkit";

const rememberSelectedCompanyRowSlice = createSlice({
  name: "table",
  initialState: [],
  reducers: {
    rememberSelectedCompanyAfterSubmit: (state, action) => {
      if (action.payload.length) {
        return (state = action.payload);
      } else {
        return (state = action.payload);
      }
    },
  },
});

export const { rememberSelectedCompanyAfterSubmit } =
  rememberSelectedCompanyRowSlice.actions;

export default rememberSelectedCompanyRowSlice.reducer;
