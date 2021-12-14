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
  const [currentEmployeeLeave, setCurrentEmployeeLeave] = useState(0)
  const increaseParitcularEmployeeLeave = (id) => {
    let data = employee.filter((elem) => elem.id === id)
    //  console.log(data[0].quantity++)
    employee.filter((curElm) => {
      if (curElm.id === id) {
        curElm.quantity++
      }
    })
    setEmployee(employee)
  }
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
    if (window.confirm('You want to delete ?')) {
      setDeleteLoader(true)
      const URL = `https://leave-tracker-backend.herokuapp.com/employee/${id}`;
      axios
        .delete(URL, { method: "DELETE" })
        .then((data) => {
          setEmployee(employees => employees.filter(employee => employee.id !== id))
          setDeleteLoader(false)
        })
        .catch((e) => console.log(e));
    }
  };
  const [leaveNumber, setLeaveNumber] = useState(1)

  const onDecrement = () => {
    if (leaveNumber > 1) {
      setLeaveNumber(leaveNumber - 1)
    }
  }
  const onIncrement = () => {
    setLeaveNumber(leaveNumber + 1)
  }
  const addLeaveToAll = () => {
    if (window.confirm(`Add ${leaveNumber} Leaves to all employee`)) {
      let result = employee.filter((emp) => emp.id)
      axios
        .put(`https://leave-tracker-backend.herokuapp.com/employee/${result}`, { leaves: { ...+5 } })
        .then((res) => console.log(res.data))
        .catch((e) => console.log(e));
      console.log(localStorage.getItem('userInfo'))
    }
  }
  const updateParticularEmployee = (id) => {
    console.log(id)
  }
  return (
    <>
      <div className="counter m-5">
        <button className="btn btn-warning decrement-button" onClick={onDecrement}><img src="https://img.icons8.com/material-outlined/24/000000/minus.png" /></button>
        <span className="mx-4">{leaveNumber}</span>
        <button className="btn btn-danger increment-button" onClick={onIncrement}><img src="https://img.icons8.com/ios/50/000000/plus-math.png" /></button>
        <button className="btn btn-success" title="Add Leave" onClick={addLeaveToAll}>Add Leave</button>
      </div>
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
      <div class="containerss">
        <svg style={{ display: deleteLoader ? 'block' : 'none' }} class="ball" width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50c0 27.614-22.386 50-50 50S0 77.614 0 50 22.386 0 50 0s50 22.386 50 50Z" fill="url(#a)" /><path d="M50 0v100" stroke="#1D1D1B" stroke-width="4" /><path d="M0 50h100" stroke="#000" stroke-width="4" /><path fill-rule="evenodd" clip-rule="evenodd" d="M90.061 20.077A45.819 45.819 0 0 0 79 50a45.82 45.82 0 0 0 11.061 29.923 50.213 50.213 0 0 1-2.561 3.15C79.72 74.259 75 62.68 75 50c0-12.68 4.72-24.259 12.5-33.073a50.215 50.215 0 0 1 2.561 3.15ZM9.939 79.923A45.82 45.82 0 0 0 21 50 45.819 45.819 0 0 0 9.939 20.077a50.21 50.21 0 0 1 2.561-3.15C20.28 25.741 25 37.32 25 50c0 12.68-4.72 24.259-12.5 33.073a50.209 50.209 0 0 1-2.561-3.15Z" fill="#000" /><defs><linearGradient id="a" x1="16.5" y1="12" x2="85.5" y2="84" gradientUnits="userSpaceOnUse"><stop stop-color="#FC6C33" /><stop offset="1" stop-color="#D4522B" /></linearGradient></defs></svg>
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
                    <td>
                      <svg viewbox="0 0 25 25" style={{ width: '25px', height: '27px' }}>
                        <title>Minus</title>
                        <circle cx="12.5" cy="12.5" r="12" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" vector-effect="non-scaling-stroke" />
                        <line x1="6" y1="12.5" x2="19" y2="12.5" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" vector-effect="non-scaling-stroke" />
                      </svg>
                      <span className="mx-2">{val.quantity}</span>
                      <svg style={{ width: '25px', height: '27px' }} viewbox="0 0 25 25" onClick={increaseParitcularEmployeeLeave.bind(this, val.id)}>
                        <title>Plus</title>
                        <circle cx="12.5" cy="12.5" r="12" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" vector-effect="non-scaling-stroke" />
                        <line x1="6" y1="12.5" x2="19" y2="12.5" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" vector-effect="non-scaling-stroke" />
                        <line y1="6" x1="12.5" y2="19" x2="12.5" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" vector-effect="non-scaling-stroke" />
                      </svg>
                      <svg style={{width:'30px',height:'27px',borderRadius:'30px',border:'1px solid',marginLeft:'5px'}} viewBox="-5 -11 50 50" class="check" onClick={updateParticularEmployee.bind(this, val.id)}>
                        <polyline points="0.4,15.3 12.4,27.3 39.3,0.4 " stroke="#fff" fill="transparent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
                      </svg>
                    </td>
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
                  <div className="delete-icon-card" >
                    <svg onClick={deleteEmployee.bind(this, val.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path></svg>
                  </div>
                  <div className="particular-employee-leave mt-2 mx-5">
                    <svg viewbox="0 0 25 25">
                      <title>Plus</title>
                      <circle cx="12.5" cy="12.5" r="12" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" vector-effect="non-scaling-stroke" />
                      <line x1="6" y1="12.5" x2="19" y2="12.5" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" vector-effect="non-scaling-stroke" />
                      <line y1="6" x1="12.5" y2="19" x2="12.5" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" vector-effect="non-scaling-stroke" />
                    </svg>
                    <h1 className="m-0">0</h1>
                    <svg viewbox="0 0 25 25">
                      <title>Minus</title>
                      <circle cx="12.5" cy="12.5" r="12" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" vector-effect="non-scaling-stroke" />
                      <line x1="6" y1="12.5" x2="19" y2="12.5" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" vector-effect="non-scaling-stroke" />
                    </svg>
                  </div>
                  <button className="btn btn-success mt-2">Add</button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
