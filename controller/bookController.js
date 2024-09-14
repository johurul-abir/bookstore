import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

//prisma inti
const prisma = new PrismaClient();

/**
 *
 * @description Create new Book
 * @method POST
 * @route books
 * @access public
 */
export const createBook = asyncHandler(async (req, res) => {
  const { title, description, publish_date, authorId } = req.body;

  const book = await prisma?.book?.create({
    data: {
      title,
      description,
      publish_date: new Date(publish_date),
      authorId,
    },
  });

  res.status(200).json({ book, message: "book create successfull" });
});

/**
 *
 * @description Get all Books
 * @method GET
 * @route books
 * @access public
 */
export const getAllBooks = asyncHandler(async (req, res) => {
  const books = await prisma.book.findMany();

  res.status(200).json({ books, message: "get all books successfull" });
});

/**
 *
 * @description Get single Book
 * @method GET
 * @route books/id
 * @access public
 */
export const getSingleBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const singleBook = await prisma.book?.findUnique({
    where: { id: Number(id) },
  });

  res.status(200).json({ singleBook, message: "get single book successfull" });
});

/**
 *
 * @description Delete book
 * @method DELETE
 * @route patient
 * @access public
 */
export const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteBook = await prisma.book.delete({
    where: { id: Number(id) },
  });

  res.status(200).json({ deleteBook, message: "Delete book successfull" });
});

/**
 *
 * @description Update book
 * @method udpdate
 * @route appoinment
 * @access public
 */
export const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, publish_date, authorId } = req.body;

  const update_book = await prisma.book.update({
    where: { id: Number(id) },
    data: {
      title,
      description,
      publish_date: new Date(publish_date),
      authorId,
    },
  });

  res.status(200).json({ update_book });
});

/**
 *
 * @description Update Patient
 * @method udpdate
 * @route appoinment
 * @access public
 */
export const findBookByAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const books = await prisma.book.findMany({ where: { authorId: Number(id) } });

  res.status(200).json({ books });
});
