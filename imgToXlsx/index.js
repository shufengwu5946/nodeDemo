/**
 * 生成excel像素画
 */
let getPixels = require("get-pixels");
let path = require("path");
const Excel = require("exceljs/modern.nodejs");
const moment = require("moment");
console.log("开始图片读取...");
getPixels(path.join(__dirname, "./sourceImg.jpg"), function(err, pixels) {
  if (err) {
    console.log("Bad image path");
    return;
  }

  console.log("图片读取成功");
  console.log("开始生成Excel像素画...");

  // console.log(pixels.data.length);
  // console.log(pixels.shape);
  // console.log(pixels.data[0]);
  // console.log(moment().unix());

  let workbook = new Excel.Workbook();
  let sheet = workbook.addWorksheet(`${moment().unix()}`, {
    properties: { tabColor: { argb: "FF00FFFF" } }
  });

  for (let i = 0; i < pixels.shape[0] / 2; i++) {

    //列宽
    let column = sheet.getColumn(i + 1);
    column.width = 3;

    for (let j = 0; j < pixels.shape[1] / 2; j++) {
      const index = (j * pixels.shape[0] * 2 + i * 2) * 4;

      const index0 = index;
      const index1 = index + 1;
      const index2 = index + 2;
      const index3 = index + 3;
      let color_r = pixels.data[index0].toString(16);
      color_r = color_r.length === 2 ? color_r : `0${color_r}`;
      let color_g = pixels.data[index1].toString(16);
      color_g = color_g.length === 2 ? color_g : `0${color_g}`;
      let color_b = pixels.data[index2].toString(16);
      color_b = color_b.length === 2 ? color_b : `0${color_b}`;
      let color_a = pixels.data[index3].toString(16);
      color_a = color_a.length === 2 ? color_a : `0${color_a}`;

      let row = sheet.getRow(j + 1);
      //行高
      row.height = 3;
      //背景色填充
      row.getCell(i + 1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: `${color_a}${color_r}${color_g}${color_b}` }
      };
    }
  }

  workbook.xlsx
    .writeFile(path.join(__dirname, "./Excel_Img.xlsx"))
    .then(function() {
      // done
      console.log("Excel像素画完成");
    });
});
