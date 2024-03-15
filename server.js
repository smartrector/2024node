const express = require("express");
const app = express();

app.get("/", function (req, res) {
  return res.send("hello node!!!ddddfdafads");
});

app.listen(3000);
//http://localhost:3000/
