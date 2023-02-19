import express from "express";
import { GetAllUser, signupuser,login,Getuserbyid } from "../Controllers/User-controller.js";

export  const route = express.Router()


route.get("/",GetAllUser)
route.get("/:id",Getuserbyid)
route.post("/signup",signupuser)
route.post("/login",login)
