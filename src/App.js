import React from "react";
import { COMPANY_COLUMNS, EMPLOYEE_COLUMNS } from "./columns";
import CompanyTable from "./components/TableComponent/MainTableComponent";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyData } from "./Redux/Slice/companyTableSlice";

function App() {
  const companyDataLoadingStatus = useSelector(
    (state) => state.companyTable.status
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCompanyData());
  }, [dispatch]);

  return (
    <div className="main-container">
      <header className="header">
        <h1>Welcome to my Companies list App!</h1>
      </header>
      <div className="tables-block">
        <div className="table-company">
          {companyDataLoadingStatus === "resolved" && (
            <CompanyTable
              tableColumns={COMPANY_COLUMNS}
              tableName={"Companies"}
            />
          )}
        </div>
        <div className="table-employee">
          <CompanyTable
            tableColumns={EMPLOYEE_COLUMNS}
            tableName={"Employees"}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
