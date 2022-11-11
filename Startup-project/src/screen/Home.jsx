import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getItem } from "../config/FirebaseMethods";
import "../style/Home.scss";

export default function Home() {
  let [course, setCourse] = useState();
  let [quiz, setQuiz] = useState();
  let [studentRegistration, setStudentRegistration] = useState();
  let [trainerRegistration, setTrainerRegistration] = useState();
  let [data, setData] = useState([]);
  let [data1, setData1] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    getItem("course")
      .then((_) => {
        setCourse(Object.values(_));
      })
      .catch((_) => console.log(_));

    getItem("quiz")
      .then((_) => {
        setQuiz(Object.values(_));
      })
      .catch((_) => console.log(_));

    getItem("StudentRegistration")
      .then((_) => {
        setStudentRegistration(Object.values(_));
      })
      .catch((_) => console.log(_));

    getItem("TrainerRegistration")
      .then((_) => {
        setTrainerRegistration(Object.values(_));
      })
      .catch((_) => console.log(_));

    getItem("course")
      .then((_) => {
        let arr = Object.values(_).filter((value, index) => {
          if (value.isPubliclyOpen === "yes") {
            return value;
          }
        });
        setData(arr);
      })
      .catch((_) => console.log(_));

    getItem("quiz")
      .then((_) => setData1(Object.values(_)))
      .catch((_) => console.log(_));
  }, []);

  return (
    <section className="home">
      <div className="hero">
        <div className="leftSide">
          <h1>The Professional Academy</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore
            corporis, suscipit numquam corrupti ullam similique porro dolore
            laboriosam. Sapiente, consequuntur voluptate! Qui dolore sunt
            cupiditate quasi earum repellendus numquam expedita?
          </p>
          <button onClick={() => navigate("/course")}>Check Course</button>
        </div>
        <div className="rightSide1">
          <div className="image"></div>
        </div>
      </div>

      <div className="shortInfo">
        <div className="course1">
          <h1 className="heading">Courses</h1>
          <p>All our total courses so far.</p>
          <h1>
            {course &&
              (course.length > 0) & (course.length < 10) &&
              "0" + course.length}
          </h1>
          <h1>{course && course.length >= 10 && course.length}</h1>
        </div>

        <div className="quiz">
          <h1 className="heading">Quiz</h1>
          <p>Total Quiz</p>
          <h1>
            {quiz &&
              (quiz.length > 0) & (quiz.length < 10) &&
              "0" + quiz.length}
          </h1>
          <h1>{quiz && quiz.length >= 10 && quiz.length}</h1>
        </div>

        <div className="studentRegister">
          <h1 className="heading">Students</h1>
          <p>Total Student</p>
          <h1>
            {studentRegistration &&
              (studentRegistration.length > 0) &
                (studentRegistration.length < 10) &&
              "0" + studentRegistration.length}
          </h1>
          <h1>
            {studentRegistration &&
              studentRegistration.length >= 10 &&
              studentRegistration.length}
          </h1>
        </div>

        <div className="trainer">
          <h1 className="heading">Teacher</h1>
          <p>Total teacher</p>
          <h1>
            {trainerRegistration &&
              (trainerRegistration.length > 0) &
                (trainerRegistration.length < 10) &&
              "0" + trainerRegistration.length}
          </h1>
          <h1>
            {trainerRegistration &&
              trainerRegistration.length >= 10 &&
              trainerRegistration.length}
          </h1>
        </div>
      </div>

      <div className="courses">
        <div className="heading">
          <h1>Course</h1>
        </div>

        <div className="box">
          {data && data.length > 0 ? (
            data.map((value, index) => {
              return (
                <div
                  key={index}
                  className="box1"
                  onClick={() =>
                    navigate("course/course-detail", { state: value })
                  }
                >
                  <img src={value.image} alt="image not found" width="300px" />
                  <div className="description">
                    <h1>{value.courseName}</h1>
                    <p>Course duration: {value.courseDuration} Month</p>
                    <p>no. of Quiz: {value.noOfQuiz}</p>
                    <h2>RS {value.price}</h2>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Empty</p>
          )}
        </div>
      </div>

      <div className="quiz12">
        <div className="heading">
          <h1>Quiz</h1>
        </div>

        <div className="box">
          {data1 &&
            data1.map((value, index) => {
              return (
                <div className="box1" key={index}>
                  <img src={value.image} alt="image not found" width="300px" />
                  <div className="description">
                    <h1>{value.category}</h1>
                    <p>{value.description}</p>

                    <button
                      onClick={() => navigate(`quiz/quiz-level/${value.key}`)}
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="footer">
        <div className="parentFooter">
          <div className="box11">
            <div className="logo">
              <h1 onClick={() => navigate("/")}>TPA</h1>
              <p>The Professional Academy</p>
            </div>
            <p>0314-2255-345</p>
          </div>
          <div className="box12">
            <h1>Pages</h1>
            <ul>
              <li>
                <Link to={"course"}>Course</Link>
              </li>
              <li>
                <Link to={"quiz"}>Quiz</Link>
              </li>
              <li>
                <Link to={"result"}>Result</Link>
              </li>
              <li>
                <Link to={"login"}>Login</Link>
              </li>
              <li>
                <Link to={"sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
          <div className="box13">
            <h1>Registration Form</h1>
            <ul>
              <li>
                <Link to={"student-registration-form"}>
                  Student Registration Form
                </Link>
              </li>
              <li>
                <Link to={"trainer-registration-form"}>
                  Trainer Registration Form
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="childFooter">
          <h4>Copyright © 2022 TPA (The Professional Academy) All rights reserved</h4>

          <div className="goToTop">
            <a href="#"><i className="fa-solid fa-angle-up"></i></a>
          </div>
        </div>
      </div>
      
    </section>
  );
}
