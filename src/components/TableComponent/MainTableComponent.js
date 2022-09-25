import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allCompaniesRowData,
  allEmployeesRowData,
  selectedCompaniesIdSelector,
  selectedEmployeesIdSelector,
} from "../../Redux/Selectors/selectors";
import Table from "./TableData";
import {
  calculateEmployeeMount,
  removeCompany,
} from "../../Redux/Slice/companyTableSlice";
import { removeEmployeeDataFromCompany } from "../../Redux/Slice/employeeTableData";
import Modal from "react-modal";
import ModalBody from "../ModalComponent/ModalBody";
import { isSubmitButtonClicked } from "../../Redux/Slice/submitModalFormSlice";
import { rememberSelectedCompanyAfterSubmit } from "../../Redux/Slice/rememberSelectedCompanyRow";
import { rememberSelectedCompanyAfterRemoveEmployee } from "../../Redux/Slice/rememberSelectedCompanyAfterRemove";

Modal.setAppElement("#root");
const customStyles = {
  content: {
    width: "500px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function MainTable({ tableColumns, tableName }) {
  // Redux hooks
  const submitButtonClicked = useSelector((state) => state.submitButtonClicked);
  const rememberSelectedRow = useSelector((state) => state.rememberSelectedRow);
  const selectedCompaniesId = useSelector(selectedCompaniesIdSelector);
  const selectedEmployeesId = useSelector(selectedEmployeesIdSelector);
  const companiesData = useSelector(allCompaniesRowData);
  const employeesData = useSelector(allEmployeesRowData);

  const dispatch = useDispatch();

  // React hooks
  const columns = React.useMemo(() => tableColumns, []);

  const [data, setData] = React.useState(() =>
    tableName === "Companies" ? companiesData.data : employeesData
  );
  const [isRemoveButtonClicked, setIsRemoveButtonClicked] =
    React.useState(false);

  // The function of updating tabular data when editing a table cell
  const updateMyData = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // Updating tabular data (not store data) when clicking the delete button.
  // After changes in the store, it is necessary to call the rerender of the company data displayed in the table

  React.useEffect(() => {
    if (isRemoveButtonClicked) {
      setData(companiesData.data);
    }
    return () => {
      setIsRemoveButtonClicked(false);
    };
  }, [companiesData.data]);

  // Same, but for the data in the employee table
  React.useEffect(() => {
    if (isRemoveButtonClicked) {
      setData(employeesData);
    }
    return () => {
      setIsRemoveButtonClicked(false);
    };
  }, [employeesData]);

  // It is necessary to update the table data after submiting the form.
  // Submit button becomes the true value after clicking on the "Add company" button
  // and the false value after submiting the form.
  // rememberSelectedRow value is necessary because the checkbox is reset to the initial value after adding new data.
  // TODO: add a condition: the setData func must called only once during initialization (in useEffect which is above)
  React.useEffect(() => {
    if (
      tableName === "Companies" &&
      !submitButtonClicked &&
      !rememberSelectedRow.length
    ) {
      setData(companiesData.data);
    } else if (tableName === "Employees" && !submitButtonClicked) {
      setData(employeesData);
      dispatch(rememberSelectedCompanyAfterSubmit([]));
    }
  }, [submitButtonClicked]);

  const removeData = () => {
    if (tableName === "Companies") {
      dispatch(removeCompany(selectedCompaniesId));
      setIsRemoveButtonClicked(true);
    } else {
      dispatch(removeEmployeeDataFromCompany(selectedEmployeesId));
      dispatch(rememberSelectedCompanyAfterRemoveEmployee(selectedCompaniesId));
      dispatch(
        calculateEmployeeMount({
          companyId: selectedCompaniesId,
          employeesId: selectedEmployeesId,
        })
      );
      setIsRemoveButtonClicked(true);
    }
  };

  return (
    <>
      {tableName === "Companies" && (
        <>
          <button onClick={removeData} disabled={!selectedCompaniesId.length}>
            Remove Company
          </button>
          <button
            onClick={() => {
              dispatch(isSubmitButtonClicked(true));
            }}
            disabled={selectedCompaniesId.length}
          >
            Add company
          </button>
        </>
      )}
      {tableName === "Employees" && (
        <>
          <button onClick={removeData} disabled={!selectedEmployeesId.length}>
            Remove employee
          </button>
          <button
            onClick={() => {
              dispatch(isSubmitButtonClicked(true));
            }}
            disabled={
              !(selectedCompaniesId.length === 1 && !selectedEmployeesId.length)
            }
          >
            Add employee
          </button>
        </>
      )}

      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        tableName={tableName}
        isRemoveButtonClicked={isRemoveButtonClicked}
      />
      <Modal isOpen={submitButtonClicked} style={customStyles}>
        <ModalBody />
      </Modal>
    </>
  );
}

export default MainTable;
