import express from "express"
import dotenv from "dotenv"
import connected from "./db.js"
import {route} from "./routes/route.js"
import { postroute } from "./routes/postroute.js"
import cors from "cors"
const app = express()    // hold all functionalties of application
const port = process.env.PORT || 3009;
dotenv.config()
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

connected(username,password)

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    
}



app.use(express.json())                    //.use middleware for api s
app.use(cors(corsOptions))
app.use("/users" , route)
app.use("/posts" , postroute)                






app.listen(port,()=>{
    console.log(`${port} running `)
})
