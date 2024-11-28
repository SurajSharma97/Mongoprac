const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/project2");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
    },
    password:String,
    image:String,
});


module.exports = mongoose.model("user",userSchema)