import { useEffect, useState } from "react";
import SMDropDown from "../../components/SMDropDown";
import SMInput from "../../components/SMInput";
import { addItem, getItem } from "../../config/FirebaseMethods";

import "../../style/studentRegisterForm.scss";

export default function StudentRegisterForm() {
  let [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    course: "",
    section: "",
    contact: "",
    cnic: "",
    fatherName: "",
    fatherCnic: "",
    fatherContact: "",
    emergyContact: "",
    dateOfBirth: "",
  });
  let [course, setCourse] = useState([]);
  let [section, setSection] = useState([]);

  useEffect(() => {
    getItem("Section&Course")
      .then((_) => {
        console.log(_);
        setCourse(_.courseList);
        setSection(_.sectionList);
      })
      .catch((_) => console.log(_));
  }, [0]);

  const currentV = (e) => {
    let { value, name } = e.target;
    setUserInfo((val) => {
      return { ...val, [name]: value };
    });
  };

  const userData = (e) => {
    e.preventDefault();

    let date = new Date();

    userInfo.age =
      date.getFullYear() - Number(userInfo.dateOfBirth.slice(0, 4));

    userInfo.registrationDate = date.toLocaleDateString();
    userInfo.registrationYear = String(date.getFullYear());

    userInfo.isFeeSubmited = false;
    userInfo.isApproved = false;
    userInfo.active = false;

    console.log(userInfo);

    addItem(userInfo, "StudentRegistration")
      .then((_) => {
        console.log(_);
        alert("Successfully registration");
      })
      .catch((_) => console.log(_));
  };

  return (
    <section className="StudentRegisterForm">
      <div className="heading">
        <h1>Student Register Form 👨‍🎓👩‍🎓</h1>
      </div>

      <form onSubmit={userData}>
        <div className="takeValue">
          <SMInput
            type="text"
            name="firstName"
            fnName={currentV}
            placeholder="Enter your first name"
            condition={true}
          />
          <SMInput
            type="text"
            name="lastName"
            fnName={currentV}
            placeholder="Enter your last name"
          />
          <SMDropDown
            option={course ?? "not available"}
            name="course"
            fnName={currentV}
            condition={true}
          />
          <SMDropDown
            option={section ?? "not available"}
            name="section"
            fnName={currentV}
            condition={true}
          />
          <SMInput
            type="number"
            placeholder="Enter your number"
            name="contact"
            fnName={currentV}
            condition={true}
          />
          <SMInput
            type="number"
            placeholder="Enter CNIC"
            name="cnic"
            fnName={currentV}
            condition={true}
          />
          <SMInput
            type="text"
            name="fatherName"
            placeholder="Enter your father name"
            fnName={currentV}
            condition={true}
          />
          <SMInput
            type="number"
            name="fatherCnic"
            placeholder="Enter father CNIC"
            fnName={currentV}
          />
          <SMInput
            type="number"
            placeholder="Father contact no"
            name="fatherContact"
            fnName={currentV}
            condition={true}
          />
          <SMInput
            type="number"
            placeholder="Father emergy contact no"
            name="emergyContact"
            fnName={currentV}
            condition={true}
          />
          <SMInput type="date" name="dateOfBirth" fnName={currentV} />
        </div>

        <div className="buttons">
          <button>Submit</button>
        </div>
      </form>
    </section>
  );
}
