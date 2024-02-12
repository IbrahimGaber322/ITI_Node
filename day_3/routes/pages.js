import express from "express";
import { homePage } from "../controllers/pages.js";
import { todoPage } from "../controllers/pages.js";
const router = express.Router();

router.get("/", homePage);
router.get("/:id", todoPage);

export default router;
