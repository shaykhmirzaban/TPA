import { useState } from "react";
import { addItem, addItemWithoutKey } from "../../config/FirebaseMethods";

export default function CreateResult() {
  let [userInfo, setUserInfo] = useState({
    course: "",
    name: "",
    fatherName: "",
    rollNo: "",
    mark: "",
    result: "",
  });
  const currentV = (e) => {
    let { value, name } = e.target;
    setUserInfo((val) => {
      return { ...val, [name]: value };
    });
  };
  const allData = (e) => {
    e.preventDefault();
    console.log(userInfo);
    userInfo.course = userInfo.course.toLowerCase();

    addItem(userInfo, `result`)
      .then((_) => {
        console.log(_);
      })
      .catch((_) => console.log(_));
  };
  return (
    <section className="quizResult">
      <div className="heading">
        <h1>Create Result</h1>
      </div>
      <form onSubmit={allData}>
        <input
          type="text"
          placeholder="course name"
          name="course"
          onChange={currentV}
        />
        <input
          type="text"
          placeholder="Enter student name"
          name="name"
          onChange={currentV}
        />
        <input
          type="text"
          placeholder="Enter student father name"
          name="fatherName"
          onChange={currentV}
        />
        <input
          type="text"
          placeholder="Enter student roll no"
          name="rollNo"
          onChange={currentV}
        />
        <input
          type="number"
          placeholder="Enter student mark"
          name="mark"
          onChange={currentV}
        />
        <select name="result" onChange={currentV}>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>

        <button>Submit</button>
      </form>
    </section>
  );
}
