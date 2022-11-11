import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItem, getItem } from "../../../config/FirebaseMethods";

import "../../../style/studentRegistrationList.scss";

export default function CourseListHome() {
  let [data, setData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getItem("course")
      .then((_) => {
        console.log(Object.values(_));
        setData(Object.values(_));
      })
      .catch((_) => console.log(_));
  }, []);

  const deleteCourse = (getValue, inx) => {
    deleteItem("course", getValue.key)
      .then((_) => {
        console.log(_);
        setData((val) => val.filter((value, index) => index !== inx));
      })
      .catch((_) => console.log(_));
  };

  return (
    <section className="CourseList">
      <div className="heading">
        <h1>Course List</h1>
      </div>

      <div className="table">
        <table style={{ border: "2px solid black" }}>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Lead Trainer</th>
              <th>Assistant Trainer</th>
              <th>Course Duration</th>
              <th>No. of Quiz</th>
              <th>Price</th>
              <th>Is Publicly Open</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{value.courseName}</td>
                    <td>{value.leadTrainer}</td>
                    <td>
                      {value.assistantTrainer &&
                        value.assistantTrainer.map((value, index) => (
                          <li key={index}>{value}</li>
                        ))}
                    </td>
                    <td>{value.courseDuration} Month</td>
                    <td>{value.noOfQuiz} Quiz</td>
                    <td>Rs {value.price}</td>
                    <td>{value.isPubliclyOpen}</td>
                    <td>
                      <button onClick={() => deleteCourse(value, index)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          navigate("course-update", { state: value })
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
