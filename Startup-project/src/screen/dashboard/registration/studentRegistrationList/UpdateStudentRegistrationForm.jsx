import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SMDropDown from "../../../../components/SMDropDown";
import SMInput from "../../../../components/SMInput";
import {
  addItem,
  getItem,
  updateItem,
} from "../../../../config/FirebaseMethods";

// import "../";
export default function UpdateStudentRegistrationForm() {
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

  let location = useLocation();
  let data = location.state;

  useEffect(() => {
    getItem("Section&Course")
      .then((_) => {
        setCourse(_.courseList);
        setSection(_.sectionList);
      })
      .catch((_) => console.log(_));

    setUserInfo(data);
  }, [0]);

  const currentV = (e) => {
    let { value, name } = e.target;
    setUserInfo((val) => {
      return { ...val, [name]: value };
    });
  };

  const userData = (e) => {
    e.preventDefault();

    updateItem(userInfo, "StudentRegistration", userInfo.key)
      .then((_) => {
        alert("Successfully update");
      })
      .catch((_) => console.log(_));
  };

  return (
    <section className="update-student-registration-form">
      <div className="heading">
        <h1>Update Student Registration form</h1>
      </div>

      <form onSubmit={userData}>
        <div className="takeValue">
          <SMInput
            type="text"
            name="firstName"
            fnName={currentV}
            placeholder="Enter your first name"
            condition={true}
            value={userInfo.firstName}
          />
          <SMInput
            type="text"
            name="lastName"
            fnName={currentV}
            placeholder="Enter your last name"
            value={userInfo.lastName}
          />
          <SMDropDown
            option={course ?? "not available"}
            name="course"
            fnName={currentV}
            condition={true}
            value={userInfo.course}
          />
          <SMDropDown
            option={section ?? "not available"}
            name="section"
            fnName={currentV}
            condition={true}
            value={userInfo.section}
          />
          <SMInput
            type="number"
            placeholder="Enter your number"
            name="contact"
            fnName={currentV}
            condition={true}
            value={userInfo.contact}
          />
          <SMInput
            type="number"
            placeholder="Enter CNIC"
            name="cnic"
            fnName={currentV}
            condition={true}
            value={userInfo.cnic}
          />
          <SMInput
            type="text"
            name="fatherName"
            placeholder="Enter your father name"
            fnName={currentV}
            condition={true}
            value={userInfo.fatherName}
          />
          <SMInput
            type="number"
            name="fatherCnic"
            placeholder="Enter father CNIC"
            fnName={currentV}
            value={userInfo.fatherCnic}
          />
          <SMInput
            type="number"
            placeholder="Father contact no"
            name="fatherContact"
            fnName={currentV}
            condition={true}
            value={userInfo.fatherContact}
          />
          <SMInput
            type="number"
            placeholder="Father emergy contact no"
            name="emergyContact"
            fnName={currentV}
            condition={true}
            value={userInfo.emergyContact}
          />
          <SMInput
            type="date"
            name="dateOfBirth"
            fnName={currentV}
            value={userInfo.dateOfBirth}
          />
          <SMDropDown
            option={["yes", "no"]}
            name="active"
            fnName={currentV}
            value={userInfo.active}
          />
          <SMDropDown
            option={["yes", "no"]}
            name="isApproved"
            fnName={currentV}
            value={userInfo.isApproved}
          />
          <SMDropDown
            option={["yes", "no"]}
            name="isFeeSubmited"
            fnName={currentV}
            value={userInfo.isFeeSubmited}
          />
        </div>

        <button>Update</button>
      </form>
    </section>
  );
}
