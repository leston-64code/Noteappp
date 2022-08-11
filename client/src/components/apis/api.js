exports.deleteNote=(getid)=>{
    const noteID=getid
    fetch("/api/notes/deletenote",{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "noteID":noteID
        }
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        // console.log(data)
        
    }).catch((error)=>{
        console.log(error)
    })
}

exports.getallnotes=(req,res,next)=>{
    // const userID=userID
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
            // setNotesarr(output.notes);
            if(output){
                return output
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }, 1000);
}

exports.addnote=async (title,des,tag)=>{
    const userID=localStorage.getItem("userID")
    console.log(title,des,tag)
   await fetch("/api/notes/addnote",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "userID":userID
        },
        body:await JSON.stringify({
            title:title,
            description:des,
            tag:tag
        })
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        console.log(data)
    }).catch((error)=>{
        console.log(error)
    })
}

exports.deleteallnotes=async ()=>{
    const userID=localStorage.getItem("userID")
    fetch("/api/notes/deleteallnotes",{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "userID":userID
        }
    }).then((res)=>{
        return res.text()
    }).then((data)=>{
        console.log(data)
    }).catch((error)=>{
        console.log(error)
    })
}

exports.updateNote=async (title,des,tag)=>{
    const noteID=localStorage.getItem("noteID")
    fetch("/api/notes/updatenote",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "noteID":noteID
        },
        body:JSON.stringify({
            title:title,
            description:des,
            tag:tag
        })
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        localStorage.removeItem("noteID")
        console.log(data)
        
    }).catch((error)=>{
        console.log(error)
    })
}