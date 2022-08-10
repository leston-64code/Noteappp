import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/card.css";
const Private = () => {
  const [notesarr, setNotesarr] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
  }, [navigate]);

  let data = localStorage.getItem("authToken");

  useEffect(() => {
    fetch("/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: data,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.newer);
        localStorage.setItem("userID", data.newer);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      const userID = localStorage.getItem("userID");
      console.log("my poas", userID);
      fetch("/api/notes/getallnotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          userID: userID,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((output) => {
          console.log(output);
          setNotesarr(output.notes);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  }, []);

  async function logoutHandler() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userID");
    navigate("/login");
  }

  return (
    <div>
      <h1 style={{ color: "red" }}>
        Hello this is private route You are good boy
      </h1>
      <br />
      <br />

      <div
        className="cardmainer"
        style={{
          display: "flex",
          "flex-wrap": "wrap",
          justifyContent: "space-evenly",
          width: "70vw",
          margin: "auto",
        }}
      >
        {notesarr.map((value, index) => {
          return (
            <div className="ctwo" key={index}>
              <div className="three">
                <p className="ctwo-card-header">{value.title}</p>
              </div>
              <p className=" p-one-ctwo">{value.description}</p>
              <p className="p-two-ctwo">{value.date}</p>
              <i className="fa-solid fa-trash-can fonticon "></i>
              <i className="fa-solid fa-file-pen fonticon"></i>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          logoutHandler();
        }}
        style={{ fontSize: "50px", borderRadius: "15px solid white" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Private;
