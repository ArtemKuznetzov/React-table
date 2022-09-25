import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCompanyData = createAsyncThunk(
  "table/fetchTable",
  async function () {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    const data = await response.json();
    return data;
  }
);

const companyTableSlice = createSlice({
  name: "table",
  initialState: {
    data: [],
    status: null,
    error: null,
    removeButtonClicked: false,
  },
  reducers: {
    editCompanyData: (state, action) => {
      if (
        action.payload.companyId === state.data[action.payload.index].company_id
      ) {
        state.data[action.payload.index][action.payload.id] =
          action.payload.value;
      }
    },
    isCompanyRowSelected: (state, action) => {
      if (Array.isArray(action.payload)) {
        for (let i = 0; i < state.data.length; i++) {
          if (action.payload.includes(state.data[i].company_id)) {
            state.data[i].is_company_selected = true;
          } else {
            state.data[i].is_company_selected = false;
          }
        }
      } else if (!action.payload) {
        state.data.map((item) => (item.is_company_selected = false));
      }
    },
    removeCompany: (state, action) => {
      for (let i = 0; i < state.data.length; i++) {
        if (action.payload.includes(state.data[i].company_id)) {
          state.data.splice(i, action.payload.length);
        }
      }
    },
    addNewCompany: (state, action) => {
      state.data.push(action.payload);
    },
    calculateEmployeeMount: (state, action) => {
      for (let i = 0; i < state.data.length; i++) {
        if (action.payload.companyId.includes(state.data[i].company_id)) {
          state.data[i].employee_mount =
            state.data[i].employee_mount - action.payload.employeesId.length;
        }
      }
    },
  },
  extraReducers: {
    [fetchCompanyData.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchCompanyData.fulfilled]: (state, action) => {
      state.status = "resolved";
      // state.testData = action.payload;
      let result = action.payload.map((item, index) => {
        return {
          company_name: item.company.name,
          employee_mount: 1,
          company_address: item.address.street,
          company_id: index,
          is_company_selected: false,
        };
      });

      state.data = result;
    },
    [fetchCompanyData.rejected]: (state, action) => {},
  },
});

export const {
  editCompanyData,
  isCompanyRowSelected,
  removeCompany,
  addNewCompany,
  calculateEmployeeMount,
} = companyTableSlice.actions;

export default companyTableSlice.reducer;
