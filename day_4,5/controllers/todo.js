import Todo from "../models/todo.js";

export const getTodos = async (req, res) => {
  const { userId } = req;
  const { status, skip, limit } = req.query;
  try {
    const query = { userId };
    if (status) query.status = status;
    const todos = await Todo.find(query)
      .skip(parseInt(skip) || 0)
      .limit(parseInt(limit) || 0);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos." });
  }
};

export const getTodo = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  try {
    const todo = await Todo.find({ userId, _id: id });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todo." });
  }
};

export const createTodo = async (req, res) => {
  const { userId } = req;
  const todo = req.body;
  try {
    const newTodo = await Todo.create({ ...todo, userId });
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Failed to create todo." });
  }
};

export const updateTodo = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  const { title, status, tags } = req.body;
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId: userId },
      { title, status, tags },
      { new: true }
    );

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo." });
  }
};
export const deleteTodo = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  try {
    const response = await Todo.findOneAndDelete({ _id: id, userId: userId });
    console.log(response);
    res.json("Todo successfully deleted.");
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo." });
  }
};
