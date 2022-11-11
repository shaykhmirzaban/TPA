import { useState } from "react";
import { useParams } from "react-router-dom";
import { addItem } from "../../../config/FirebaseMethods";

// style
import "../../../style/createLevel.scss";

export default function AddLevel() {
  let [level1, setLevel1] = useState({
    totalQuestion: "",
    totalTime: "",
    totalMark: "",
  });
  let [level2, setLevel2] = useState({
    totalQuestion: "",
    totalTime: "",
    totalMark: "",
  });
  let [level3, setLevel3] = useState({
    totalQuestion: "",
    totalTime: "",
    totalMark: "",
  });

  let [obj, setObj] = useState({});

  let [flag1, setFlag1] = useState(false);
  let [flag2, setFlag2] = useState(false);
  let [flag3, setFlag3] = useState(false);

  let [question1Add, setQuestion1Add] = useState({
    question: "",
    answer: "",
  });

  let [optionValue, setOptionValue] = useState("");
  let [optionValue1, setOptionValue1] = useState("");
  let [optionValue2, setOptionValue2] = useState("");

  let [question1AddOption, setQuestion1AddOption] = useState([]);
  let [question2AddOption, setQuestion2AddOption] = useState([]);
  let [question3AddOption, setQuestion3AddOption] = useState([]);

  let [totalQuestion, setTotalQuestion] = useState([]);
  let [totalQuestion1, setTotalQuestion1] = useState([]);
  let [totalQuestion2, setTotalQuestion2] = useState([]);

  let { id } = useParams();

  const currentV = (e) => {
    let { value, name } = e.target;
    setLevel1((val) => {
      return { ...val, [name]: value };
    });
    console.log("currentV");
  };

  const basicLevel = (e) => {
    e.preventDefault();
    level1.questions = totalQuestion;
    level1.name = "Basic Level";
    console.log(level1);
    setFlag1(true);
    obj.level01 = level1;
  };

  const currentV1 = (e) => {
    let { value, name } = e.target;
    setLevel2((val) => {
      return { ...val, [name]: value };
    });
  };

  const intermediateLevel = () => {
    level2.questions = totalQuestion1;
    level2.name = "Intermediate Level";
    console.log(level2);
    setFlag2(true);
    obj.level02 = level2;
  };

  const currentV2 = (e) => {
    let { value, name } = e.target;
    setLevel3((val) => {
      return { ...val, [name]: value };
    });
  };

  const advanceLevel = () => {
    level3.questions = totalQuestion2;
    level3.name = "Advance Level";
    console.log(level3);
    setFlag3(true);
    obj.level03 = level3;
  };

  const completeData = () => {
    addItem(obj, `levels/${id}`)
      .then((_) => alert(_))
      .catch((_) => console.log(_));
  };

  const addQuestion = () => {
    question1Add.option = question1AddOption;
    setTotalQuestion((val) => [...val, question1Add]);
    console.log(totalQuestion);
    setQuestion1Add({
      question: "",
      answer: "",
    });
    setOptionValue("");
    setQuestion1AddOption([]);
  };

  const addOptionInArr = () => {
    setQuestion1AddOption((val) => [...val, optionValue]);
    console.log("question add");
  };

  const addQuestion1 = () => {
    question1Add.option = question2AddOption;
    setTotalQuestion1((val) => [...val, question1Add]);
    console.log(totalQuestion);
    setQuestion1Add({
      question: "",
      answer: "",
    });
    setOptionValue1("");
    setQuestion2AddOption([]);
  };

  const addOptionInArr1 = () => {
    setQuestion2AddOption((val) => [...val, optionValue1]);
    console.log("question add");
  };

  const addOptionInArr2 = () => {
    setQuestion3AddOption((val) => [...val, optionValue2]);
    console.log("question add");
  };

  const addQuestion2 = () => {
    question1Add.option = question3AddOption;
    setTotalQuestion2((val) => [...val, question1Add]);
    console.log(totalQuestion2);
    setQuestion1Add({
      question: "",
      answer: "",
    });
    setOptionValue2("");
    setQuestion3AddOption([]);
  };

  return (
    <section className="add-level" style={{ overflowX: "hidden" }}>
      <div className="heading">
        <h1>Add Level</h1>
      </div>

      {/* basic level */}
      <div className="basic">
        <div className="heading">
          <h3>Add Level: 01</h3>
          <h4>Basic Level</h4>
        </div>
        <div className="questionAdd">
          <form>
            <input
              type="text"
              placeholder="Enter question"
              name="question"
              onChange={(e) => {
                setQuestion1Add((val) => {
                  return { ...val, [e.target.name]: e.target.value };
                });
              }}
              disabled={flag1}
            />
            <input
              type="text"
              placeholder="enter correct answer"
              name="answer"
              onChange={(e) => {
                setQuestion1Add((val) => {
                  return { ...val, [e.target.name]: e.target.value };
                });
              }}
              disabled={flag1}
            />
            <br />
            <div className="displayQuestion">
              <ul>
                {question1AddOption &&
                  question1AddOption.map((value, index) => {
                    return <li key={index}>{value}</li>;
                  })}
              </ul>
            </div>
            <input
              type="text"
              placeholder="enter option"
              name="addOption"
              onChange={(e) => {
                setOptionValue(e.target.value);
              }}
              disabled={flag1}
            />
            <button type="button" onClick={addOptionInArr} disabled={flag1}>
              Add Option
            </button>

            <div className="buttons">
              <button type="button" onClick={addQuestion} disabled={flag1}>
                add question
              </button>
            </div>

            <ul>
              {totalQuestion &&
                totalQuestion.map((value, index) => {
                  return (
                    <li key={index}>
                      <p>{value.question}</p>
                      <p>{value.answer}</p>
                      <ul>
                        {value.option &&
                          value.option.map((value, index) => {
                            return <li key={index}>{value}</li>;
                          })}
                      </ul>
                    </li>
                  );
                })}
            </ul>
            
          </form>
        </div>
        <form onSubmit={basicLevel}>
          <input
            type="number"
            placeholder="How many question"
            name="totalQuestion"
            onChange={currentV}
            disabled={flag1}
          />
          <input
            type="number"
            placeholder="How many time"
            name="totalTime"
            onChange={currentV}
            disabled={flag1}
          />
          <input
            type="number"
            placeholder="Enter total mark"
            name="totalMark"
            onChange={currentV}
            disabled={flag1}
          />

          <button type="button" disabled={flag1}>
            Add
          </button>
        </form>
      </div>

      {/* intermediate level */}
      <div className="heading">
        <h3>Add Level: 02</h3>
        <h4>Intermediate Level</h4>
      </div>

      <div className="intermediate">
        <div className="displayQuestion">
          <ul>
            {question2AddOption &&
              question2AddOption.map((value, index) => {
                return <li key={index}>{value}</li>;
              })}
          </ul>

          <ul>
            {totalQuestion1 &&
              totalQuestion1.map((value, index) => {
                return (
                  <li key={index}>
                    <p>{value.question}</p>
                    <p>{value.answer}</p>
                    <ul>
                      {value.option &&
                        value.option.map((value, index) => {
                          return <li key={index}>{value}</li>;
                        })}
                    </ul>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="questionAdd">
          <input
            type="text"
            placeholder="Enter question"
            name="question"
            onChange={(e) => {
              setQuestion1Add((val) => {
                return { ...val, [e.target.name]: e.target.value };
              });
            }}
            disabled={flag2}
          />
          <input
            type="text"
            placeholder="enter correct answer"
            name="answer"
            onChange={(e) => {
              setQuestion1Add((val) => {
                return { ...val, [e.target.name]: e.target.value };
              });
            }}
            disabled={flag2}
          />
          <input
            type="text"
            placeholder="enter option"
            name="addOption"
            onChange={(e) => {
              setOptionValue1(e.target.value);
            }}
            disabled={flag2}
          />
          <button onClick={addOptionInArr1} disabled={flag2}>
            Add Option
          </button>

          <button onClick={addQuestion1} disabled={flag2}>
            add question
          </button>
        </div>

        <input
          type="number"
          placeholder="How many question"
          name="totalQuestion"
          onChange={currentV1}
          disabled={flag2}
        />
        <input
          type="number"
          placeholder="How many time"
          name="totalTime"
          onChange={currentV1}
          disabled={flag2}
        />
        <input
          type="number"
          placeholder="Enter total mark"
          name="totalMark"
          onChange={currentV1}
          disabled={flag2}
        />

        <button onClick={intermediateLevel} disabled={flag2}>
          Add
        </button>
      </div>

      {/* advance level */}
      <div className="heading">
        <h3>Add Level: 03</h3>
        <h4>Advance Level</h4>
      </div>

      <div className="advance">
        <div className="displayQuestion">
          <ul>
            {question3AddOption &&
              question3AddOption.map((value, index) => {
                return <li key={index}>{value}</li>;
              })}
          </ul>

          <ul>
            {totalQuestion2 &&
              totalQuestion2.map((value, index) => {
                return (
                  <li key={index}>
                    <p>{value.question}</p>
                    <p>{value.answer}</p>
                    <ul>
                      {value.option &&
                        value.option.map((value, index) => {
                          return <li key={index}>{value}</li>;
                        })}
                    </ul>
                  </li>
                );
              })}
          </ul>
        </div>

        <div className="questionAdd">
          <input
            type="text"
            placeholder="Enter question"
            name="question"
            onChange={(e) => {
              setQuestion1Add((val) => {
                return { ...val, [e.target.name]: e.target.value };
              });
            }}
            disabled={flag3}
          />
          <input
            type="text"
            placeholder="enter correct answer"
            name="answer"
            onChange={(e) => {
              setQuestion1Add((val) => {
                return { ...val, [e.target.name]: e.target.value };
              });
            }}
            disabled={flag3}
          />
          <input
            type="text"
            placeholder="enter option"
            name="addOption"
            onChange={(e) => {
              setOptionValue2(e.target.value);
            }}
            disabled={flag3}
          />
          <button onClick={addOptionInArr2} disabled={flag3}>
            Add Option
          </button>

          <button onClick={addQuestion2} disabled={flag3}>
            add question
          </button>
        </div>

        <input
          type="number"
          placeholder="How many question"
          name="totalQuestion"
          onChange={currentV2}
          disabled={flag3}
        />
        <input
          type="number"
          placeholder="How many time"
          name="totalTime"
          onChange={currentV2}
          disabled={flag3}
        />
        <input
          type="number"
          placeholder="Enter total mark"
          name="totalMark"
          onChange={currentV2}
          disabled={flag3}
        />

        <button onClick={advanceLevel} disabled={flag3}>
          Add
        </button>
      </div>

      <button onClick={completeData}>Submit</button>
    </section>
  );
}
