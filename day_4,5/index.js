import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/user.js";
import todoRoutes from "./routes/todo.js";

dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/todos", todoRoutes);
app.use("/users", userRoutes);

mongoose
  .connect(DATABASE_URL, { dbName: "ITI" })
  .then(() => {
    app.listen(SERVER_PORT, () => {
      console.log(`Server listening on port ${SERVER_PORT}`);
    });
  })
  .catch((err) => console.log(err));
