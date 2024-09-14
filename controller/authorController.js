import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

//prisma inti
const prisma = new PrismaClient();

/**
 *
 * @description Create Author
 * @method POST
 * @route /authors
 * @access public
 */
export const createAuthor = asyncHandler(async (req, res) => {
  const { name, bio, birthdate } = req.body;

  const author = await prisma.author.create({
    data: {
      name,
      bio,
      birthdate: new Date(birthdate),
    },
  });

  res.status(200).json({ author, message: "author create successfully" });
});

/**
 *
 * @description Get all Authors
 * @method GET
 * @route /authors
 * @access public
 */
export const getAllAuthor = asyncHandler(async (req, res) => {
  const authors = await prisma.author.findMany();

  res.status(200).json({ authors, message: "get all authors successfully" });
});

/**
 *
 * @description Get all Authors
 * @method GET
 * @route /authors
 * @access public
 */
export const getSingleAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const singleAuthor = await prisma.author.findUnique({
    where: { id: Number(id) || undefined },
  });

  res
    .status(200)
    .json({ singleAuthor, message: "get single author successfully" });
});

/**
 *
 * @description Delete Authors
 * @method DELETE
 * @route /authors
 * @access public
 */
export const deleteAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const authorId = Number(id); // example doctorId

  // Example doctorId
  async function deleteAuthor(authorId) {
    try {
      // Delete dependent records (example for appointments)
      await prisma.book.deleteMany({
        where: {
          authorId: authorId,
        },
      });

      // Then delete the doctor
      await prisma.author.delete({
        where: {
          id: authorId,
        },
      });

      console.log(`Doctor with id ${authorId} deleted successfully.`);
    } catch (error) {
      console.error(`Failed to delete doctor with id ${authorId}:`, error);
    }
  }

  deleteAuthor(authorId);

  const delAuthor = await prisma.author.delete({
    where: { id: Number(id) },
  });
  res.status(200).json({ delAuthor, message: "Delete Author successfully" });
});
