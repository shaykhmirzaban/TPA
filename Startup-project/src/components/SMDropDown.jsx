import "../style/SMDropDown.css";

export default function (props) {
  let { option, name, fnName, value } = props;
  return (
    <select name={name} onChange={fnName} value={value}>
      {option &&
        option.map((value, index) => {
          return (
            <option type={value} key={index}>
              {value}
            </option>
          );
        })}
    </select>
  );
}
