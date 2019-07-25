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
exports.getAll = () => Student.find();

exports.query = id => Student.findOne({ id: id });

/**
 * add students
 */
exports.add = student =>
  Student.find()
    .then(
      res =>
        new Student({
          id: (res.length > 0 ? _.maxBy(res, "id").id : 0) + 1,
          name: student.name,
          gender: student.gender,
          age: student.age,
          address: student.address
        })
    )
    .then(res => res.save());

/**
 * update students
 */
exports.update = (id, student) =>
  Student.update(
    { id: id },
    {
      name: student.name,
      gender: student.gender,
      age: student.age,
      address: student.address
    }
  );

/**
 * delete student
 */
exports.delete = id => Student.remove({ id: id });
