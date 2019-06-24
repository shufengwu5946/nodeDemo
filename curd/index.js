const express = require("express");
let app = express();

app.engine("html", require("express-art-template"));
app.listen(3000, () => {
  console.log("启动成功");
});

app.get("/", (req, res) => {
  res.render("index.html");
});
