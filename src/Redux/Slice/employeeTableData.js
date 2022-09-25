import { createSlice } from "@reduxjs/toolkit";
import mockEmployeeData from "../../mock_employeeData.json";

const employeeTableSlice = createSlice({
  name: "table",
  initialState: mockEmployeeData,
  reducers: {
    editEmployeeData: (state, action) => {
      if (
        action.payload.employeeId === state[action.payload.index].employee_id
      ) {
        state[action.payload.index][action.payload.id] = action.payload.value;
      }
    },
    isEmployeeRowSelected: (state, action) => {
      if (Array.isArray(action.payload)) {
        for (let i = 0; i < state.length; i++) {
          if (action.payload.includes(state[i].employee_id)) {
            state[i].is_employee_selected = true;
          } else {
            state[i].is_employee_selected = false;
          }
        }
      } else if (!action.payload) {
        state.map((item) => (item.is_employee_selected = false));
      }
    },
    removeEmployeeDataFromCompany: (state, action) => {
      for (let i = 0; i < state.length; i++) {
        if (action.payload.includes(state[i].employee_id)) {
          state.splice(i, action.payload.length);
        }
      }
    },
    addNewEmployeeToCompany: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const {
  editEmployeeData,
  isEmployeeRowSelected,
  removeEmployeeDataFromCompany,
  addNewEmployeeToCompany,
} = employeeTableSlice.actions;

export default employeeTableSlice.reducer;
