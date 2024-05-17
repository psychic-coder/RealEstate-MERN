import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
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


const port =5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


export default app;
