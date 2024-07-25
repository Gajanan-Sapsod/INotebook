import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    //console.log("clicked on submit");
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/login";
    const response = await fetch(url, {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
      // Adding headers to the request

      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();
    if (json.success) {
      //redirect
      localStorage.setItem("token", json.authtoken);
      props.showalert("Logged in Successfully", "success");
      navigate("/");
    } else {
      props.showalert("Invalid Credentials", "danger");
    }
  };

  return (
    <>
      <h2>Login to continue iNotebook</h2>
      <form>
        <div className="mb-3 my-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default Login;
