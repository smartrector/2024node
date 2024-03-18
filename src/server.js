const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./model/User.js");

const users = [];

const MONGO_URL =
  "mongodb+srv://winoz:Fkv4rwcWwEnd7F6N@mongodb.irqbksa.mongodb.net/?retryWrites=true&w=majority&appName=Mongodb";

// let result = mongoose.connect(MONGO_URL);
// console.log(result);

// mongoose.connect(MONGO_URL).then(function (result) {
//   return console.log(result);
// });

// async function fn(){}
// const fn = async function(){}

// fn()

// const fn = new Promise(function (resolve, reject) {});

const server = async function () {
  try {
    await mongoose.connect(MONGO_URL); //promis
    console.log("db connected");
    app.use(express.json());

    app.get("/user", function (req, res) {
      return res.send({user: users});
    });

    app.post("/user", function (req, res) {
      users.push({
        name: req.body.name,
        age: req.body.age,
      });
      // users.push({name: "홍길동", age: 30});
      return res.send({success: true});
    });

    app.listen(3000);
  } catch (error) {
    console.log("잘못연결");
  }
};

server();
