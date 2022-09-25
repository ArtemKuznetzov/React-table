import { createSlice } from "@reduxjs/toolkit";

const rememberSelectedCompanyRowAfterRemoveSlice = createSlice({
  name: "table",
  initialState: false,
  reducers: {
    rememberSelectedCompanyAfterRemoveEmployee: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { rememberSelectedCompanyAfterRemoveEmployee } =
  rememberSelectedCompanyRowAfterRemoveSlice.actions;

export default rememberSelectedCompanyRowAfterRemoveSlice.reducer;
