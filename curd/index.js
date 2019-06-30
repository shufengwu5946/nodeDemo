const express = require("express");
const router = require('./router');
let app = express();

app.engine("html", require("express-art-template"));

app.use("/node_modules/", express.static("../node_modules/"));
app.use("/public/", express.static("./public/"));
app.use(router);

app.listen(3000, () => {
  console.log("启动成功");
});


