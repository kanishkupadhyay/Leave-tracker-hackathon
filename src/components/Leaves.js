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
  const [deleteLoader, setDeleteLoader] = useState(false)
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
    if (window.confirm('You want to delete ?')){
      setDeleteLoader(true)
      const URL = `https://leave-tracker-backend.herokuapp.com/employee/${id}`;
      axios
        .delete(URL, { method: "DELETE" })
        .then((data) => {
          setEmployee(employees=>employees.filter(employee=>employee.id !== id))
          setDeleteLoader(false)
        })
        .catch((e) => console.log(e));
    }
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
      <div  class="containerss">
  <svg style={{display:deleteLoader?'block':'none'}} class="ball" width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50c0 27.614-22.386 50-50 50S0 77.614 0 50 22.386 0 50 0s50 22.386 50 50Z" fill="url(#a)"/><path d="M50 0v100" stroke="#1D1D1B" stroke-width="4"/><path d="M0 50h100" stroke="#000" stroke-width="4"/><path fill-rule="evenodd" clip-rule="evenodd" d="M90.061 20.077A45.819 45.819 0 0 0 79 50a45.82 45.82 0 0 0 11.061 29.923 50.213 50.213 0 0 1-2.561 3.15C79.72 74.259 75 62.68 75 50c0-12.68 4.72-24.259 12.5-33.073a50.215 50.215 0 0 1 2.561 3.15ZM9.939 79.923A45.82 45.82 0 0 0 21 50 45.819 45.819 0 0 0 9.939 20.077a50.21 50.21 0 0 1 2.561-3.15C20.28 25.741 25 37.32 25 50c0 12.68-4.72 24.259-12.5 33.073a50.209 50.209 0 0 1-2.561-3.15Z" fill="#000"/><defs><linearGradient id="a" x1="16.5" y1="12" x2="85.5" y2="84" gradientUnits="userSpaceOnUse"><stop stop-color="#FC6C33"/><stop offset="1" stop-color="#D4522B"/></linearGradient></defs></svg>
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
