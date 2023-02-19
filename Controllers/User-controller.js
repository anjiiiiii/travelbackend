import User from "../Models/User.js"
import bcrypt from "bcryptjs"
import { startSession } from "mongoose";



export const GetAllUser= async(req,res)=>{
    let users
    try{
        users = await User.find(); 

    }
    catch(e){
        console.log("not getalluser data",e)

    }
    if(!users){
        return res.status(500).json({mesaage:"unexpected error occured"})
    }
    return res.status(200).json({users})

}

export const signupuser = async(req,res)=>{
     const {name,email,password} = req.body
      if(!name&&name.trim() === "",!email&& email.trim()=== "", !password && password.trim() === ""){
        return res.status(422).json({message:"invalid data"})
      }
      
      const hashpassword = bcrypt.hashSync(password,12)
      
    try{
        const client = new User({name ,email,password:hashpassword})
       await client.save()
       res.status(200).json({client})
    }
    catch(e){
        console.log(e)

    }
}

export const login = async(req,res)=>{
    const {email,password} = req.body
     
     
   try{
       const existuser = await User.findOne({email})
       if(!existuser){
       return res.status(404).json({message:"user not found"})
       }

       const ismatch  = await bcrypt.compare(password,existuser.password)

       if(!ismatch){
        return res.status(404).json({mesaage:"incorreact password"})

       }

       return res.status(200).json({id:existuser._id,message:"loginsuccesfull"})
       
      
   }
   catch(e){
       console.log(e)

   }

}


export const Getuserbyid=async(req,res)=>{

    const id = req.params.id
 let profile
    try{

        profile = await User.findById(id).populate("posts");

    }catch(e){
        console.log(e)
    }


    if(!profile){
        return res.status(404).json({message:"no user found"})
    }

    return res.status(200).json({profile})

}