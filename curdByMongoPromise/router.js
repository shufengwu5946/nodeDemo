const fs = require("fs");
const path = require("path");
const express = require("express");
var _ = require("lodash");
const getAll = require("./student").getAll;
const add = require("./student").add;
const update = require("./student").update;
const query = require("./student").query;
const deleteStudent = require("./student").delete;

const router = express.Router();
router.get("/students", (req, res) => {
  getAll()
    .then(data => {
      res.render("index.html", {
        students: data
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get("/students/new", (req, res) => {
  res.render("new.html");
});
router.post("/students/new", (req, res) => {
  add(req.body)
    .then(data => {
      console.log(data);
      res.redirect(302, "/students");
    })
    .catch(err => {
      res.send(err);
    });
});
router.get("/students/edit", (req, res) => {
  query(Number(req.query.id))
    .then(data => {
      const { name, gender, age, address, id } = data;
      res.render("edit.html", { name, gender, age, address, id });
    })
    .catch(err => {
      res.send(err);
    });
});

router.post("/students/edit", (req, res) => {
  const { id, ...other } = req.body;
  update(id, other)
    .then(data => {
      res.redirect(302, "/students");
    })
    .catch(err => {
      res.send(err);
    });
});
router.get("/students/delete", (req, res) => {
  deleteStudent(req.query.id)
    .then(data => {
      res.redirect(302, "/students");
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
