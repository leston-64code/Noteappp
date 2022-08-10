import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/card.css";
import "./css/addnote.css"
import {deleteNote,getallnotes} from "../apis/api"
const Private = () => {
  const [notesarr, setNotesarr] = useState([]);
  const [track,setTrack]=useState(1)
  const [show,setShow]=useState(false)
  
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
  }, [track]);

  async function logoutHandler() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userID");
    navigate("/login");
  }

  function deleteNoteer(getid){
    deleteNote(getid)
    setTrack(track+1)
  }

  return (
    <div >
      <h1 style={{ color: "red" }}>
        Welcome to your dashborard
      </h1>
      <button className="mymainbutton " onClick={()=>{
        if(show==false){
          setShow(true)
        }else{
          setShow(false)
        }
      }}>Add Note</button>
      <button className="mymainbutton">Delete all notes</button>
      <br />
      <br />
      {
        show?<div className="three-c">
        <div className="title">
          <p className="title-one">Add note</p>
        </div>
        <div className="email">
            <div className="flexer">
                <div className="flexer-one">
                    <p className="conner">Title :</p>
                </div>
                <div className="flexer-two">
                    <input type="text" className="email-input input-control" placeholder="Enter the title"/>
                </div>
            </div>
            
        </div>
        <div className="password">
            <div className="flexer">
                <div className="flexer-one">
                    <p className="conner">Description</p>
                </div>
                <div className="flexer-two">
                    <input type="text" className="password-input input-control" placeholder="Enter Description "/>
                </div>
                
            </div>
           
        </div>
        <div className="password">
            <div className="flexer">
                <div className="flexer-one">
                    <p className="conner">Tag :</p>
                </div>
                <div className="flexer-two">
                    <input type="text" className="password-input input-control" placeholder="Enter tag"/>
                </div>
                
            </div>
           
        </div>
        
        <div className="submit-section">
            <button className="submit-button">
                Submit
            </button>
        </div>
    </div>:null
      }
      <br />
      <br />

      <div
        className="cardmainer"
        style={{
          display: "flex",
          "flexWrap": "wrap",
          justifyContent: "space-evenly",
          width: "70vw",
          margin: "auto",
        }}
      >
        {notesarr.reverse().map((value, index) => {
          return (
            <div className="ctwo" key={value._id}>
              <div className="three">
                <p className="ctwo-card-header">{value.title}</p>
              </div>
              <p className=" p-one-ctwo">{value.description}</p>
              <p className="p-two-ctwo">{value.date}</p>
              <i className="fa-solid fa-trash-can fonticon " onClick={()=>{
                deleteNoteer(value._id)
              }}></i>
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
