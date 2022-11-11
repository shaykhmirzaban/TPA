import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItem } from "../../config/FirebaseMethods";

// style
import "../../style/quizLevel.scss";

export default function QuizLevel() {
  let navigate = useNavigate();
  let { id } = useParams();
  let [data, setData] = useState([]);

  useEffect(() => {
    getItem("levels", id)
      .then((_) => setData(Object.values(_)))
      .catch((_) => console.log(_));
  }, [0]);

  return (
    <section className="quizLevel">
      <div className="heading">
        <h1>Quiz Level</h1>
      </div>

      {data.map((value, index) => {
        return (
          <div className="box" key={index}>
            <div className="box1">
              <div className="description">
                <h1>{value.level01.name}</h1>
                <h4>
                  Total Question:{" "}
                  <span style={{ color: "#a43af8" }}>
                    {Number(value.level01.totalQuestion) < 10
                      ? `0${value.level01.totalQuestion}`
                      : value.level01.totalQuestion}
                  </span>
                </h4>
                <h4>
                  Total Mark:{" "}
                  <span style={{ color: "#a43af8" }}>
                    {Number(value.level01.totalMark) < 10
                      ? `0${value.level01.totalMark}`
                      : value.level01.totalMark}
                  </span>
                </h4>
                <h4>
                  Total Time:{" "}
                  <span style={{ color: "#a43af8" }}>
                    {Number(value.level01.totalTime) < 10
                      ? `0${value.level01.totalTime}`
                      : value.level01.totalTime}
                  </span>
                </h4>
                <button
                  onClick={() =>
                    navigate("/quiz/display-quiz", {
                      state: value.level01,
                    })
                  }
                >
                  Start Quiz
                </button>
              </div>
            </div>
            <div className="box1">
              <div className="description">
                <h1>{value.level02.name}</h1>
                <h4>
                  Total Question:{" "}
                  <span style={{ color: "#a43af8" }}>
                    {Number(value.level02.totalQuestion) < 10
                      ? `0${value.level02.totalQuestion}`
                      : value.level02.totalQuestion}
                  </span>
                </h4>
                <h4>
                  Total Mark:{" "}
                  <span style={{ color: "#a43af8" }}>
                    {Number(value.level02.totalMark) < 10
                      ? `0${value.level02.totalMark}`
                      : value.level02.totalMark}
                  </span>
                </h4>
                <h4>
                  Total Time:{" "}
                  <span style={{ color: "#a43af8" }}>
                    {Number(value.level02.totalTime) < 10
                      ? `0${value.level02.totalTime}`
                      : value.level02.totalTime}
                  </span>
                </h4>

                <button
                  onClick={() =>
                    navigate("/quiz/display-quiz", {
                      state: value.level02,
                    })
                  }
                >
                  Start Quiz
                </button>
              </div>
            </div>
            <div className="box1">
              <div className="description">
                <h1>{value.level03.name}</h1>
                <h4>
                  Total Question:{" "}
                  <span style={{ color: "#a43af8" }}>
                    {Number(value.level03.totalQuestion) < 10
                      ? `0${value.level03.totalQuestion}`
                      : value.level03.totalQuestion}
                  </span>
                </h4>
                <h4>
                  Total Mark:{" "}
                  <span style={{ color: "#a43af8" }}>
                    {Number(value.level03.totalMark) < 10
                      ? `0${value.level03.totalMark}`
                      : value.level03.totalMark}
                  </span>
                </h4>
                <h4>
                  Total Time:{" "}
                  <span style={{ color: "#a43af8" }}>
                    {Number(value.level03.totalTime) < 10
                      ? `0${value.level03.totalTime}`
                      : value.level03.totalTime}
                  </span>
                </h4>

                <button
                  onClick={() =>
                    navigate("/quiz/display-quiz", {
                      state: value.level03,
                    })
                  }
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
