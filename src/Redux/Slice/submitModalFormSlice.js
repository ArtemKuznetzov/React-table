import { createSlice } from "@reduxjs/toolkit";

const submitModalFormClickedSlice = createSlice({
  name: "table",
  initialState: false,
  reducers: {
    isSubmitButtonClicked: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { isSubmitButtonClicked } = submitModalFormClickedSlice.actions;

export default submitModalFormClickedSlice.reducer;
