const express = require("express");
const authRouter = require("./routes/auth");
const app = express();
require("dotenv").config();
const mongodb = require('mongoose')
const bodyParser  = require('body-parser')

app.use(express.json())


mongodb.connect(process.env.MONGO_URI, {useNewUrlParser:true},()=>console.log(`Mongo started`))


app.use("/api/user", authRouter);
app.listen(3000, () => console.log(`server started at 3000`));
