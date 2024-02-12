import express from "express";
import { fetchTodos, addTodo, editTodo, deleteTodo, fetchTodo } from "../controllers/todos.js";
import { verifyTodo } from "../middleware/todos.js";
const router = express.Router();

router.get("/", fetchTodos);
router.get("/:id", fetchTodo)
router.post("/", verifyTodo, addTodo);
router.patch("/:id", verifyTodo, editTodo);
router.delete("/:id", deleteTodo);

export default router;