import React from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import { Checkbox } from "../CheckboxComponent/Checkbox";
import { selectedCompaniesIdSelector } from "../../Redux/Selectors/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  editCompanyData,
  isCompanyRowSelected,
} from "../../Redux/Slice/companyTableSlice";
import {
  editEmployeeData,
  isEmployeeRowSelected,
} from "../../Redux/Slice/employeeTableData";
import TableNavigation from "../TableNavigationComponent/TableNavigationComponent";
import "./tableData.css";

function Table({ columns, data, updateMyData, tableName }) {
  // Redux hooks
  const selectedCompaniesId = useSelector(selectedCompaniesIdSelector);
  const rememberCompanyPageAfterRemoveEmployee = useSelector(
    (state) => state.rememberSelectedRowAfterRemove
  );

  const dispatch = useDispatch();

  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData,
  }) => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = (e) => {
      setValue(e.target.value);
    };

    const onBlur = (e) => {
      updateMyData(index, id, value);
      if (tableName === "Companies") {
        dispatch(
          editCompanyData({
            value: e.target.value,
            index,
            id,
            companyId: data[index].company_id,
          })
        );
      } else {
        dispatch(
          editEmployeeData({
            value: e.target.value,
            index,
            id,
            employeeId: data[index].employee_id,
          })
        );
      }
    };

    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    if (id !== "employee_mount") {
      return <input value={value} onChange={onChange} onBlur={onBlur} />;
    }
    return (
      <span>
        {rememberCompanyPageAfterRemoveEmployee !== false ? value - 1 : value}
      </span>
    );
  };

  const defaultColumn = {
    Cell: EditableCell,
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,

      updateMyData,
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <Checkbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  // filteredRows value: according to the id of the selected company, employees will be displayed in the table.
  // Initially, I planned to push employees into the table depending on the companies, but this led to serious problems.
  // As a result, the optimal solution was to load all employees into the table at once
  // and display them depending on the selected company
  const filteredRows = page.filter((item) =>
    selectedCompaniesId.includes(item.original.company_id)
  );

  React.useEffect(() => {
    if (tableName === "Companies") {
      const selectedRowsId = selectedFlatRows.map(
        (item) => item.original.company_id
      );
      if (selectedFlatRows.length) {
        dispatch(isCompanyRowSelected(selectedRowsId));
      } else {
        dispatch(isCompanyRowSelected(false));
      }
    } else {
      if (selectedFlatRows.length) {
        const selectedRowsId = selectedFlatRows.map(
          (item) => item.original.employee_id
        );
        dispatch(isEmployeeRowSelected(selectedRowsId));
      } else {
        dispatch(isEmployeeRowSelected(false));
      }
    }
  }, [selectedFlatRows]);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {tableName === "Companies" &&
            page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          {tableName === "Employees" &&
            filteredRows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="pagination">
        <TableNavigation
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageOptions={pageOptions}
          pageIndex={pageIndex}
          pageSize={pageSize}
          gotoPage={gotoPage}
          previousPage={previousPage}
          setPageSize={setPageSize}
          nextPage={nextPage}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}

export default Table;
