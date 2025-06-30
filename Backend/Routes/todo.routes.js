import express from "express"
import { createTodo, deleteTodo, fetchAllTodo, updateTodo } from "../controller/todo.controller.js";
import { authorize } from "../middleware/autorize.js";
const router =express.Router() 
router.post("/create",authorize,createTodo)
router.get("/fetch",authorize,fetchAllTodo)
router.put("/update/:id",authorize,updateTodo)
router.delete("/delete/:id",authorize,deleteTodo)

export default router;