const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    }
});

const userModel = mongoose.model("user", userSchema);

module.exports={
    userModel
};


