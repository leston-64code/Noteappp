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