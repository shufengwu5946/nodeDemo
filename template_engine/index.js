var http = require("http");
let fs = require("fs");
let path = require("path");
let template = require("art-template");
const server = http.createServer();
const BASE_URL = "F:/nodeWorkplace/www";
server.on("request", (req, res) => {
  fs.readFile(path.join(__dirname, "./template.html"), (err, data) => {
    if (err) {
      res.end("404 can not find template.html");
      return;
    }

    if (path.extname(req.url)) {
      fs.readFile(BASE_URL + req.url, (err, data) => {
        if (err) {
          res.end("404 file read fail");
          return;
        }
        switch (path.extname(req.url)) {
          case ".html":
            res.setHeader("Content-Type", "text/html;charset=utf-8;");
            res.end(data);
            break;
          case ".png":
            res.setHeader("Content-Type", "image/png");
            res.end(data);
            break;
          case ".gif":
            res.setHeader("Content-Type", "image/gif");
            res.end(data);
            break;
          default:
            res.setHeader("Content-Type", "text/plain;charset=utf-8;");
            res.end(data);
            break;
        }
      });
    } else {
      console.log(data);

      fs.readdir(BASE_URL + req.url, { withFileTypes: true }, (err, files) => {
        if (err) {
          res.end("404 can not find dir www");
          return;
        }

        let result = template.render(data.toString(), {
          title: req.url,
          list: files.map(item => {
            const value = item;
            value.name = value.isDirectory() ? `${value.name}/` : value.name;
            return value;
          })
        });

        console.log(result);
        res.setHeader("Content-Type", "text/html");
        res.end(result);
      });
    }
  });
});
server.listen(3000, () => {
  console.log("服务器启动成功");
});
