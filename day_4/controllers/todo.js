import mongoose from "mongoose";
import Todo from "../models/todo.js";
import User from "../models/user.js";

export const getTodos = async (req, res) => {
  const { userId } = req;
  const query = req.query;
  try {
    const todos = await Todo.find({ userId })
      .select({ status: query?.status })
      .skip(query?.skip)
      .limit(query?.limit);
    res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { userEmail } = req;
  const { id } = req.params;
  try {
    const user = await User.findOne({ email: userEmail });
    const post = await Post.findOne({
      $and: [
        { _id: id },
        {
          $or: [
            { creator: userEmail },
            { creator: "ibrahimseda322@gmail.com" },
            { creator: user.friends.map((friend) => friend.email) },
          ],
        },
      ],
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { userEmail } = req;
  const LIMIT = 10;
  const { searchQuery, searchTags, page } = req.query;

  const startIndex = (Number(page) - 1) * LIMIT;
  const tagsSet =
    searchTags !== "null"
      ? searchTags?.includes(",")
        ? searchTags.split(",")
        : [searchTags]
      : null;
  const tags = tagsSet?.map((tag) => new RegExp(tag, "i"));
  const currentPage = page ? Number(page) : null;
  const title = searchQuery !== "null" ? new RegExp(searchQuery, "i") : null;
  try {
    let total;
    let posts;
    const user = await User.findOne({ email: userEmail });
    if (currentPage) {
      if (tags && title) {
        total = await Post.find({
          $and: [
            { title: title },
            { tags: { $all: tags } },
            {
              $or: [
                { creator: userEmail },
                { creator: "ibrahimseda322@gmail.com" },
                { creator: user.friends.map((friend) => friend.email) },
              ],
            },
          ],
        }).countDocuments();
        posts = await Post.find(
          {
            $and: [
              { title: title },
              { tags: { $all: tags } },
              {
                $or: [
                  { creator: userEmail },
                  { creator: "ibrahimseda322@gmail.com" },
                  { creator: user.friends.map((friend) => friend.email) },
                ],
              },
            ],
          },
          {
            title: 1,
            message: 1,
            creator: 1,
            name: 1,
            avatar: 1,
            tags: 1,
            selectedFile: 1,
            likes: 1,
            createdAt: 1,
          }
        )
          .sort({ _id: -1 })
          .limit(LIMIT)
          .skip(startIndex);
      } else if (title && !tags) {
        total = await Post.countDocuments({
          $and: [
            { title: title },
            {
              $or: [
                { creator: userEmail },
                { creator: "ibrahimseda322@gmail.com" },
                { creator: user.friends.map((friend) => friend.email) },
              ],
            },
          ],
        });
        posts = await Post.find({
          $and: [
            { title: title },
            {
              $or: [
                { creator: userEmail },
                { creator: "ibrahimseda322@gmail.com" },
                { creator: user.friends.map((friend) => friend.email) },
              ],
            },
          ],
        })
          .sort({ _id: -1 })
          .limit(LIMIT)
          .skip(startIndex);
      } else if (tags && !title) {
        total = await Post.countDocuments({
          $and: [
            { tags: { $all: tags } },
            {
              $or: [
                { creator: userEmail },
                { creator: "ibrahimseda322@gmail.com" },
                { creator: user.friends.map((friend) => friend.email) },
              ],
            },
          ],
        });
        posts = await Post.find(
          {
            $and: [
              { tags: { $all: tags } },
              {
                $or: [
                  { creator: userEmail },
                  { creator: "ibrahimseda322@gmail.com" },
                  { creator: user.friends.map((friend) => friend.email) },
                ],
              },
            ],
          },
          {
            title: 1,
            message: 1,
            creator: 1,
            name: 1,
            avatar: 1,
            tags: 1,
            selectedFile: 1,
            likes: 1,
            createdAt: 1,
          }
        )
          .sort({ _id: -1 })
          .limit(LIMIT)
          .skip(startIndex);
      }
    } else if (!currentPage && tags) {
      posts = await Post.find(
        {
          $and: [
            { tags: { $in: tags } },
            {
              $or: [
                { creator: userEmail },
                { creator: "ibrahimseda322@gmail.com" },
                { creator: user.friends.map((friend) => friend.email) },
              ],
            },
          ],
        },
        {
          title: 1,
          tags: 1,
        }
      );
    } else {
      posts = await Post.find(
        {
          $and: [
            { tags: { $all: tags } },
            {
              $or: [
                { creator: userEmail },
                { creator: "ibrahimseda322@gmail.com" },
                { creator: user.friends.map((friend) => friend.email) },
              ],
            },
          ],
        },
        {
          tags: 1,
          title: 1,
        }
      );
    }
    const numberOfPages = page !== "null" ? Math.ceil(total / LIMIT) : null;
    res.status(200).json({
      posts: posts,
      currentPage: currentPage,
      numberOfPages: numberOfPages,
    });
  } catch (error) {
    res.status(404).json({ message: "no todo found" });
  }
};

export const createTodo = async (req, res) => {
  const { userId } = req;
  const todo = req.body;
  try {
    const newTodo = await Todo.create({ ...todo, userId });

    res.json(newTodo);
  } catch (error) {
    res.status(404).json({ message: "no todo found" });
  }
};

export const updateTodo = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  const { todo } = req.body;

  try {
    const updatedTodo = await Todo.findAndUpdate(
      { _id: id, userId: userId },
      todo,
      { new: true }
    );

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "db error" });
  }
};
export const deleteTodo = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  try {
    const response = await Todo.findAndRemove({ _id: id, userId: userId });
    if (!response.ok) return res.status(500).json({ message: "db error" });
    res.json(200);
  } catch (error) {
    res.status(500).json({ message: "db error" });
  }
};
