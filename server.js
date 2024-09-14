import express, { json, urlencoded } from "express";
import colors from "colors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

import patientRouter from "./router/BookRouter.js";
import authorRouter from "./router/AuthorRouter.js";

const prisma = new PrismaClient();
//init
const app = express();
dotenv.config();

//PORT config
const PORT = process.env.PORT || 9090;

app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//add router
app.use(patientRouter);
app.use(authorRouter);

//Listen server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`.bgBlue.black);
});
