import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodo,
} from "../controllers/todo.js";

import user from "../middleware/user.js";

const router = express.Router();

router.get("/", user, getTodos);
router.get("/:id", user, getTodo);
router.post("/", user, createTodo);
router.patch("/:id", user, updateTodo);
router.delete("/:id", user, deleteTodo);
export default router;
