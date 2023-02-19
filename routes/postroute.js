import {Router} from "express";
import { addpost, getallpost,getpostbyid,updatepostbyid,deletepostbyid } from "../Controllers/Post-controller.js";


  export const postroute = Router()

  postroute.get("/",getallpost)
postroute.get("/:id",getpostbyid)
postroute.post("/",addpost)
postroute.put("/:id",updatepostbyid)
postroute.delete("/:id",deletepostbyid)
