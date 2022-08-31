import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/card.css";
import "./css/addnote.css";
import { deleteNote, addnote, deleteallnotes, updateNote } from "../apis/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Private = () => {
  const [notesarr, setNotesarr] = useState([]);
  const [track, setTrack] = useState(1);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
  }, [navigate]);

  let data = localStorage.getItem("authToken");

  const toastoptions = {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  let backlink = "https://noteapp-leston.herokuapp.com";
  // let backlink = "http://localhost:3001";

  useEffect(() => {
    fetch(`${backlink}/api/auth/getuser`, {
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
        // console.log(data.newer);
        toast.success(data.message, toastoptions);
        localStorage.setItem("userID", data.newer);
        localStorage.setItem("username", data.username);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      const userID = localStorage.getItem("userID");

      fetch(`${backlink}/api/notes/getallnotes`, {
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

  function deleteNoteer(getid) {
    deleteNote(getid);
    toast.success("Note deleted", toastoptions);
    setTrack(track + 1);
  }

  async function submitChecker() {
    if (show === true) {
      if (!title || !description) {
        toast.error("Please enter title or description", toastoptions);
        return;
      }
      addnote(title, description, tag);
      toast.success("Note added successfully", toastoptions);
      setShow(false);
      setTrack(track + 1);
    }
    if (show2 === true) {
      if (!title || !description) {
        toast.error("Please enter title or description", toastoptions);
        return;
      }
      updateNote(title, description, tag);
      toast.success("Note updated successfylly", toastoptions);
      setShow2(false);
      setTrack(track + 1);
    }
  }

  async function deleteALLNOTE() {
    deleteallnotes();
    toast.success("All notes deleted", toastoptions);
    setTrack(track + 1);
  }

  let convertTime = (time) => {
    return new Date(time).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  };

  let arr2 = [...notesarr].reverse();

  return (
    <div>
      <h1 style={{ color: "red" }} className="main-dash">Welcome to your dashborard</h1>
      <button
        className="mymainbutton "
        onClick={() => {
          if (show === false) {
            if (show2 === true) {
              setShow2(false);
              localStorage.removeItem("noteID");
            }
            setShow(true);
          } else {
            setShow(false);
          }
        }}
      >
        Add Note
      </button>
      <button
        className="mymainbutton danger"
        onClick={() => {
          deleteALLNOTE();
        }}
      >
        Delete all
      </button>
      <br />
      <br />
      {show || show2 ? (
        <div className="three-cc">
          <div className="title">
            {show ? (
              <p className="title-one">Add note</p>
            ) : (
              <p className="title-one">Update note</p>
            )}
          </div>
          <div className="email">
            <div className="flexer">
              <div className="flexer-one">
                <p className="conner">Title :</p>
              </div>
              <div className="flexer-two">
                <input
                  type="text"
                  className="email-input input-control"
                  placeholder="Enter the title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="password">
            <div className="flexer">
              <div className="flexer-one">
                <p className="conner">Description</p>
              </div>
              <div className="flexer-two">
                <input
                  type="text"
                  className="password-input input-control"
                  placeholder="Enter Description "
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="password">
            <div className="flexer">
              <div className="flexer-one">
                <p className="conner">Tag :</p>
              </div>
              <div className="flexer-two">
                <input
                  type="text"
                  className="password-input input-control"
                  placeholder="Enter tag"
                  value={tag}
                  onChange={(e) => {
                    setTag(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="submit-section">
            <button
              className="submit-button"
              onClick={() => {
                submitChecker();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      ) : null}
      <br />
      <br />

      <div
        className="cardmainer"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          width: "70vw",
          margin: "auto",
        }}
      >
        {arr2.map((value, index) => {
          return (
            <div className="ctwo" key={value._id}>
              <div className="three">
                <p className="ctwo-card-header">{value.title}</p>
              </div>
              <p className=" p-one-ctwo">{value.description}</p>
              <br />
              <p className="p-two-ctwo">{convertTime(value.date)}</p>
              <i
                className="fa-solid fa-trash-can fonticon danger "
                onClick={() => {
                  deleteNoteer(value._id);
                }}
              ></i>
              <i
                className="fa-solid fa-file-pen fonticon"
                onClick={() => {
                  if (show2 === false) {
                    localStorage.setItem("noteID", value._id);
                    if (show === true) {
                      setShow(false);
                    }
                    setShow2(true);
                  } else {
                    setShow2(false);
                    localStorage.removeItem("noteID");
                  }
                }}
              ></i>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Private;
