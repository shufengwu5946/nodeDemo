var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});

var Blog = mongoose.model("Blog", blogSchema);
var blog = new Blog({
  title: "my first blog",
  author: "sfw",
  body: "henghenghahei",
  comments: [
    { body: "comments-1", date: new Date() },
    { body: "comments-2", date: new Date() }
  ],
  hidden: false,
  meta: {
    votes: 100,
    favs: 50
  }
});

/**
 * 插入数据
 */
// blog
//   .save()
//   .then(() => console.log("blog"))
//   .catch(error => {
//     console.log("save fail");
//     console.log(error);
//   });

/**
 * 查询数据
 */
Blog.find({author:'sfw'},(err, res) => {
  if (err) {
    console.log("查询失败");
    return;
  }
  console.log(res);
});

/**
 * 查询单个数据
 */

// Blog.findOne({author:'sfw'},(err, res) => {
//   if (err) {
//     console.log("查询失败");
//     return;
//   }
//   console.log(res);
// });
