import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { updateItem } from "../../../config/FirebaseMethods";

export default function updateShowResult() {
  let [data, setData] = useState([]);

  let location = useLocation();

  useEffect(() => {
    setData(location.state);
  }, []);

  const currentV = (e) => {
    let { value, name } = e.target;

    setData((val) => {
      return { ...val, [name]: value };
    });
  };

  const allData = (e) => {
    e.preventDefault();

    updateItem(data, "result", data.key)
      .then((_) => console.log(_))
      .catch((_) => console.log(_));
  };

  return (
    <section className="updateShowResult">
      <div className="heading">
        <h1>Update Show Result</h1>
      </div>

      <form onSubmit={allData}>
        <input
          type="text"
          placeholder="course name"
          name="course"
          value={data.course}
          onChange={currentV}
        />
        <input
          type="text"
          placeholder="Enter student name"
          name="name"
          value={data.name}
          onChange={currentV}
        />
        <input
          type="text"
          placeholder="Enter student father name"
          name="fatherName"
          value={data.fatherName}
          onChange={currentV}
        />
        <input
          type="text"
          placeholder="Enter student roll no"
          name="rollNo"
          value={data.rollNo}
          onChange={currentV}
        />
        <input
          type="number"
          placeholder="Enter student mark"
          name="mark"
          value={data.mark}
          onChange={currentV}
        />
        <select name="result" onChange={currentV} value={data.result}>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>

        <button>Update</button>
      </form>
    </section>
  );
}
