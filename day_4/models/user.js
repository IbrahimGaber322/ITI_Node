import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 8,
    },
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);

export default User;
