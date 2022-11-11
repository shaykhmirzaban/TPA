import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItem, getItem } from "../../../../config/FirebaseMethods";

import "../../../../style/studentRegistrationList.scss";

export default function StudentRegistrationListHome() {
  let [data, setData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getItem("StudentRegistration")
      .then((_) => {
        setData(Object.values(_));
      })
      .catch((_) => console.log(_));
  }, []);

  const updateStudentRegistrationForm = (value) => {
    navigate("update-student-registration-form", { state: value });
  };

  const deleteStudentRegistration = (value, index) => {
    deleteItem("StudentRegistration", value.key)
      .then((_) => {
        console.log(_);
        setData((val) => val.filter((value, inx) => inx !== index));
      })
      .catch((_) => console.log(_));
  };

  return (
    <section className="studentRegistrationList">
      <div className="heading">
        <h1>Student Registration List</h1>
      </div>

      <div className="table">
        <table style={{ border: "2px solid black" }}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Father Name</th>
              <th>Age</th>
              <th>Cnic</th>
              <th>Emergency Contact</th>
              <th>Father Contact</th>
              <th>Student Contact</th>
              <th>Registration Date</th>
              <th>Section</th>
              <th>Course</th>
              <th>IS Approved</th>
              <th>IS Fee Submited</th>
              <th>Active</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{value.firstName}</td>
                    <td>{value.fatherName}</td>
                    <td>{value.age}</td>
                    <td>{value.cnic}</td>
                    <td>{value.emergyContact}</td>
                    <td>{value.fatherContact}</td>
                    <td>{value.contact}</td>
                    <td>{value.registrationDate}</td>
                    <td>{value.section}</td>
                    <td>{value.course}</td>
                    <td>{value.isApproved}</td>
                    <td>{value.isFeeSubmited}</td>
                    <td>{value.active}</td>
                    <td>
                      <button
                        onClick={() => deleteStudentRegistration(value, index)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => updateStudentRegistrationForm(value)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
