const express = require("express");
let app = express();

app.engine("html", require("express-art-template"));

app.use("/node_modules/", express.static("../node_modules/"));
app.use("/public/", express.static("./public/"));

app.listen(3000, () => {
  console.log("启动成功");
});

app.get("/", (req, res) => {
  res.render("index.html");
});
