import React, { useEffect, useState } from "react";
import tableHeaderItems from "../config/table-header";
import axios from "axios";
const fetchData = () => {
  return axios.get("http://localhost:3000/employee?role=employee");
};
export default function Leaves(props) {
  const [employee, setEmployee] = useState([]);

  useEffect(async () => {
    const { data } = await fetchData();
    setEmployee(data);
  }, []);
  return (
    <>
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
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      </div>
    </>
  );
}
