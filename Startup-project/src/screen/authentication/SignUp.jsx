import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../config/FirebaseMethods";

// style
import "../../style/login.scss";

export default function SignUp() {
  let [currentValue, setCurrentValue] = useState({
    email: "",
    password: "",
  });
  let [error, setError] = useState("");
  let [loading, setLoading] = useState("");
  let navigate = useNavigate();

  const currentV = (e) => {
    let { value, name } = e.target;
    setCurrentValue((val) => {
      return { ...val, [name]: value };
    });
  };

  const userData = (e) => {
    e.preventDefault();

    setLoading("wating...");

    createUser(currentValue)
      .then((_) => {
        alert("successfully created");
        setError("");
        navigate("/login");
      })
      .catch((_) => {
        setError(_);
        setLoading("");
      });
  };

  return (
    <section className="SignUp">
      <div className="heading">
        <h1>SignUp</h1>
      </div>

      <form onSubmit={userData}>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          onChange={currentV}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={currentV}
          required
        />

        <button>Sign up</button>
      </form>

      <div className="buttonPart">
        {error ? <p className="error">{error}</p> : null}
        {loading ? <p className="loading">{loading}</p> : null}
      </div>

      <div className="switchPage">
        <Link to="/login">Login</Link>
      </div>
    </section>
  );
}
