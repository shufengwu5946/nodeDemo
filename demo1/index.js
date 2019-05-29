var http = require("http");
let fs = require("fs");
const server = http.createServer();
server.on("request", (req, res) => {
  const wwwPath = "F:/nodeWorkplace/www";
  let filePath = "/index.html";
  if (req.url !== "/") {
    filePath = req.url;
  }
  fs.readFile(wwwPath + filePath, (error, data) => {
    if (error) {
      res.end("404 Page not found");
      return;
    }
    res.end(data);
  });
});
server.listen(3000, () => {
  console.log("服务器启动成功");
});
