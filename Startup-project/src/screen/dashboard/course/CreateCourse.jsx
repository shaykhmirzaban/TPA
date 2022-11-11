import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../../config/FirebaseMethods";

import "../../../style/createCourse.scss";

export default function CreateCourse() {
  let [currentImage, setCurrentImage] = useState("");
  let [data, setData] = useState({
    courseName: "",
    courseDuration: "",
    noOfQuiz: "",
    price: "",
    leadTrainer: "",
    isPubliclyOpen: "",
    admissionStart: "",
    admissionEnd: "",
  });
  let [wating, setWating] = useState("");
  let navigate = useNavigate();
  let [currentA, setCurrentA] = useState("");
  let [addAssistant, setAddAssistant] = useState([]);
  let [city, setCity] = useState("");
  let [cityarr, setCityArr] = useState([]);

  const currentV = (e) => {
    let { value, name } = e.target;
    setData((val) => {
      return { ...val, [name]: value };
    });
  };

  const currentAssistant = (e) => {
    let { value } = e.target;
    setCurrentA(value);
  };

  const addItem = () => {
    setAddAssistant((value) => {
      return [...value, currentA];
    });
  };

  const uploadImage12 = (e) => {
    e.preventDefault();

    data.assistantTrainer = addAssistant;
    data.cities = cityarr;

    setWating("wating...");

    console.log(currentImage);

    uploadImage(currentImage, "images", data, "course")
      .then((_) => {
        console.log(_);
        setWating("");
        alert("Successfully Added");
      })
      .catch((_) => console.log(_));
  };

  const addCities = () => {
    setCityArr((val) => [...val, city]);
  };

  return (
    <section className="home">
      <form onSubmit={uploadImage12}>
        <input
          type="text"
          name="courseName"
          placeholder="Enter Course Name"
          onChange={currentV}
        />
        <input
          type="number"
          name="courseDuration"
          placeholder="Enter course duration"
          onChange={currentV}
        />
        <input
          type="number"
          name="noOfQuiz"
          placeholder="Enter no of quiz"
          onChange={currentV}
        />
        <input
          type="number"
          name="price"
          placeholder="Enter price in rupees"
          onChange={currentV}
        />
        <input
          type="text"
          name="leadTrainer"
          placeholder="lead trainer"
          onChange={currentV}
        />

        {addAssistant && (
          <ul>
            {addAssistant.length > 0
              ? addAssistant.map((value, index) => {
                  return <p key={index}>{value}</p>;
                })
              : null}
          </ul>
        )}

        <input
          type="text"
          placeholder="add Assitant Trainers"
          onChange={currentAssistant}
        />
        <button type="button" onClick={addItem} className="assistantAdd">
          Add Assistant
        </button>

        <h4>Is course publicaly open?</h4>
        <select name="isPubliclyOpen" onChange={currentV}>
          <option value="yes">yes</option>
          <option value="no">no</option>
        </select>

        {cityarr && (
          <ul>
            {cityarr.map((value, index) => {
              return <li key={index}>{value}</li>;
            })}
          </ul>
        )}

        <h4>Open in Cities</h4>
        <input
          type="text"
          placeholder="Enter cities name"
          name="city"
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="button" onClick={addCities}>
          Add
        </button>

        <h4>date of admission start</h4>
        <input type="date" name="admissionStart" onChange={currentV} />

        <h4>Date of admission end</h4>
        <input type="date" name="admissionEnd" onChange={currentV} />

        <input
          type="file"
          onChange={(e) => setCurrentImage(e.target.files[0])}
        />
        {wating ? (
          <button>{wating}</button>
        ) : (
          <button className="addCourse">Add Course</button>
        )}
      </form>
    </section>
  );
}
