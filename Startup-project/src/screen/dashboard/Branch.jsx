import { useEffect, useState } from "react";
import { deleteItem, getItem } from "../../config/FirebaseMethods";

export default function Branch() {
  let [data, setData] = useState([]);
  let [objKey, setObjKey] = useState([]);

  useEffect(() => {
    getItem("branch")
      .then((_) => {
        console.log(Object.values(_));
        setData(Object.values(_));

        setObjKey(Object.keys(Object.values(_)[0]));
      })
      .catch((_) => {
        console.log(_);
      });
  }, [0]);

  const deleteItem12 = (value, index) => {
    deleteItem("branch", value.key)
      .then((_) => {
        console.log(_);
        setData((val) => val.filter((value, inx) => inx !== index));
      })
      .catch((_) => console.log(_));
  };

  return (
    <section className="Branch">
      <div className="heading">
        <h1>Branch</h1>
      </div>

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            {objKey &&
              objKey.length > 0 &&
              objKey.map((value, index) => {
                return <th key={index}>{value}</th>;
              })}
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{value.cityCode}</td>
                <td>{value.cityName}</td>
                <td>{value.countryCode}</td>
                <td>{value.countryName}</td>
                <td>{value.currency}</td>
                <td>{value.key}</td>
                <td>
                  <button onClick={() => deleteItem12(value, index)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
