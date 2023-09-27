
// let backlink="https://noteapp-leston.herokuapp.com"
let backlink=`${process.env.REACT_APP_BASE_URL}`

export async function deleteNote(getid){
    const noteID=getid
    let leston
    fetch(`${backlink}/api/notes/deletenote`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "noteID":noteID
        }
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        leston="Note deleted successfully"
        // console.log(data)
        // return data
        return leston
        
    }).catch((error)=>{
        console.log(error)
    })
    
}

export function getallnotes(req,res,next){
    // const userID=userID
    setTimeout(() => {
        const userID = localStorage.getItem("userID");
        console.log("my poas", userID);
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

export async function addnote(title,des,tag){
    const userID=localStorage.getItem("userID")
    console.log(title,des,tag)
      await fetch(`${backlink}/api/notes/addnote`,{
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
         
    }).catch((error)=>{
        console.log(error)
    })
   
}

export async function deleteallnotes(){
    const userID=localStorage.getItem("userID")
    fetch(`${backlink}/api/notes/deleteallnotes`,{
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

export async function updateNote(title,des,tag){
    const noteID=localStorage.getItem("noteID")
    let leston
    fetch(`${backlink}/api/notes/updatenote`,{
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
        // console.log(data)
        leston="Note updated successfully"
        
    }).catch((error)=>{
        // return res.json()
        console.log(error)
    })
    return leston
}