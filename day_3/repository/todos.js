import fs from "fs/promises";

const filePath = "./assets/todos.json";

const readTodos = async () => {
    console.log("readtodos");
  const todos = await fs.readFile(filePath, "utf-8");
  return JSON.parse(todos);
};

const writeTodos = async (todos) => {
  await fs.writeFile(filePath, JSON.stringify(todos, null, 2));
};

export { readTodos, writeTodos };
