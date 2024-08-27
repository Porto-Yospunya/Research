require('dotenv').config();

import express, { Application, Router } from 'express';
import path from 'path';

const userRouter: Router = require('./routes/user');
const connect = require('./config/connectDB');

const app: Application = express();

app.set("view engine", "ejs");
app.set("views", (path.join(__dirname, "views")));

app.use(express.static(path.join(__dirname, "public")));

connect(process.env.MONGODB_CONNECT_URI);

app.get('/', userRouter);

const PORT: any = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});