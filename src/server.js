const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {User} = require("./model/User.js");

const users = [];

const MONGO_URL =
  "mongodb+srv://winoz:Fkv4rwcWwEnd7F6N@mongodb.irqbksa.mongodb.net/book?retryWrites=true&w=majority&appName=Mongodb";

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

    app.get("/user", async function (req, res) {
      //1
      //return res.send({user: users});
      try {
        const users = await User.find({});
        return res.send({users});
      } catch (error) {
        return res.status(500).send({error: error.message});
      }
    });

    app.post("/user", async function (req, res) {
      // 01
      // users.push({
      //   name: req.body.name,
      //   age: req.body.age,
      // });
      // users.push({name: "홍길동", age: 30});
      // return res.send({success: true});

      //02
      // let username = req.body.username
      // let name = req.body.name
      try {
        let {username, name} = req.body;
        if (!username) {
          return res.status(400).send({error: "이름이 없네요!!!!!"});
        }
        if (!name || !name.first || !name.last) {
          return res.status(400).send({error: "성/이름이 없네요!!!"});
        }

        const user = new User(req.body);
        await user.save();
        res.send({user});
      } catch (error) {
        return res.status(500).send({error: error.message});
      }
    });

    app.listen(3000);
  } catch (error) {
    console.log("잘못연결");
  }
};

server();
