import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Todo from "../models/todo.js";

export const signUp = async (req, res) => {
  const { username, firstName, lastName, password, dob } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "This username is already used." });
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      firstName,
      lastName,
      dob,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: user._id }, "test", { expiresIn: "5min" });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json("database error");
  }
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    } else {
      const { firstName, lastName, password: dbPass, dob } = foundUser;

      const passwordValidate = await bcrypt.compare(password, dbPass);
      if (!passwordValidate)
        return res.status(400).json({ message: "Password is incorrect." });

      const token = jwt.sign({ userId: foundUser._id }, "test", {
        expiresIn: "5min",
      });

      res.status(200).json({ token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("database error");
  }
};

export const editUser = async (req, res) => {
  const user = req.body;
  const { userId } = req;
  try {
    const editedUser = await User.findOneAndUpdate({ _id: userId }, user, {
      new: true,
    });

    res.status(200).json({ editedUser });
  } catch (error) {
    res.status(500).json("database error");
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.json(404);
    res.json(user);
  } catch (error) {
    res.status(500).json("database error");
  }
};

export const getUsers = async (req, res) => {
  try {
    const userNames = await User.find().select("username");
    res.json(userNames);
  } catch (error) {
    res.status(500).json("database error");
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const res = await User.deleteOne({ _id: id });
    if (!res.ok) return res.json(404);
    res.json(200);
  } catch (error) {
    res.status(500).json("database error");
  }
};

export const getUserTodos = async () => {
  const { id } = req.params;
  try {
    const todos = await Todo.find({ userId: id });
    res.json(todos);
  } catch (error) {
    res.status(500).json("database error");
  }
};

