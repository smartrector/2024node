const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const {User} = require("./model/User.js");
const dotenv = require("dotenv");

dotenv.config();

//process.env.MONGO_URL

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
    await mongoose.connect(process.env.MONGO_URL); //promise
    console.log("db connected");
    app.use(cors());
    app.use(express.json());

    app.get("/user", async function (req, res) {
      //1
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

    app.delete("/user/:userId", async function (req, res) {
      try {
        //  let userId = req.params.userId
        let {userId} = req.params;

        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).send({error: "유저가 없네요!!!!!"});
        }

        const user = await User.findByIdAndDelete({_id: userId});
        return res.send({user});
      } catch (error) {
        return res.status(500).send({error: error.message});
      }
    });

    //app.put("",function(){})
    app.put("/user/:userId", async function (req, res) {
      try {
        let {userId} = req.params;
        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).send({error: "유저가 없네요!!!!!"});
        }

        let {age} = req.body;
        //age value 확인
        if (!age) {
          return res.status(400).send({error: "나이입력해주세요"});
        }
        if (typeof age !== "number") {
          return res.status(400).send({error: "숫자입력해주세요"});
        }

        const user = await User.findByIdAndUpdate(
          userId,
          {$set: {age}},
          {new: true} // 화면에서 바로반영
        );
        return res.send({user});
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
