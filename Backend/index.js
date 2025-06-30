import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoute from "./Routes/todo.routes.js";
import userRoute from "./Routes/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const mongoURI = process.env.MONGODB_URI;

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET,POST,DELETE,PUT",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

try {
  await mongoose.connect(mongoURI); //await is necessary
  console.log("connecteDB connected succesfully");
} catch (error) {
  console.log("error in db connection", error);
}

app.use("/todo", todoRoute);
app.use("/user", userRoute);

app.listen(3000, () => {
  console.log("listening on 3000");
});
