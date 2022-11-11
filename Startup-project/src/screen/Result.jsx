import { useEffect, useState } from "react";
import { getItem } from "../config/FirebaseMethods";

// style
import "../style/courseResult.scss";

export default function ShowResultHome() {
  let [data, setData] = useState([]);
  let [sortCourse, setSortCourse] = useState([]);
  let [sortName, setSortName] = useState([]);
  let [sortData, setSortData] = useState([]);

  useEffect(() => {
    getItem("result")
      .then((_) => {
        let obj = Object.values(_);
        setData(obj);

        let uniqueCource = obj.map((value) => {
          return value.course;
        });
        let sortingItem = [...new Set(uniqueCource)];
        setSortCourse(sortingItem);
      })
      .catch((_) => {
        console.log(_);
      });
  }, []);

  const searchValue = (e) => {
    let { value } = e.target;
    let arr = data.filter((val, index) => {
      if (val.course === value) {
        return val;
      }
    });
    setSortName(arr);
  };

  const sortItemByName = () => {
    let searchArea = document.querySelector(".searchArea");
    let a = sortName.filter((val, index) => val.name === searchArea.value);
    setSortData(a);
  };

  return (
    <section className="CourseResult">
      <div className="heading">
        <h1>Result</h1>
      </div>

      <div className="sort">
        <div className="heading">
          <h1>Sorting</h1>
        </div>

        <div className="form">
          <select name="unique value" onChange={searchValue}>
            <option value="">--Please choose an option--</option>
            {sortCourse &&
              sortCourse.length > 0 &&
              sortCourse.map((value, index) => {
                return (
                  <option value={value} key={index}>
                    {value}
                  </option>
                );
              })}
          </select>

          <input
            type="search"
            placeholder="Sorting by name"
            className="searchArea"
          />
          <button onClick={sortItemByName}>Search</button>
        </div>

        {sortData && sortData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Roll no</th>
                <th>Course</th>
                <th>Name</th>
                <th>Father Name</th>
                <th>Mark</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {sortData &&
                sortData.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{value.rollNo}</td>
                      <td>{value.course}</td>
                      <td>{value.name}</td>
                      <td>{value.fatherName}</td>
                      <td>{value.mark}</td>
                      <td>{value.result}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <p>Data not found</p>
        )}
      </div>

      <div className="allData">
        <div className="heading">
          <h1>All Result</h1>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
