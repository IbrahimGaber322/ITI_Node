const todoSchema = ["title", "status", "desc"];

export const verifyTodo = (req, res, next) => {
  const { todo } = req.body;
  let pass = true;
  const todoKeys = Object.keys(todo);
  todoKeys.forEach((key) => {
    if (!todoSchema.includes(key)) pass = false;
  });
  if (pass) {
    next();
  } else {
    res.json(300);
  }
};
