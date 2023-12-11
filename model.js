const mongoose = require("mongoose");
const listSchema=new mongoose.Schema({
    list: ["mixed"],
    email: String,
    name: String
})
module.exports=mongoose.model("list",listSchema)