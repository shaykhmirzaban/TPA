import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addItem } from "../../config/FirebaseMethods";

// style
import "../../style/courseDetail.scss";

export default function CourseDetail() {
  let [data, setData] = useState([]);
  let [item, setItem] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    course: "",
  });
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    setData(location.state);
  }, []);

  const currentV = (e) => {
    let { value, name } = e.target;
    setItem((val) => {
      return { ...val, [name]: value };
    });
  };

  const userInfo = (e) => {
    e.preventDefault();

    item.course = data.courseName;
    item.admissionStart = data.admissionStart;
    item.admissionEnd = data.admissionEnd;

    addItem(item, "enrolledStudent")
      .then((_) => console.log(_))
      .catch((_) => console.log(_));
  };

  return (
    <section className="courseDetail">
      {data && (
        <div className="detail">
          <div className="courseDescription">
            <div className="course-detail">
              <h1>{data.courseName}</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Accusantium vero blanditiis molestias a sed asperiores
                aspernatur
              </p>
            </div>

            <div className="courseDuration">
              <h4>
                Course Duration:{" "}
                <span style={{ color: "#a43af8" }}>
                  {data.courseDuration} Month{" "}
                </span>
              </h4>
            </div>

            <div className="noOfQuiz">
              <h4>
                no. Of Quiz:{" "}
                <span style={{ color: "#a43af8" }}>
                  {Number(data.noOfQuiz) < 10
                    ? `0${data.noOfQuiz}`
                    : data.noOfQuiz}
                </span>
              </h4>
            </div>

            <div className="leadTrainer">
              <h4>
                Lead Trainer:{" "}
                <span style={{ color: "#a43af8" }}>{data.leadTrainer}</span>
              </h4>
            </div>

            <div className="assistantTrainer">
              <h4>Assistant Trainer</h4>
              <ul>
                {data.assistantTrainer &&
                  data.assistantTrainer.map((value, index) => (
                    <li key={index} style={{ color: "#a43af8" }}>
                      {value}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="courseImage">
            <img src={data.image} alt="image not found" />
          </div>
        </div>
      )}

      <div className="courseForm">
        <div className="heading">
          <h1>Course Form</h1>
        </div>
        <form onSubmit={userInfo}>
          <input
            type="text"
            placeholder="Enter first Name"
            name="firstName"
            onChange={currentV}
          />
          <input
            type="text"
            placeholder="Enter last name"
            name="lastName"
            onChange={currentV}
          />
          <input
            type="email"
            placeholder="Student Email"
            name="email"
            onChange={currentV}
          />
          <input
            type="number"
            placeholder="Enter phone no"
            name="phone"
            onChange={currentV}
          />
          <input
            type="text"
            placeholder="Street Address"
            name="address"
            onChange={currentV}
          />
          <select name="city" onChange={currentV}>
            {data &&
              data.cities &&
              data.cities.length > 0 &&
              data.cities.map((value, index) => {
                return (
                  <option value={value} key={index}>
                    {value}
                  </option>
                );
              })}
          </select>
          <input
            type="text"
            placeholder="Enter Zip code"
            name="zipCode"
            onChange={currentV}
          />

          <input
            type="text"
            placeholder="Enter course name"
            value={data && data.courseName}
            disabled
            className="subjectName"
          />

          <div className="button">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
}
