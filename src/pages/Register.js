import axios from "axios";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { handleErrors } from "./Login";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const register = (e) => {
  //   e.preventDefault();
  //   fetch(`http://localhost:8000/api/register`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username,
  //       password,
  //     }),
  //   })
  //     .then(handleErrors)
  //     .then(() => {
  //       setCredentials({
  //         username,
  //         password,
  //       });
  //       history.push("/login");
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // };


  const history = useHistory();

const register = async (e) => {
  e.preventDefault();
try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios
        .post(
          `https://dicedgame.herokuapp.com/api/register`,
          {
            username,
            password,
          },
          config
        )
        .catch((err) => {
          console.log(err);
        });
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/login");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: "3rem", color: "white", padding: "3%" }}>
        Register
      </h1>
      {error && <span style={{ color: "red", fontSize:"1.5rem" }}>User Already Exists</span>}
      <br/>
      <br/>
      <br/>
      <form onSubmit={register}>
        <label
          style={{
            padding: "1%",
            paddingLeft: "10%",
            paddingRight: "10%",
            fontSize: "1.5rem",
            backgroundColor: "green",
            opacity: "1",
            color: "white",
          }}
        >
          Username
        </label>
        <br />
        <br />
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          style={{
            backgroundColor: "white",
            width: "40%",
            height: "50px",
            borderRadius: "25px",
            border: "none",
            textAlign: "center",
          }}
          required
        />
        <br />
        <br />
        <br/>
<br/>
        <label
          style={{
            padding: "1%",
            paddingLeft: "10%",
            paddingRight: "10%",
            fontSize: "1.5rem",
            backgroundColor: "green",
            opacity: "1",
            color: "white",
          }}
        >
          Password
        </label>
        <br />
        <br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          style={{
            backgroundColor: "white",
            width: "40%",
            height: "50px",
            borderRadius: "25px",
            border: "none",
            textAlign: "center",
          }}
          required
        />
        <br />
        <br />
        <button
          type="submit"
          style={{
            fontSize: "2rem",
            padding: "1%",
            paddingLeft: "10%",
            paddingRight: "10%",
            backgroundColor: "white",
            opacity: "1",
            border: "none",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}
