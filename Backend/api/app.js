import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();

mongoose
  .connect("mongodb+srv://rohit:rohit@mern-estate.mohmtgd.mongodb.net/mern-estate?retryWrites=true&w=majority")
  .then(() => {
    console.log("Mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);


const port =5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  //custom middleware for getting hold of the error
  //using this we get hold of the traditional error in the server
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

export default app;
