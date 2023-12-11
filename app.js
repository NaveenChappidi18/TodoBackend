const express = require("express");
const app = express();
const mongoose = require("mongoose")
app.use(express.json())
const cors = require("cors");
const routeGrp = require("./routePage.js");
app.use(cors());
require("dotenv").config();
const listModel=require("./model.js")
app.use("/", routeGrp);
app.listen(3000, () => {
    mongoose.connect(process.env.DATABASE_URL);
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("Connected to Database"));
    console.log("server created successfully");
})
