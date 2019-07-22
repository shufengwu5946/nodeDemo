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

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    Student.find((err, res) => {
      if (err) {
        reject(new Error("查找失败"));
        return;
      }
      resolve(res);
    });
  });
};

exports.query = id => {
  return new Promise((resolve, reject) => {
    Student.findOne({ id: id }, (err, res) => {
      if (err) {
        reject(new Error("查找失败"));
        return;
      }
      resolve(res);
    });
  });
};

/**
 * add students
 */
exports.add = student => {
  return new Promise((resolve, reject) => {
    Student.find((err, res) => {
      if (err) {
        reject(err);
        return;
      }
      var stu = new Student({
        id: (res.length > 0 ? _.maxBy(res, "id").id : 0) + 1,
        name: student.name,
        gender: student.gender,
        age: student.age,
        address: student.address
      });

      return stu.save();
    })
      .then(() => {
        resolve("保存成功！");
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * update students
 */
exports.update = (id, student) => {
  return new Promise((resolve, reject) => {
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
          reject(new Error("更新失败"));
          return;
        }
        resolve("更新成功！");
      }
    );
  });
};

/**
 * delete student
 */
exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    Student.remove({ id: id }, err => {
      if (err) {
        reject(new Error("删除失败"));
        return;
      }
      resolve("删除成功！");
    });
  });
};
