import jwt from "jsonwebtoken";

const user = (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (token) {
      jwt.verify(token, "test", (err, decoded) => {
        if (err) {
          res.json(300);
        } else {
          req.userId = decoded?.userId;
          next();
        }
      });
    } else {
      res.json(300);
    }
  } catch (error) {
    console.log(error);
  }
};

export default user;
