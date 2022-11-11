import { useState } from "react";
import { addItem } from "../../config/FirebaseMethods";

export default function AddCountries() {
  let [data, setData] = useState({
    countryName: "",
    countryCode: "",
    currency: "",
  });

  const currentV = (e) => {
    let { value, name } = e.target;
    setData((val) => {
      return { ...val, [name]: value };
    });
  };

  const addCountry = (e) => {
    e.preventDefault();
    console.log(data);
    addItem(data, "country")
      .then((_) => {
        console.log(_);
      })
      .catch((_) => console.log(_));
  };
  return (
    <section className="AddCountries">
      <div className="heading">
        <h1>Add Countries</h1>
      </div>

      <form onSubmit={addCountry}>
        <input
          type="text"
          name="countryName"
          placeholder="Enter Country Name"
          onChange={currentV}
        />
        <input
          type="text"
          name="countryCode"
          placeholder="Enter country code"
          onChange={currentV}
        />
        <input
          type="text"
          name="currency"
          placeholder="Enter Currency"
          onChange={currentV}
        />

        <button>Add Country</button>
      </form>
    </section>
  );
}
