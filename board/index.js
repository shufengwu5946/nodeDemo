let http = require("http");
let fs = require("fs");
let path = require("path");
let template = require("art-template");
let url = require("url");

// console.log("http");
let comments = [
  {
    name: "wsf",
    content: "1111111111111111111111111111111111111",
    time: "2019-01-01 00:00:00"
  },
  {
    name: "wsf",
    content: "22222",
    time: "2019-01-01 00:00:00"
  },
  {
    name: "wsf",
    content: "333333333333333333",
    time: "2019-01-01 00:00:00"
  },
  {
    name: "wsf",
    content: "4444444444444444444444444444444444444444444",
    time: "2019-01-01 00:00:00"
  },
  {
    name: "wsf",
    content: "555555555555555555555555555555555555555",
    time: "2019-01-01 00:00:00"
  }
];

http
  .createServer((request, response) => {
    // 解析url
    const urlObj = url.parse(request.url, true);
    if (urlObj.pathname === "/") {
      fs.readFile(path.join(__dirname, "./views/home.html"), (err, data) => {
        if (err) {
          response.end("404 Not Found");
          return;
        }
        let result = template.render(data.toString(), {
          comments: comments
        });
        response.end(result);
      });
    } else if (urlObj.pathname === "/add_comment") {
      comments.push({
        name: urlObj.query.name,
        content: urlObj.query.content,
        time: "2019-01-01 00:00:00"
      });

      
      // 重定向
      response.statusCode=302;
      response.setHeader('Location','/');
      response.end();

    } else if (urlObj.pathname === "/post") {
      fs.readFile(path.join(__dirname, "./views/post.html"), (err, data) => {
        if (err) {
          console.log("404 Not Found");
          return;
        }
        response.end(data);
      });
      //处理静态资源
    } else if (urlObj.pathname.startsWith("/public")) {
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
