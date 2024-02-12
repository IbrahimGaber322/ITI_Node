import express from "express";
import todosRouter from "./routes/todos.js";
import pagesRouter from "./routes/pages.js";

const app = express();

app.use(express.json());

app.set("view engine", "ejs");

app.use("/", pagesRouter);

app.use("/api/todos", todosRouter);

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
