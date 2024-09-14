import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  findBookByAuthor,
} from "../controller/bookController.js";

// init router
const router = express.Router();

router.post("/books/", createBook);
router.get("/books/", getAllBooks);
router.get("/books/:id", getSingleBook);
router.delete("/books/:id", deleteBook);
router.put("/books/:id", updateBook);
router.get("/books/author/:id", findBookByAuthor);
//export default
export default router;
