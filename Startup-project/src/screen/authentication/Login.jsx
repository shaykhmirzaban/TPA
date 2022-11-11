import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../config/FirebaseMethods";

import "../../style/login.scss";

export default function Login() {
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
    signInUser(currentValue)
      .then((_) => {
        alert(_);
        setError("");
        navigate("/");
        // window.onload(() => {console.log("page load")});
      })
      .catch((_) => {
        setError(_);
        setLoading("");
      });
  };

  return (
    <section className="login">
      <div className="heading">
        <h1>Login</h1>
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

        <div className="buttonPart">
          {error ? <p className="error">{error}</p> : null}
        </div>

        {loading ? <button>{loading}</button> : <button>Login</button>}
      </form>

      <div className="switchPage">
        <Link to="/signup">Sign up</Link>
      </div>
    </section>
  );
}
