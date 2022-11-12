import { useState,useContext,useEffect } from "react";
import "../App.css";
import { v4 as uuidv4 } from "uuid";
//import { CredentialsContext } from "../App";
import { ChatState } from "../Context/ChatProvider";
import dice1 from "../images/dice1.png";
import dice2 from "../images/dice2.png";
import dice3 from "../images/dice3.png";
import dice4 from "../images/dice4.png";
import dice5 from "../images/dice5.png";
import dice6 from "../images/dice6.png";
import axios from "axios";
import {useHistory} from "react-router-dom"; 

export default function HomePage() {
  //const [credentials] = useContext(CredentialsContext);
  const [data, setData] = useState("");
  const [dataArray, setDataArray] = useState([]);

  const [dataDisplay, setDataDisplay] = useState([]);

  const [show, setShow] = useState(false);

  var information = "";

  var randomNumber1 = 1;
  var randomNumber2 = 1;

  var randomImageSource = dice1;
  var randomImageSource2 = dice1;

const history = useHistory();

  const { user } = ChatState();
  console.log(user);
  //  const persist = (newData) => {
  //    fetch(`http://localhost:8000/api/history`, {
  //      method: "POST",
  //      headers: {
  //        "Content-Type": "application/json",
  //        Authorization: `Bearer ${user.token}`,
  //      },
  //      body: JSON.stringify(newData),
  //    }).then(() => {});
  //  };

  const persist = async (newData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}:${user.username}`,
        },
      };
      await axios.post(
        `https://lazy-gold-lemur-ring.cyclic.app/api/history`,
        {
          body: newData,
        },
        config
      );
    }
   catch (err) {
      console.log(err);
    }
  };

  // const getData = () => {
  //    fetch(`http://localhost:8000/api/history`, {
  //      method: "GET",
  //      headers: {
  //        "Content-Type": "application/json",
  //       Authorization: `Bearer ${user.token}`,
  //      },
  //    })
  //      .then((response) => response.json())
  //      .then((todos) => setDataArray(todos))
  //      .catch(err => console.log(err));
  //  };

   
   const getData = async () => {
    console.log("getData is being called");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}:${user.username}`,
        },
      };

      const { data } = await axios.get(
        `https://lazy-gold-lemur-ring.cyclic.app/api/history`,
        config
      );
      console.log(data);
      setDataArray(data);
      
    } catch (err) {
      console.log(err);
    }
  }
 

  const addData = async (event) => {
     //event.preventDefault();
    if (!data) return;

    const dataString = {
       id: uuidv4(), 
       text: data };
    const newData = [...dataArray,dataString];
  setDataArray(newData);
    console.log(JSON.stringify(newData)+" "+"qwertyuio");
     persist(newData);

  //    try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };
  //     await axios.post(
  //       `http://localhost:8000/api/history`,
  //       {
  //         body: JSON.stringify(newData),
  //       },
  //       config
  //     );
  //   }
  //  catch (err) {
  //     console.log(err);
  //   }

  };

  if (randomNumber1 > randomNumber2) {
    {
      information = "You Won";
    }
  } else if (randomNumber1 < randomNumber2) {
    {
      information = "Computer Won";
    }
  } else {
    {
      information = "It's a Draw";
    }
  }

  randomNumber1 = Math.floor(Math.random() * 6) + 1;
  var randomDiceImage = "dice" + randomNumber1 + ".png";
  randomImageSource = randomDiceImage;

  if (randomImageSource === "dice1.png") {
    randomImageSource = dice1;
  } else if (randomImageSource === "dice2.png") {
    randomImageSource = dice2;
  } else if (randomImageSource === "dice3.png") {
    randomImageSource = dice3;
  } else if (randomImageSource === "dice4.png") {
    randomImageSource = dice4;
  } else if (randomImageSource === "dice5.png") {
    randomImageSource = dice5;
  } else {
    randomImageSource = dice6;
  }

  // var image1 = document.querySelectorAll("img")[0];

  // image1.setAttribute("src", {randomImageSource});

  randomNumber2 = Math.floor(Math.random() * 6) + 1;
  var randomDiceImage2 = "dice" + randomNumber2 + ".png";
  randomImageSource2 = randomDiceImage2;

  if (randomImageSource2 === "dice1.png") {
    randomImageSource2 = dice1;
  } else if (randomImageSource2 === "dice2.png") {
    randomImageSource2 = dice2;
  } else if (randomImageSource2 === "dice3.png") {
    randomImageSource2 = dice3;
  } else if (randomImageSource2 === "dice4.png") {
    randomImageSource2 = dice4;
  } else if (randomImageSource2 === "dice5.png") {
    randomImageSource2 = dice5;
  } else {
    randomImageSource2 = dice6;
  }
  console.log(randomImageSource2);
  // var image2 = document.querySelectorAll("img")[1];

  // image2.setAttribute("src", {randomImageSource2});
  //var ans = "";

  if (randomNumber1 > randomNumber2) {
    {
      information = "You Won";
    }
  } else if (randomNumber1 < randomNumber2) {
    {
      information = "Computer Won";
    }
  } else {
    {
      information = "It's a Draw";
    }
  }

  const refreshComponent = (e) => {
    //getData();
  setData(information);
  addData();
  getDataArray();
  }

  const getDataArray = () => {
    //getData();
   // e.preventDefault();
   //const dataDisplay = [...dataArray];
   //setDataArray(dataDisplay) 
    console.log(dataArray);
    return dataArray.reverse();
  };
var you = 0;
var computer = 0;
var draw = 0;

var color1 = "crimson";
var color2 = "green";
var color3 = "yellow";

for(var i=0;i<dataArray.length;i++)
{
  console.log(dataArray[i].text);
  if(dataArray[i].text === "You Won"){you++;}
  else if(dataArray[i].text === "Computer Won")computer++;
  else draw++;
}

const logoutHandler = () => {
  localStorage.removeItem("userInfo");
  history.push("/");
};

  return (
    <div className="App">
      <div className="container">
        {/* <form onSubmit={addData}>
          <input
          style={{}}
            value={information}
            onChange={(e) => setData(e.target.value)}
          ></input>
        </form> */}

        <h3>{information}</h3>
        <button
          onClick={logoutHandler}
          // style={{
          //   fontSize: "2rem",
          //   cursor: "pointer",
          //   backgroundColor: "#08F0A3",
          //   color: "red",
          //   padding: "10px",
          //   borderRadius: "35px",
          //   left: "90%",
          //   height: "10%",
          //   position: "absolute",
          //   top: "3%",
          //   borderColor: "red",
          // }}
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "2rem",
            fontWeight: "500",
            backgroundColor: "red",
            opacity: "1",
          padding:"1%",
            cursor: "pointer",
            position: "absolute",
            top: "5%",
            left: "87.5%",
          }}
        >
          Logout
        </button>

        <div className="dice">
          <p>You</p>
          <img className="img1" src={randomImageSource} />
        </div>
        <div className="dice">
          <p>Computer</p>
          <img className="img2" src={randomImageSource2} />
        </div>
        <br />
        <br />
        <br />
        <button
          style={{
            fontSize: "2rem",
            cursor: "pointer",
            backgroundColor: "#4ecca3",
            color: "black",
            padding: "10px",
            borderRadius: "35px",
          }}
          onClick={refreshComponent}
        >
          Click Here to Play !
        </button>
        <br />
        <br />
        <button
          style={{
            fontSize: "2rem",
            cursor: "pointer",
            backgroundColor: "#4ecca3",
            color: "black",
            padding: "10px",
            borderRadius: "35px",
          }}
          onClick={() => {
            getData();
            setShow(!show);
          }}
        >
          Let's See History!
        </button>
        <br />
        <br />
        {show ? (
          <>
            <h2>Total Match: {you + computer + draw}</h2>
            <br />
            <br />
            <div style={{ display: "flex", marginLeft: "-20%" }}>
              <h2>You:{you}</h2> <h2>Draw:{draw}</h2>
              <h2> Computer:{computer}</h2>
            </div>

            <ol>
              {dataArray?.map((dataDisplayInfo) => (
                <>
                  <br />
                  <div
                    key={dataDisplayInfo.id}
                    style={{
                      textAlign: "center",
                      marginLeft: `${
                        dataDisplayInfo.text === "You Won"
                          ? "-25%"
                          : dataDisplayInfo.text === "Computer Won"
                          ? "65%"
                          : "16%"
                      } `,
                      fontSize: "2rem",
                      backgroundColor: `${
                        dataDisplayInfo.text === "You Won"
                          ? color2
                          : dataDisplayInfo.text === "Computer Won"
                          ? color1
                          : color3
                      } `,
                      color: "white",
                      width: `${
                        dataDisplayInfo.text === "You Won"
                          ? "35%"
                          : dataDisplayInfo.text === "Computer Won"
                          ? "45%"
                          : "40%"
                      } `,
                      borderRadius: "25px",
                      display: "flex",
                      padding: "10px",
                    }}
                  >
                    &nbsp;&nbsp; Match&nbsp;&nbsp;&nbsp;&nbsp;
                    <label style={{ display: "flex", paddingLeft: "5%" }}>
                      <li>&nbsp;&nbsp;{dataDisplayInfo.text}</li>
                    </label>
                  </div>
                </>
              ))}
            </ol>
          </>
        ) : null}
      </div>
    </div>
  );
}

