import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  existedCompaniesIdSelector,
  existedEmployeesIdSelector,
  selectedCompaniesIdSelector,
} from "../../Redux/Selectors/selectors";
import { addNewCompany } from "../../Redux/Slice/companyTableSlice";
import { addNewEmployeeToCompany } from "../../Redux/Slice/employeeTableData";
import { rememberSelectedCompanyAfterSubmit } from "../../Redux/Slice/rememberSelectedCompanyRow";
import { isSubmitButtonClicked } from "../../Redux/Slice/submitModalFormSlice";
import "./submitModalForm.css";

export default function ModalBody() {
  // Redux hooks
  const selectedCompanyIdArray = useSelector(selectedCompaniesIdSelector);
  const companiesId = useSelector(existedCompaniesIdSelector);
  const employeesId = useSelector(existedEmployeesIdSelector);

  const makeUniqueId = (ids, table) => {
    const randomId = Math.floor(Math.random() * 101);
    if (table === "Companies" && !ids.includes(randomId)) {
      return randomId;
    }
    if (table === "Employees" && !ids.includes(randomId)) {
      return randomId;
    }

    const lastElement = ids[ids.length - 1];
    return lastElement + 1;
  };

  const dispatch = useDispatch();

  // React hooks
  const [newCompanyName, setNewCompanyName] = React.useState("");
  const [newCompanyAddress, setNewCompanyAddress] = React.useState("");
  const [newEmployeeFirstName, setNewFirstNameEmployeeName] =
    React.useState("");
  const [newEmployeeSecondName, setNewEmployeeSecondName] = React.useState("");
  const [newEmployeePosition, setNewEmployeePosition] = React.useState("");

  const submitForm = (event) => {
    event.preventDefault();
    if (!selectedCompanyIdArray.length) {
      dispatch(
        addNewCompany({
          company_name: newCompanyName,
          employee_mount: 0,
          company_address: newCompanyAddress,
          company_id: makeUniqueId(companiesId, "Companies"),
          is_company_selected: false,
        })
      );
      dispatch(isSubmitButtonClicked(false));
    } else {
      dispatch(
        addNewEmployeeToCompany({
          first_name: newEmployeeFirstName,
          second_name: newEmployeeSecondName,
          position: newEmployeeSecondName,
          employee_id: makeUniqueId(employeesId, "Employees"),
          company_id: Number(selectedCompanyIdArray.join("")),
          is_employee_selected: false,
        })
      );
      dispatch(isSubmitButtonClicked(false));
      dispatch(rememberSelectedCompanyAfterSubmit(selectedCompanyIdArray));
    }
  };
  // If selectedCompanyIdArray have lenght - this modal body uses for employee table. if no - for company table

  return (
    <>
      {!selectedCompanyIdArray.length && (
        <form onSubmit={submitForm}>
          <div className="modal-form">
            <div className="company-name">
              <span>Company name</span>
              <span>Company address</span>
            </div>
            <div className="company-input">
              <input
                className="modal-input"
                placeholder="Enter company name"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
              ></input>
              <input
                className="modal-input"
                placeholder="Enter company address"
                value={newCompanyAddress}
                onChange={(e) => setNewCompanyAddress(e.target.value)}
              ></input>
            </div>
          </div>
          <button className="submit-button" type="submit">
            Submit form
          </button>
        </form>
      )}

      {!!selectedCompanyIdArray.length && (
        <form onSubmit={submitForm}>
          <div className="modal-form">
            <div className="company-name">
              <span>First name</span>
              <span>Second name</span>
              <span>Position</span>
            </div>
            <div className="company-input">
              <input
                className="modal-input"
                placeholder="Enter employee's first name"
                value={newEmployeeFirstName}
                onChange={(e) => setNewFirstNameEmployeeName(e.target.value)}
              ></input>
              <input
                className="modal-input"
                placeholder="Enter employee's second name"
                value={newEmployeeSecondName}
                onChange={(e) => setNewEmployeeSecondName(e.target.value)}
              ></input>
              <input
                className="modal-input"
                placeholder="Enter employee's position"
                value={newEmployeePosition}
                onChange={(e) => setNewEmployeePosition(e.target.value)}
              ></input>
            </div>
          </div>
          <button className="submit-button" type="submit">
            Submit form
          </button>
        </form>
      )}
    </>
  );
}
