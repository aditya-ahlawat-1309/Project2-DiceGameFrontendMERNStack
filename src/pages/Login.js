import axios from "axios";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CredentialsContext } from "../App";

export const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 // const [, setCredentials] = useContext(CredentialsContext);

  // const login = (e) => {
  //   e.preventDefault();
  //   fetch(`http://localhost:8000/api/login`, {
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
  //       history.push("/home");
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // };

  const history = useHistory();

const login = async(e) => {
  e.preventDefault();
  try{ 
  const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios
        .post(
          `https://lazy-gold-lemur-ring.cyclic.app/api/login`,
          { username, password },
          config
        )
        .catch((err) => {
          console.log(err);
          setError(err.message);
        });

      localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/home");
    } catch (error) {
     console.log(error); 
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: "3rem", color: "white", padding: "3%" }}>Login</h1>
      {error && <span style={{ color: "red", fontSize:"1.5rem" }}>Invalid Username or Password</span>}
      <br/>
      <br/>
      <br/>
      
      <form onSubmit={login}>
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
        <br />
        <br />
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
          Login
        </button>
      </form>
    </div>
  );
}
