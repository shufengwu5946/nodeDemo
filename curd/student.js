const fs = require("fs");
const path = require("path");
var _ = require("lodash");

/**
 * get student list
 */

exports.getAll = callback => {
  fs.readFile(path.resolve(__dirname, "./db.json"), (err, data) => {
    if (err) {
      callback("Server error", []);
      return;
    }
    callback("", JSON.parse(data.toString()).students);
  });
};

exports.query = (id, callback) => {
  fs.readFile(path.resolve(__dirname, "./db.json"), (err, data) => {
    if (err) {
      callback("Server error", {});
      return;
    }
    const dataObj = JSON.parse(data.toString());
    const index = _.findIndex(dataObj.students, o => {
      return o.id == id;
    });
    callback("", dataObj.students[index]);
  });
};

/**
 * add students
 */
exports.add = (student, callback) => {
  fs.readFile(path.resolve(__dirname, "./db.json"), (err, data) => {
    if (err) {
      callback("Server error", "");
      return;
    }
    const dataObj = JSON.parse(data.toString());
    const maxIndex = _.maxBy(dataObj.students, "id").id;
    dataObj.students.push({
      ...student,
      id: maxIndex + 1
    });
    fs.writeFile(
      path.resolve(__dirname, "./db.json"),
      JSON.stringify(dataObj),
      err => {
        if (err) {
          callback("保存失败", "");
          return;
        }
        callback("", "保存成功！");
      }
    );
  });
};

/**
 * update students
 */
exports.update = (id, student, callback) => {
  fs.readFile(path.resolve(__dirname, "./db.json"), (err, data) => {
    if (err) {
      callback("Server error", "");
      return;
    }
    const dataObj = JSON.parse(data.toString());
    const index = _.findIndex(dataObj.students, o => {
      return o.id == id;
    });
    dataObj.students[index] = {
      ...student,
      id: id
    };
    fs.writeFile(
      path.resolve(__dirname, "./db.json"),
      JSON.stringify(dataObj),
      err => {
        if (err) {
          callback("更新失败", "");
          return;
        }
        callback("", "更新成功！");
      }
    );
  });
};

/**
 * delete student
 */
exports.delete = (id, callback) => {
  fs.readFile(path.resolve(__dirname, "./db.json"), (err, data) => {
    if (err) {
      callback("Server error", "");
      return;
    }
    const dataObj = JSON.parse(data.toString());
    _.remove(dataObj.students, o => {
      return o.id == id;
    });
    fs.writeFile(
      path.resolve(__dirname, "./db.json"),
      JSON.stringify(dataObj),
      err => {
        if (err) {
          callback("删除失败", "");
          return;
        }
        callback("", "删除成功！");
      }
    );
  });
};
