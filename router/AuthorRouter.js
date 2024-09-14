import express from "express";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthor,
  getSingleAuthor,
} from "../controller/authorController.js";

// init router
const router = express.Router();

router.post("/authors/", createAuthor);
router.get("/authors/", getAllAuthor);
router.get("/authors/:id", getSingleAuthor);
router.delete("/authors/:id", deleteAuthor);

//export default
export default router;
