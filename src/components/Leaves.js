import React, { useEffect, useState } from "react";
import tableHeaderItems from "../config/table-header";
import axios from "axios";
const fetchData = () => {
  const URL =
    "https://leave-tracker-backend.herokuapp.com/employee?role=employee";
  return axios.get(URL);
};
export default function Leaves(props) {
  const [employee, setEmployee] = useState([]);
  const [showLoader, setLoader] = useState(true);
  if (showLoader) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  useEffect(async () => {
    const { data } = await fetchData();
    setEmployee(data);
    setLoader(false);
  }, []);

  const deleteEmployee = (id) => {
    const URL = `https://leave-tracker-backend.herokuapp.com/employee/${id}`;
    axios
      .delete(URL, { method: "DELETE" })
      .then((data) => {
        setEmployee(employees=>employees.filter(employee=>employee.id !== id))
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <div style={{ display: showLoader ? "block" : "none" }}>
        <div className="loader-container">
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div className="table-wrapper-element">
        <table style={{ background: props.mode }} className="rwd-table">
          <thead>
            <tr>
              {tableHeaderItems.map((val) => {
                return (
                  <>
                    <td>{val.label}</td>
                  </>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {employee.map((val) => {
              return (
                <>
                  <tr>
                    <td>{val.firstName + " " + val.lastName}</td>
                    <td>{val.email}</td>
                    <td>{val.phone}</td>
                    <td>{val.leave}</td>
                    <td className="action-button ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                      <span>/</span>
                      <svg
                        onClick={deleteEmployee.bind(this, val.id)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fill-rule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="card-container">
        <div className="cards">
          {employee.map((val) => {
            return (
              <>
                <div className="card">
                  <strong>Name: {val.firstName + " " + val.lastName}</strong>
                  <strong>Email: {val.email}</strong>
                  <strong>Phone: {val.phone}</strong>
                  <strong>Leaves: {val.leave}</strong>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
