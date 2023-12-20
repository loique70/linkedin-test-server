import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import connectDB from "./src/config/connectDB";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./src/Routes/userRoutes";
import sectorRoutes from "./src/Routes/sectorRoutes";

dotenv.config();

const PORT = process.env.PORT;
connectDB();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(userRoutes);
app.use(sectorRoutes);

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log(`Connected to MongoDB`);
  server.listen(PORT, () => {
    console.log(`The server is running on port:${PORT}`);
  });
});
