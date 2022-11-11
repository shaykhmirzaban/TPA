import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getItem } from "../../config/FirebaseMethods";

// style
import "../../style/quizCategory.scss";

export default function QuizCategory() {
  let [data, setData] = useState([]);
  let navigate = useNavigate();
  
  useEffect(() => {
    getItem("quiz")
      .then((_) => setData(Object.values(_)))
      .catch((_) => console.log(_));
  }, [0]);

  return (
    <section className="quizCategory">
      <div className="heading">
        <h1>Quiz Category</h1>
      </div>

      <div className="box">
        {data.map((value, index) => {
          return (
            <div className="box1" key={index}>
              <img src={value.image} alt="image not found" width="300px" />
              <div className="description">
                <h1>{value.category}</h1>
                <p>{value.description}</p>

                <button onClick={() => navigate(`quiz-level/${value.key}`)}>
                  Start Quiz
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
