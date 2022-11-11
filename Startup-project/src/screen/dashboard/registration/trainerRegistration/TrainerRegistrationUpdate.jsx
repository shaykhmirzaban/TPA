import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SMDropDown from "../../../../components/SMDropDown";
import SMInput from "../../../../components/SMInput";
import { addItem, updateItem } from "../../../../config/FirebaseMethods";

import "../../../../style/trainerRgisterForm.scss";

export default function TrainerRegistrationUpdate() {
  let [trainerInfo, setTrainerInfo] = useState({
    firstName: "",
    lastName: "",
    qualification: "",
    contact: "",
    otherQualification: [],
  });
  let [listOfQualification, setListOfQualification] = useState("");
  let [arr, setArr] = useState([]);
  let location = useLocation();

  let data = location.state;

  useEffect(() => {
    setTrainerInfo(data);
    setArr(data.otherQualification);
  }, [0]);

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

    updateItem(trainerInfo, "TrainerRegistration", trainerInfo.key)
      .then((_) => {
        alert("Registration Update");
      })
      .catch((_) => console.log(_));
  };

  const deleteItem = (e) => {
    setArr((val) => val.filter((value, index) => index !== e));
  };

  return (
    <section className="TrainerRegisterForm">
      <div className="heading">
        <h1>Trainer Register Update</h1>
      </div>

      <div className="takeValue">
        <SMInput
          type="text"
          placeholder="Enter your first Name"
          name="firstName"
          fnName={currentV}
          value={trainerInfo.firstName}
        />
        <SMInput
          type="text"
          placeholder="Enter your last Name"
          name="lastName"
          fnName={currentV}
          value={trainerInfo.lastName}
        />
        <SMInput
          type="text"
          placeholder="Enter your qualification"
          name="qualification"
          fnName={currentV}
          value={trainerInfo.qualification}
        />
        <div className="otherQualification">
          {arr && (
            <ul>
              {arr.map((value, index) => {
                return (
                  <div key={index}>
                    <li key={index}>{value}</li>
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
          <button onClick={addQuali}>Add</button>
        </div>
        <SMInput
          type="number"
          fnName={currentV}
          name="contact"
          placeholder="Enter your contact no."
          value={trainerInfo.contact}
        />
        <SMDropDown
          option={["true", "false"]}
          name="coursesAllowed"
          fnName={currentV}
          value={trainerInfo.coursesAllowed}
        />
      </div>

      <button onClick={allData}>Update</button>
    </section>
  );
}
