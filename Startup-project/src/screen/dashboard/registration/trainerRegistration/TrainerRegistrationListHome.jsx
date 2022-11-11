import { useEffect, useState } from "react";
import { getItem, deleteItem } from ".././../../../config/FirebaseMethods";

import "../../../../style/studentRegistrationList.scss";
import { useNavigate } from "react-router-dom";

export default function TrainerRegistrationListHome() {
  let [data, setData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getItem("TrainerRegistration")
      .then((_) => {
        setData(Object.values(_));
      })
      .catch((_) => console.log(_));
  }, []);

  const deleteItem123 = (e, inx) => {
    deleteItem("TrainerRegistration", e.key)
      .then((_) => {
        alert("successfully delete");
        setData((val) => val.filter((value, index) => index !== inx));
      })
      .catch((_) => {
        console.log(_);
      });
  };

  return (
    <section className="TrainerRegistrationList">
      <div className="heading">
        <h1>Trainer Registration List</h1>
      </div>

      <div className="table">
        <table style={{ border: "2px solid black" }}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Contact</th>
              <th>Qualification</th>
              <th>Other Qualification</th>
              <th>Courses Allowed</th>
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
                    <td>{value.lastName}</td>
                    <td>{value.contact}</td>
                    <td>{value.qualification}</td>
                    <td>
                      {value.otherQualification &&
                        value.otherQualification.map((value, index) => (
                          <li key={index}>{value}</li>
                        ))}
                    </td>
                    <td>{value.coursesAllowed}</td>
                    <td>
                      <button onClick={() => deleteItem123(value, index)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          navigate("update-trainer-registration-list-form", {
                            state: value,
                          })
                        }
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
