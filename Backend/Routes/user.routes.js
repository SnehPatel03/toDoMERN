import express from "express"
import { LogIn, LogOut, signIn } from "../controller/user.controller.js";


const router =express.Router() 

router.post("/signin",signIn)
router.post("/login",LogIn)
router.get("/logout",LogOut)

export default router;