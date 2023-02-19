import mongoose from "mongoose";


export  const connected = async(username,password) =>{
    const uri = `mongodb+srv://${username}:${password}@travel.hjp5dsm.mongodb.net/?retryWrites=true&w=majority`
    mongoose.set('strictQuery', false)
    try{
        mongoose.connect(uri)
        console.log("connected")

    }
    catch(e){
        console.log("disconnect",e)

    }

}
export default connected