import { readTodos } from "../repository/todos.js";
import { editTodo } from "./todos.js";
export const homePage = async (req, res) => {
  const todos = await readTodos();

  res.render("pages/index", { todos, editTodo });
};

export const todoPage = async (req, res) => {
  const { id } = req.params;
  try {
    const todos = await readTodos();
    const todo = todos.find((t) => t.id == id);
    if (!todo) res.render("pages/404");
    res.render("pages/todo", { todo });
  } catch (error) {
    res.render("pages/500");
  }
};

