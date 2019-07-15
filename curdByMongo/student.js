const _ = require("lodash");
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
  Student.find((err, res) => {
    if (err) {
      callback("查找失败", []);
      return;
    }
    callback("", res);
  });
};

exports.query = (id, callback) => {
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
  Student.remove({ id: id }, err => {
    if (err) {
      callback("删除失败", "");
      return;
    }
    callback("", "删除成功！");
  });
};
