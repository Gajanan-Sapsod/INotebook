import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    //console.log("clicked on submit");
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/signup";
    const response = await fetch(url, {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        name: credentials.name,
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
      console.log(json.authtoken);
      localStorage.setItem("token", json.authtoken);
      props.showalert("Signed up succesfully", "success");
      navigate("/");
    } else {
      alert("Invalid Credentials");
      props.showalert("Already signed up");
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-3">
          <label htmlFor="name" className="form-label">
            Your name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            aria-describedby="emailHelp"
            minLength={5}
          />
        </div>
        <div className="mb-3">
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
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            minLength={5}
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default Signup;
