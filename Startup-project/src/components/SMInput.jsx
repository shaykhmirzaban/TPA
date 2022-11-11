import "../style/SMInput.css";

export default function SMInput(props) {
  let { type, placeholder, name, fnName, condition, value } = props;
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={fnName}
      required={condition}
      value={value}
    />
  );
}
