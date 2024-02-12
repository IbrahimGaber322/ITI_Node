import { readTodos, writeTodos } from "../repository/todos.js";

const fetchTodos = async (req, res) => {
  console.log("fetchtodos");
  try {
    const todos = await readTodos();
    res.json(todos.map((t) => ({ ...t, json: t.json ? "done" : "to-do" })));
  } catch (error) {
    res.json(500);
  }
};

const fetchTodo = async (req, res) => {
  console.log("fetchtodo");
  const { id } = req.params;
  try {
    const todos = await readTodos();
    const todo = todos.find((t) => t.id == id);
    if (!todo) throw new Error("todo not found");
    res.json(todo);
  } catch (error) {
    res.json(500);
  }
};

const addTodo = async (req, res) => {
  const { todo } = req.body;
  try {
    const todos = await readTodos();
    todos.push({ ...todo, id: todos?.at(-1)?.id + 1 });
    await writeTodos(todos);
    res.json(200);
  } catch (error) {
    res.json(500);
  }
};
const editTodo = async (req, res) => {
  const { todo } = req.body;
  const { id } = req.params;
  console.log("editodo");
  try {
    const todos = await readTodos();
    const todoIndex = todos.findIndex((t) => t.id == id);
    todos[todoIndex] = { ...todos[todoIndex], ...todo };
    await writeTodos(todos);
   
    res.json(200);
  } catch (error) {
    res.json(500);
  }
};
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const todos = await readTodos();
    await writeTodos(todos.filter((t) => t.id != id));
    res.json(200);
  } catch (error) {
    res.json(500);
  }
};

export { fetchTodos, fetchTodo, addTodo, editTodo, deleteTodo };
