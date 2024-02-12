import express from "express";
import { signUp, signIn, getUser, editUser, deleteUser, getUsers, getUserTodos } from "../controllers/user.js";
import user from "../middleware/user.js";
const router = express.Router();

router.post("/", signUp);
router.post("/log-in", signIn);
router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.patch("/:id", user, editUser);

router.get("/:id", getUser);
router.get('/:userId/todos', getUserTodos);

export default router;
