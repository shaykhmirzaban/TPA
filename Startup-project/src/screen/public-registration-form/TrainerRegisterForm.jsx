import { useState } from "react";
import SMInput from "../../components/SMInput";
import { addItem } from "../../config/FirebaseMethods";

// style
import "../../style/trainerRgisterForm.scss";

export default function TrainerRegisterForm() {
  let [trainerInfo, setTrainerInfo] = useState({
    firstName: "",
    lastName: "",
    qualification: "",
    contact: "",
    otherQualification: [],
  });
  let [listOfQualification, setListOfQualification] = useState("");
  let [arr, setArr] = useState([]);

  const currentV = (e) => {
    let { value, name } = e.target;
    setTrainerInfo((val) => {
      return { ...val, [name]: value };
    });
  };

  const addQuali = () => {
    setArr((val) => [...val, listOfQualification]);
  };

  const allData = () => {
    trainerInfo.otherQualification = arr;
    trainerInfo.coursesAllowed = "false";

    addItem(trainerInfo, "TrainerRegistration")
      .then((_) => {
        alert("Registration successfull");
      })
      .catch((_) => console.log(_));
  };

  const deleteItem = (e) => {
    setArr((val) => val.filter((value, index) => index !== e));
  };

  return (
    <section className="TrainerRegisterForm">
      <div className="heading">
        <h1>Trainer Register Form 👩‍🏫👨‍🏫</h1>
      </div>

      <form onSubmit={allData}>
        <div className="takeValue">
          <SMInput
            type="text"
            placeholder="Enter first Name"
            name="firstName"
            fnName={currentV}
          />
          <SMInput
            type="text"
            placeholder="Enter last Name"
            name="lastName"
            fnName={currentV}
          />
          <SMInput
            type="text"
            placeholder="Enter qualification"
            name="qualification"
            fnName={currentV}
          />
          <div className="otherQualification">

            {arr && (
              <ul>
                {arr.map((value, index) => {
                  return (
                    <div className="children" key={index}>
                      <li>{value}</li>
                      <button onClick={() => deleteItem(index)}>delete</button>
                    </div>
                  );
                })}
              </ul>
            )}

            <SMInput
              type="text"
              placeholder="Enter other qualification"
              name="listOfQualification"
              fnName={(e) => setListOfQualification(e.target.value)}
            />
            <button onClick={addQuali} type="button">
              Add
            </button>
          </div>

          <SMInput
            type="number"
            fnName={currentV}
            name="contact"
            placeholder="Enter contact no."
          />
        </div>

        <div className="buttons">
          <button>Submit</button>
        </div>
      </form>
    </section>
  );
}
