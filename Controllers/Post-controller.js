import mongoose from "mongoose";
import Post from "../Models/Post.js";
import User from "../Models/User.js"



export const getallpost= async(req,res)=>{
    let posts
    try{
        posts = await Post.find(); 

    }
    catch(e){
        console.log("not getalluser data",e)

    }
    if(!posts){
        return res.status(500).json({mesaage:"unexpected error occured"})
    }
    return res.status(200).json({posts})

}


export const addpost = async(req,res)=>{

    const {title,description,image,location,date,user} = req.body

     if(!title&&title.trim() === "",
     !description&&description.trim()=== "",!image&&image.trim() === "",
     !location&&location.trim() === ""
     ,!date&&date.trim() === ""
     ,!user&&user.trim() === "")
     
     {
       return res.status(422).json({message:"invalid data"})
     }
     
    let existinguser
    try{
        existinguser = await User.findById(user)
       

    }catch(e){
         console.log(e)
    }

    if(!existinguser){
        return res.status(404).json({message:"USER NOT FOUND"})
    }
     
   try{
       const newpost = new Post({title,description,image,location,date:new Date(`${date}`),user})

         const session = await mongoose.startSession();
         session.startTransaction()
         existinguser.posts.push(newpost)
         existinguser.save({session})
      const post =await newpost.save({session})
      session.commitTransaction()



      res.status(200).json({post})
   }
   catch(e){
       console.log("doesnot post ",e)

   }
}


export const getpostbyid= async(req,res)=>{
    const id = req.params.id
    let posts
    try{
        posts = await Post.findById(id); 

    }
    catch(e){
        console.log("not finding",e)

    }
    if(!posts){
        return res.status(500).json({mesaage:"unexpected error occured"})
    }
    return res.status(200).json({posts})

}


export const updatepostbyid = async(req,res)=>{
    const id = req.params.id

    const {title,description,image,location,date} = req.body

    if(!title&&title.trim() === "",
    !description && description.trim()=== ""
    , !image &&  image.trim() === "",
    !location &&  location.trim() === ""
  
    )
    
    {
      return res.status(422).json({message:"invalid data"})
    }

    let postupdate 
    try{
      postupdate = await Post.findByIdAndUpdate(id,{
        title,
        location,
        description,
      
        image
     })
     

    }
    catch(e){
        console.log(e)
    }
    if(!postupdate){
        return res.status(500).json({mesaage:"unexpected error occured"})
    }
    return res.status(200).json({mesaage:"updateed",postupdate})

}



export const deletepostbyid= async(req,res)=>{
    const id = req.params.id
    let deletepost
    try{
        deletepost = await Post.findByIdAndRemove(id); 

    }
    catch(e){
        console.log("not delete data",e)

    }
    if(!deletepost){
        return res.status(500).json({mesaage:"unexpected error occured"})
    }
    return res.status(200).json({mesaage:"deleted"})

}