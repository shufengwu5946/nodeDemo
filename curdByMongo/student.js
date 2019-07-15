const fs = require("fs");
const path = require("path");
var _ = require("lodash");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/students", { useNewUrlParser: true });
const Schema = mongoose.Schema;
var studentSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  gender: { type: Number, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true }
});
var Student = mongoose.model("Student", studentSchema);

/**
 * get student list
 */

exports.getAll = callback => {
  // fs.readFile(path.resolve(__dirname, "./db.json"), (err, data) => {
  //   if (err) {
  //     callback("Server error", []);
  //     return;
  //   }
  //   callback("", JSON.parse(data.toString()).students);
  // });
  Student.find((err, res) => {
    if (err) {
      callback("查找失败", []);
      return;
    }
    callback("", res);
  });
};

exports.query = (id, callback) => {
  // fs.readFile(path.resolve(__dirname, "./db.json"), (err, data) => {
  //   if (err) {
  //     callback("Server error", {});
  //     return;
  //   }
  //   const dataObj = JSON.parse(data.toString());
  //   const index = _.findIndex(dataObj.students, o => {
  //     return o.id == id;
  //   });
  //   callback("", dataObj.students[index]);
  // });
  Student.findOne({ id: id }, (err, res) => {
    if (err) {
      callback("查找失败", {});
      return;
    }
    callback("", res);
  });
};

/**
 * add students
 */
exports.add = (student, callback) => {
  // fs.readFile(path.resolve(__dirname, "./db.json"), (err, data) => {
  //   if (err) {
  //     callback("Server error", "");
  //     return;
  //   }
  //   const dataObj = JSON.parse(data.toString());
  //   const maxIndex =
  //     dataObj.students.length > 0 ? _.maxBy(dataObj.students, "id").id : 0;
  //   dataObj.students.push({
  //     ...student,
  //     id: maxIndex + 1
  //   });
  //   fs.writeFile(
  //     path.resolve(__dirname, "./db.json"),
  //     JSON.stringify(dataObj),
  //     err => {
  //       if (err) {
  //         callback("保存失败", "");
  //         return;
  //       }
  //       callback("", "保存成功！");
  //     }
  //   );
  // });

  Student.find((err, res) => {
    if (err) {
      callback("查找失败", "");
      return;
    }
    var stu = new Student({
      id: (res.length > 0 ? _.maxBy(res, "id").id : 0) + 1,
      name: student.name,
      gender: student.gender,
      age: student.age,
      address: student.address
    });

    stu
      .save()
      .then(() => callback("", "保存成功！"))
      .catch(error => {
        callback("保存失败", "");
        console.log(error);
      });
  });
};

/**
 * update students
 */
exports.update = (id, student, callback) => {
  // fs.readFile(path.resolve(__dirname, "./db.json"), (err, data) => {
  //   if (err) {
  //     callback("Server error", "");
  //     return;
  //   }
  //   const dataObj = JSON.parse(data.toString());
  //   const index = _.findIndex(dataObj.students, o => {
  //     return o.id == id;
  //   });
  //   dataObj.students[index] = {
  //     ...student,
  //     id: id
  //   };
  //   fs.writeFile(
  //     path.resolve(__dirname, "./db.json"),
  //     JSON.stringify(dataObj),
  //     err => {
  //       if (err) {
  //         callback("更新失败", "");
  //         return;
  //       }
  //       callback("", "更新成功！");
  //     }
  //   );
  // });

  Student.update(
    { id: id },
    {
      name: student.name,
      gender: student.gender,
      age: student.age,
      address: student.address
    },
    err => {
      if (err) {
        callback("更新失败", "");
        return;
      }
      callback("", "更新成功！");
    }
  );
};

/**
 * delete student
 */
exports.delete = (id, callback) => {
  // fs.readFile(path.resolve(__dirname, "./db.json"), (err, data) => {
  //   if (err) {
  //     callback("Server error", "");
  //     return;
  //   }
  //   const dataObj = JSON.parse(data.toString());
  //   _.remove(dataObj.students, o => {
  //     return o.id == id;
  //   });
  //   fs.writeFile(
  //     path.resolve(__dirname, "./db.json"),
  //     JSON.stringify(dataObj),
  //     err => {
  //       if (err) {
  //         callback("删除失败", "");
  //         return;
  //       }
  //       callback("", "删除成功！");
  //     }
  //   );
  // });
  Student.remove({ id: id }, err => {
    if (err) {
      callback("删除失败", "");
      return;
    }
    callback("", "删除成功！");
  });
};
