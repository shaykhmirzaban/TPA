import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItem, getItem } from "../../../config/FirebaseMethods";

export default function ShowResultHome() {
  let [data, setData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getItem("result")
      .then((_) => {
        setData(Object.values(_));
      })
      .catch((_) => {
        console.log(_);
      });
  }, []);

  const deleteItem12 = (value, index) => {
    deleteItem("result", value.key)
      .then((_) => {
        console.log(_);
        setData((val) => val.filter((val1, inx) => inx !== index));
      })
      .catch((_) => console.log(_));
  };

  return (
    <section>
      <div className="heading">
        <h1>Show Result</h1>
      </div>

      <table>
        <thead>
          <tr>
            <th>Roll no</th>
            <th>Course</th>
            <th>Name</th>
            <th>Father Name</th>
            <th>Mark</th>
            <th>Result</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => {
            return (
              <tr key={index}>
                <td>{value.rollNo}</td>
                <td>{value.course}</td>
                <td>{value.name}</td>
                <td>{value.fatherName}</td>
                <td>{value.mark}</td>
                <td>{value.result}</td>
                <td>
                  <button onClick={() => deleteItem12(value, index)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      navigate("update-show-result", { state: value })
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
