let getPixels = require("get-pixels");
let path = require("path");
const Excel = require("exceljs/modern.nodejs");
const moment = require("moment");

getPixels(path.join(__dirname, "./sourceImg.png"), function(err, pixels) {
  if (err) {
    console.log("Bad image path");
    return;
  }
  console.log(pixels.data.length);
  console.log(pixels.shape);
  console.log(pixels.data[0]);
  console.log(moment().unix());

  let workbook = new Excel.Workbook();
  let sheet = workbook.addWorksheet(`${moment().unix()}`, {
    properties: { tabColor: { argb: "FF00FFFF" } }
  });
  // sheet.getCell("A1").fill = {
  //   type: "pattern",
  //   pattern: "solid",
  //   fgColor: { argb: "FFFF0000" }
  // };

  for (let i = 0; i < pixels.shape[1]; i++) {
    for (let j = 0; j < pixels.shape[0]; j++) {
      const index = (i * pixels.shape[0] + j) * 4;
      // console.log(index);
      
      const index0 = index;
      const index1 = index + 1;
      const index2 = index + 2;
      const index3 = index + 3;
      const color =
        pixels.data[index3].toString(16) +
        pixels.data[index0].toString(16) +
        pixels.data[index1].toString(16) +
        pixels.data[index2].toString(16);
      sheet.getRow(i + 1).getCell(j + 1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: `${color}` }
      };
    }
  }

  workbook.xlsx.writeFile("filename.xlsx").then(function() {
    // done
    console.log("done");
  });
});
