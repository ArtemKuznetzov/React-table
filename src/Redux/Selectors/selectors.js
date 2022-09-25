import { createSelector } from "@reduxjs/toolkit";

export const allCompaniesRowData = (state) => state.companyTable;
export const allEmployeesRowData = (state) => state.employeeTable;

// Companies selectors
export const selectedCompaniesSelector = createSelector(
  [allCompaniesRowData],
  (companiesData) => {
    return companiesData.data.filter(
      (item) => item.is_company_selected === true
    );
  }
);

export const selectedCompaniesIdSelector = createSelector(
  [selectedCompaniesSelector],
  (companiesData) => {
    return companiesData.map((item) => item.company_id);
  }
);

export const existedCompaniesIdSelector = createSelector(
  [allCompaniesRowData],
  (companiesData) => {
    return companiesData.data.map((item) => item.company_id);
  }
);

// Employees selectors
export const selectedEmployeesSelector = createSelector(
  [allEmployeesRowData],
  (employeesData) => {
    return employeesData.filter((item) => item.is_employee_selected === true);
  }
);

export const selectedEmployeesIdSelector = createSelector(
  [selectedEmployeesSelector],
  (employeesData) => {
    return employeesData.map((item) => item.employee_id);
  }
);

export const existedEmployeesIdSelector = createSelector(
  [allEmployeesRowData],
  (companiesData) => {
    return companiesData.map((item) => item.employee_id);
  }
);
