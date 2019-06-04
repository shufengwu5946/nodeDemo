let http = require("http");
let fs = require("fs");
let path = require("path");

// console.log("http");

http
  .createServer((request, response) => {
    if (request.url === "/") {
      fs.readFile(path.join(__dirname, "./views/home.html"), (err, data) => {
        if (err) {
          response.end("404 Not Found");
          return;
        }
        response.end(data);
      });
    } else if (request.url.startsWith("/post")) {
      fs.readFile(path.join(__dirname, "./views/post.html"), (err, data) => {
        if (err) {
          console.log("404 Not Found");
          return;
        }
        response.end(data);
      });
    } else if (request.url.startsWith("/public")) {
      fs.readFile(path.join(__dirname, `.${request.url}`), (err, data) => {
        if (err) {
          console.log("404 Not Found");
          return;
        }
        response.end(data);
      });
    } else {
      fs.readFile(path.join(__dirname, "./views/404.html"), (err, data) => {
        if (err) {
          response.end("404");
          return;
        }
        response.end(data);
      });
    }
  })
  .listen(3000, (err, data) => {
    console.log("启动成功");
  });
