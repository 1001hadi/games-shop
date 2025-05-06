import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from "morgan";
import { globalErr } from "./middlewares/globalErrorHandler.mjs";

// setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// middlewares
app.use(express.json());
app.use(cors());
// routes

// errMiddleware
app.use(globalErr);
// listener
app.listen(PORT, () => {
  console.log(`Server run on port: ${PORT}`);
});
