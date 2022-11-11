import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateItem, uploadImage } from "../../../config/FirebaseMethods";

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
  });
  let [wating, setWating] = useState("");
  let navigate = useNavigate();
  let [currentA, setCurrentA] = useState("");
  let [addAssistant, setAddAssistant] = useState([]);

  let location = useLocation();
  useEffect(() => {
    setData(location.state);
    setAddAssistant(location.state.assistantTrainer);
    setCurrentImage(location.state.image);
  }, [0]);

  const currentV = (e) => {
    let { value, name } = e.target;
    setData((val) => {
      return { ...val, [name]: value };
    });
  };

  const currentAssistant = (e) => {
    let { value } = e.target;
    setCurrentA(value);
    console.log(e.target.value);
  };

  const addItem = () => {
    setAddAssistant((value) => {
      return [...value, currentA];
    });
  };

  const uploadImage12 = (e) => {
    e.preventDefault();

    data.assistantTrainer = addAssistant;

    setWating("wating...");

    // console.log(currentImage);

    // uploadImage(currentImage, "images", data, "course")
    //   .then((_) => {
    //     console.log(_);
    //     setWating("");
    //     alert("Successfully Added");
    //   })
    //   .catch((_) => console.log(_));

    updateItem(data, "course", data.key)
      .then((_) => {
        console.log(_);
        setWating("");
        alert("Successfully updated");
      })
      .catch((_) => console.log(_));
  };

  const deleteItem = (e) => {
    setAddAssistant((val) => val.filter((value, index) => index !== e));
  };

  return (
    <section className="home">
      <input
        type="text"
        name="courseName"
        placeholder="Enter Course Name"
        value={data.courseName}
        onChange={currentV}
      />
      <input
        type="number"
        name="courseDuration"
        placeholder="Enter course duration"
        value={data.courseDuration}
        onChange={currentV}
      />
      <input
        type="number"
        name="noOfQuiz"
        placeholder="Enter no of quiz"
        value={data.noOfQuiz}
        onChange={currentV}
      />
      <input
        type="number"
        name="price"
        placeholder="Enter price in rupees"
        value={data.price}
        onChange={currentV}
      />
      <input
        type="text"
        name="leadTrainer"
        placeholder="lead trainer"
        value={data.leadTrainer}
        onChange={currentV}
      />

      {addAssistant && (
        <ul>
          {addAssistant.length > 0
            ? addAssistant.map((value, index) => {
                return (
                  <>
                    <p key={index}>{value}</p>
                    <button onClick={() => deleteItem(index)}>delete</button>
                  </>
                );
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
      <select
        name="isPubliclyOpen"
        onChange={currentV}
        value={data.isPubliclyOpen}
      >
        <option value="yes">yes</option>
        <option value="no">no</option>
      </select>

      {/* <input
          type="file"
          onChange={(e) => setCurrentImage(e.target.files[0])}
        /> */}

      {wating ? (
        <button>{wating}</button>
      ) : (
        <button className="addCourse" onClick={uploadImage12}>
          Update Course
        </button>
      )}
    </section>
  );
}
