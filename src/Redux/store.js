import { configureStore } from "@reduxjs/toolkit";
import companyTableReducer from "./Slice/companyTableSlice";
import employeeTableReducer from "./Slice/employeeTableData";
import submitButtonClickedReducer from "./Slice/submitModalFormSlice";
import rememberSelectedRowReducer from "./Slice/rememberSelectedCompanyRow";
import rememberSelectedRowAfterRemoveReducer from "./Slice/rememberSelectedCompanyAfterRemove";

export const store = configureStore({
  reducer: {
    companyTable: companyTableReducer,
    employeeTable: employeeTableReducer,
    submitButtonClicked: submitButtonClickedReducer,
    rememberSelectedRow: rememberSelectedRowReducer,
    rememberSelectedRowAfterRemove: rememberSelectedRowAfterRemoveReducer,
  },
});
