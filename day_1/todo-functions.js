
import fs from "fs";

const statuses = ["to-do", "in-progress", "done"];
const getSpaces = (current, max) => {
  return max - current.toString().length + 2;
};

const readDataFromFile = () => {
  try {
    const data = fs.readFileSync("todos.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeDataToFile = (data) => {
  fs.writeFileSync("todos.json", JSON.stringify(data, null, 2), "utf8");
};

const addEntry = (title) => {
  if (title.trim().length === 0) {
    console.log("Title can't be empty.");
    return;
  }
  const todos = readDataFromFile();
  const maxId = todos.at(-1).id || 0;
  const newEntry = { id: maxId + 1, title, status: "to-do" };
  todos.push(newEntry);
  writeDataToFile(todos);
  console.log("Entry added successfully:", newEntry);
};

const listEntries = (status) => {
  const todos = readDataFromFile();
  let print = [];
  console.log("To-Do List:");

  if (statuses.includes(status)) {
    print = todos.filter((t) => t.status === status);
  } else {
    print = todos;
  }
  const maxIdLength = todos.at(-1).id.toString().length;
  const maxTitleLength = todos.reduce((acc, curr) => {
    if (curr.title.length > acc) {
      acc = curr.title.length;
    }
    return acc;
  }, 0);
  console.log(maxIdLength, maxTitleLength);
  console.log(
    print
      .map(
        (e) =>
          `id: ${e.id}${" ".repeat(getSpaces(e.id, maxIdLength))}title: ${
            e.title
          }${" ".repeat(getSpaces(e.title, maxTitleLength))}status: ${e.status}`
      )
      .join("\n")
  );
};

const editEntry = (id, title, status) => {
  const todos = readDataFromFile();
  const todo = todos.find((entry) => entry.id === parseInt(id));

  if (!todo) {
    console.log("Entry not found.");
    return;
  }
  if (title.trim().length === 0) {
    title = todo.title;
  }
  if (statuses.includes(status)) {
    todo.status = status;
  }
  todo.title = title;
  writeDataToFile(todos);
  console.log("Entry edited successfully:", todo);
};

const deleteEntry = (id) => {
  const todos = readDataFromFile();
  const filteredTodos = todos.filter((entry) => entry.id !== parseInt(id));
  if (filteredTodos.length < todos.length) {
    writeDataToFile(filteredTodos);
    console.log(`Entry with ID ${id} deleted successfully.`);
  } else {
    console.log("Entry not found.");
  }
};

export { addEntry, listEntries, editEntry, deleteEntry };
