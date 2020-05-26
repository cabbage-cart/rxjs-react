import React, { useState, useEffect } from "react";
import { take, map } from "rxjs/operators";
import ApiService from "./services/api.service";

interface Employee {
  id: string;
  employee_name: string;
  employee_salary: string;
  employee_age: string;
  profile_image?: string;
}

const App = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const addEmployee = (event: React.MouseEvent) => {
    event.preventDefault();
    const _employee: any = {
      id: "9001",
      employee_age: "25",
      employee_salary: "9001",
      employee_name: "Ben Solo",
    };
    new ApiService("/create", _employee).post().subscribe((r) => {
      setEmployees([_employee, ...employees]);
    });
  };

  useEffect(() => {
    const subscription = new ApiService("/employees")
      .get()
      .pipe(
        take(1),
        map((res) => {
          if (res.status === "success") {
            return res.data.slice(0, 15);
          } else {
            return [];
          }
        })
      )
      .subscribe((employees: Employee[]) => {
        setEmployees(employees);
      });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <button style={buttonStyle} onClick={addEmployee}>
        Add Employee
      </button>
      {employees.map((e) => (
        <div key={e.id} style={employeeStyle}>
          <p>{e.employee_name}</p>
          <p>{e.employee_age}</p>
          <p>{e.employee_salary}</p>
        </div>
      ))}
    </>
  );
};

const employeeStyle = {
  border: "1px solid grey",
  padding: ".4rem 2rem",
  margin: "1.5rem 3rem",
};

const buttonStyle = {
  background: "darkseagreen",
  border: "none",
  fontSize: "22px",
  cursor: "pointer",
  padding: "8px 15px",
  borderRadius: "2px",
};

export default App;
