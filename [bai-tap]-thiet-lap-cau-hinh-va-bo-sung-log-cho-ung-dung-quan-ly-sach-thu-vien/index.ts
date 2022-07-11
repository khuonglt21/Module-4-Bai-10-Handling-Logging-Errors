import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
import {logger} from "./src/logger/winston";
import errorHandler from "./src/middleware/errorHandler";

import bookRoutes from './src/router/book.router';

const PORT = 3000;
const app = express();
app.set("view engine", "ejs");
app.set('views', './src/views');

const DB_URL = `mongodb://localhost:27017/dbTest`;
mongoose.connect(DB_URL)
    .then(() => console.log('DB Connected!'))
    .catch(error => console.log('DB connection error:', error.message));
app.use(bodyParser.json());


app.use('/book', bookRoutes);

// error middleware
app.use(errorHandler);
app.listen(PORT, () => {
    console.log("App running on port: " + PORT)
})
