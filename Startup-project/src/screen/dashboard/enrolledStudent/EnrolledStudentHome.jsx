import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItem, getItem } from "../../../config/FirebaseMethods";

export default function EnrolledStudent() {
  let [data, setData] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    getItem("enrolledStudent")
      .then((_) => {
        console.log(_);
        setData(Object.values(_));
      })
      .catch((_) => console.log(_));
  }, [0]);

  const deleteItem12 = (value, index) => {
    deleteItem("enrolledStudent", value.key)
      .then((_) => {
        console.log(_);
        setData((val) => val.filter((value, inx) => inx !== index));
      })
      .catch((_) => console.log(_));
  };

  return (
    <section className="EnrolledStudent">
      <div className="heading">
        <h1>Enrolled Student</h1>
      </div>

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Course</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Zip Code</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Admission Start</th>
            <th>Admission End</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value.course}</td>
                  <td>{value.firstName}</td>
                  <td>{value.lastName}</td>
                  <td>{value.email}</td>
                  <td>{value.city}</td>
                  <td>{value.zipCode}</td>
                  <td>{value.address}</td>
                  <td>{value.phone}</td>
                  <td>{value.admissionStart}</td>
                  <td>{value.admissionEnd}</td>
                  <td>
                    <button onClick={() => deleteItem12(value, index)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        navigate("update-enrolled-student", { state: value })
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
    </section>
  );
}
