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
  getAll((err, data) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.render("index.html", {
      students: data
    });
  });
});

router.get("/students/new", (req, res) => {
  res.render("new.html");
});
router.post("/students/new", (req, res) => {
  add(req.body, (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
    res.redirect(302, "/students");
  });
});
router.get("/students/edit", (req, res) => {
  query(req.query.id, (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
    res.render("edit.html", { ...data, id: req.query.id });
  });
});
router.post("/students/edit", (req, res) => {
  const { id, ...other } = req.body;
  console.log(id);
  console.log(other);

  update(id, other, (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
    res.redirect(302, "/students");
  });
});
router.get("/students/delete", (req, res) => {
  deleteStudent(req.query.id, (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
    res.redirect(302, "/students");
  });
});

module.exports = router;
