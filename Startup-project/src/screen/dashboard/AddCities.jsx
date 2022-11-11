import { useEffect } from "react";
import { useState } from "react";
import { addItem, getItem } from "../../config/FirebaseMethods";

export default function AddCities() {
  let [data, setData] = useState({
    cityName: "",
    cityCode: "",
  });
  let [item, setItems] = useState([]);
  let [countryCode, setCountryCode] = useState("");

  const currentV = (e) => {
    let { value, name } = e.target;

    setData((val) => {
      return { ...val, [name]: value };
    });
  };

  let obj = item.find((value, index) => {
    if(value.countryCode === countryCode) {
      return value;
    }
  });

  const addCities = (e) => {
    e.preventDefault();
    console.log(data);
    addItem(data, "city")
      .then((_) => console.log(_))
      .catch((_) => console.log(_));

    addItem({ ...data, ...obj }, "branch")
      .then((_) => console.log(_))
      .catch((_) => console.log(_));
  };

  const getCountry = () => {
    getItem("country")
      .then((_) => {
        console.log(_);
        setItems(Object.values(_));
      })
      .catch((_) => console.log(_));
  };

  useEffect(() => {
    getCountry();
  }, [0]);

  console.log(item);

  return (
    <section className="AddCities">
      <div className="heading">
        <h1>Add Cities</h1>
      </div>

      <form onSubmit={addCities}>
        <select
          name="countryCode"
          onChange={(e) => {
            setCountryCode(e.target.value);
          }}
        >
          {item &&
            item.length > 0 &&
            item.map((value, index) => {
              return (
                <option value={value.countryCode} key={index}>
                  {value.countryCode}
                </option>
              );
            })}
        </select>

        <input
          type="text"
          name="cityName"
          placeholder="Enter City Name"
          onChange={currentV}
        />
        <input
          type="text"
          name="cityCode"
          placeholder="Enter city code"
          onChange={currentV}
        />

        <button>Add City</button>
      </form>
    </section>
  );
}
