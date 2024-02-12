import fs from "fs";
import asyncFs from "fs/promises";
const readTodos = async () => {
  const todosData = await asyncFs.readFile("../day_1/todos.json", "utf-8");
  return JSON.parse(todosData);
};

const readImage = () => {
  return fs.createReadStream(
    "./200505225212-04-fossils-and-climate-change-museum.jpg"
  );
};

const readImage64 = async () => {
  try {
    const data = await asyncFs.readFile(
      "./200505225212-04-fossils-and-climate-change-museum.jpg"
    , "base64");
    return data;
  } catch (err) {
    console.error("Error reading image:", err);
    return null;
  }
};

export { readTodos, readImage, readImage64 };
