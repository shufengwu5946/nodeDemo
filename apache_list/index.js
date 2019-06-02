var http = require("http");
let fs = require("fs");
let path = require("path");
const server = http.createServer();
const BASE_URL = "F:/nodeWorkplace/www";
server.on("request", (req, res) => {
  fs.readFile(path.join(__dirname, "./templete.html"), (err, data) => {
    if (err) {
      res.end("404 templete.html");
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
      fs.readdir(BASE_URL + req.url, { withFileTypes: true }, (err, files) => {
        if (err) {
          res.end("404 www");
          return;
        }
        console.log(files);

        let item = (name = "", size = "100", time = "2019-01-01 00:00:00") => `
            <tr>
                <td style="display:flex; flex-direction:row; align-items:center;">
                    <a href="${name}">
                        <b style="line-height:30px;">${name}</b>
                    </a>
                </td>
                <td>${size}</td>
                <td>${time}</td>
            </tr>
          `;
        let content = "";
        files.forEach(element => {
          content += item(
            element.isDirectory() ? `${element.name}/` : element.name
          );
        });
        let result = data
          .toString()
          .replace("^_^_^_^", content)
          .replace("^_^_^_path", req.url)
          .replace("^_^_^_path", req.url);
        res.setHeader("Content-Type", "text/html");
        res.end(result);
      });
    }
  });
});
server.listen(3000, () => {
  console.log("服务器启动成功");
});
