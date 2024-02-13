import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20,
    },
    status: {
      type: String,
      default: "to-do",
      enum: ["to-do", "in progress", "done"],
    },
    tags: {
      type: [String],
      maxlength: 10,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
