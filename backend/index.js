const express = require('express');
const { connection } = require("./configs/db");
const { userModel } = require('./models/user.model');
const cors = require("cors");
require('dotenv').config()
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to my backend...!");
});

app.get("/fs", (req, res) => {
    res.send("Students of My FS batch are honest...FS");
});

app.post("/signup", async (req, res) => {

    const { name, password, email, phone } = req.body;

    if (name == "" || password == "" || email == "" || phone == "") {
        return res.send({ "msg": "Please provide all credentials and password" });
    }

    const alreadyExist = await userModel.find({ email });
    try {
        if (alreadyExist[0]) {
            return res.send({ "msg": "User already Exists" });
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                const user = new userModel({ name, email, password: hash, phone });
                await user.save();
                res.send({ "msg": "Account is created successfully" });
            });
        }
    } catch (error) {
        console.log(error);
    }
});


app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    if (password == "" || email == "") {
        return res.send({ "msg": "Please provide all credentials and password" });
    }

    const alreadyExist = await userModel.find({ email });

    try {
        if (alreadyExist[0]) {
            bcrypt.compare(password, alreadyExist[0].password, async(err, result)=> {
                if(result){
                    res.send({"msg":"user logged in successfully", user:alreadyExist})
                }else{
                    res.send({"msg":"Please check your password or email"});
                }
            });
        } else {
            return res.send({ "msg": "Please create your account first then log in" });
        }
    } catch (error) {
        console.log(error);
    }
});


app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("DB is connected");
    } catch (error) {
        console.log(error);
    }
    console.log("Server is running on port 8080");
});