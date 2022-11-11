import { useEffect } from "react";
import { useState } from "react";
import { addItemWithoutKey, getItem } from "../../config/FirebaseMethods";

import "../../style/studentRegistrationCourseAndSec.scss";

export default function StudentRegistrationCourseAndSec() {
  let [currentCourse, setCurrentCourse] = useState("");
  let [currentSec, setCurrentSec] = useState("");
  let [courseList, setCourseList] = useState([]);
  let [sectionList, setSectionList] = useState([]);
  let [wating, setWating] = useState("");

  useEffect(() => {
    getItem("Section&Course")
      .then((_) => {
        let arr = Object.values(_);
        console.log(arr);
        setCourseList(arr[0]);
        setSectionList(arr[1]);
      })
      .catch((_) => {
        console.log(_);
      });
  }, [0]);

  const addCourse = () => {
    setCourseList((val) => [...val, currentCourse]);
  };
  const addSection = () => {
    setSectionList((val) => [...val, currentSec]);
  };

  const deleteItem = (e) => {
    setCourseList((val) => val.filter((value, index) => index !== e));
  };
  const deleteItem1 = (e) => {
    setSectionList((val) => val.filter((value, index) => index !== e));
  };
  const submiteData = () => {
    setWating("waiting...");

    addItemWithoutKey({ courseList, sectionList }, "Section&Course")
      .then((_) => {
        alert(_);
        setWating("");
      })
      .catch((_) => {
        alert(_);
        setWating("");
      });
  };

  return (
    <section className="student-registration-course-and-sec">
      <div className="heading">
        <h1>Student Registration form Course and Section control.</h1>
      </div>

      {courseList && (
        <ul>
          {courseList.map((value, index) => {
            return (
              <div key={index}>
                <li>{value}</li>
                <button onClick={() => deleteItem(index)}>Delete</button>
              </div>
            );
          })}
        </ul>
      )}

      <input
        type="text"
        placeholder="add course"
        name="course"
        onChange={(e) => setCurrentCourse(e.target.value)}
      />
      <button onClick={addCourse}>add</button>

      {sectionList && (
        <ul>
          {sectionList.map((value, index) => {
            return (
              <div key={index}>
                <li>{value}</li>
                <button onClick={() => deleteItem1(index)}>Delete</button>
              </div>
            );
          })}
        </ul>
      )}

      <input
        type="text"
        placeholder="add section"
        name="sec"
        onChange={(e) => setCurrentSec(e.target.value)}
      />

      <button onClick={addSection}>add</button>

      <hr />
      {wating ? (
        <button>{wating}</button>
      ) : (
        <button onClick={submiteData}>Submit</button>
      )}
    </section>
  );
}
