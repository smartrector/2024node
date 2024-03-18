const express = require("express");
const app = express();
const users = [];

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

//get http://localhost:3000/user -> user list
//get http://localhost:3000/user/:userId -
//put http://localhost:3000/user/:userId
//del http://localhost:3000/user/:userId

//post http://localhost:3000/user

app.listen(3000);

// app.get().listen(3000)
