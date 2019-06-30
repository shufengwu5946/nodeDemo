// const fs = require("fs");
// const path = require("path");
// module.exports = app => {
//   app.get("/students", (req, res) => {
//     fs.readFile(path.resolve(__dirname, "./db.json"), (err, data) => {
//       if (err) {
//         res.status(500).send("Server error");
//         return;
//       }
//       res.render("index.html", {
//         students: JSON.parse(data.toString()).students
//       });
//     });
//   });

//   app.get("/students/new", (req, res) => {});
//   app.get("/students/new", (req, res) => {});
//   app.get("/students/new", (req, res) => {});
//   app.get("/students/new", (req, res) => {});
//   app.get("/students/new", (req, res) => {});
// };
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
router.get("/students", (req, res) => {
  fs.readFile(path.resolve(__dirname, "./db.json"), (err, data) => {
    if (err) {
      res.status(500).send("Server error");
      return;
    }
    res.render("index.html", {
      students: JSON.parse(data.toString()).students
    });
  });
});

router.get("/students/new", (req, res) => {
  res.render("new.html");
});
router.post("/students/new", (req, res) => {});
router.get("/students/edit", (req, res) => {});
router.post("/students/edit", (req, res) => {});
router.get("/students/delete", (req, res) => {});

module.exports = router;
