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
        console.log(data)
        
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