//const express = require('express')
import dotenv from 'dotenv'
import express from 'express'
//const mongoose = require("mongoose")
import mongoose from 'mongoose'
//const cors = require('cors')
import cors from 'cors'
import appRoute from "./routes/app.route.js"

//const config = require('./config/config')
dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

app.use("/", appRoute);

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
    console.log("working on port " + 8081)
})