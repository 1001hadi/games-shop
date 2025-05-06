import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { globalErr } from "./middlewares/globalErrorHandler.mjs";
import connectDB from "./DB/conn.mjs";
import userRoutes from "./routes/UserRoutes.mjs";

// setup
dotenv.config();
const app = express();
connectDB();
const PORT = process.env.PORT || 3001;

// middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
// routes

app.use("/api/user", userRoutes);

// errMiddleware
app.use(globalErr);
// listener
app.listen(PORT, () => {
  console.log(`Server run on port: ${PORT}`);
});
