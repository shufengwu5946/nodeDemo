let getPixels = require("get-pixels");
let path = require("path");
let XLSX = require("xlsx");

getPixels(path.join(__dirname, "./sourceImg.jpg"), function(err, pixels) {
  if (err) {
    console.log("Bad image path");
    return;
  }
  console.log(pixels.data.length);
  console.log(pixels.shape);
  console.log(pixels.data[0]);
  let workbook = XLSX.readFile(path.join(__dirname, "./template.xlsx"));
  var new_ws_name = "SheetJS";

  /* make worksheet */
  var ws_data = [["S", "h", "e", "e", "t", "J", "S"], [1, 2, 3, 4, 5]];
  var ws = XLSX.utils.aoa_to_sheet(ws_data);

  /* Add the worksheet to the workbook */
  XLSX.utils.book_append_sheet(workbook, ws, new_ws_name);
  //   XLSX.writeFile(workbook, path.join(__dirname, "./template.xlsx"));

  let arr = new Array();
  for (let i = 0; i < pixels.shape[0]; i++) {
    arr[i] = new Array(i);
    for (let j = 0; j < pixels.shape[1]; j++) {
      //   const index0 = i * pixels.shape[0] + j;
      //   const index1 = i * pixels.shape[0] + j + 1;
      //   const index2 = i * pixels.shape[0] + j + 2;
      //   const index3 = i * pixels.shape[0] + j + 3;
      //   arr[i][j] =
      //     pixels.data[index0].toString(16) +
      //     pixels.data[index1].toString(16) +
      //     pixels.data[index2].toString(16) +
      //     pixels.data[index3].toString(16);
      arr[i][j] = i * pixels.shape[0] + j;
    }
  }
  exportXls(arr);
});

function exportXls(data) {
  var ws = {
    s: {
      "!rows": [{ wpx: 67 }]
    }
  };
  ws["!cols"] = [];
  for (var n = 0; n != data[0].length; ++n) {
    ws["!cols"].push({
      wpx: 67
    });
  }
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = {
        s: {
          fill: { fgColor: { rgb: "99000099" } },
        }
      };
      
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      });

    //   if (typeof cell.v === "number") cell.t = "n";
    //   else if (typeof cell.v === "boolean") cell.t = "b";
    //   else if (cell.v instanceof Date) {
    //     cell.t = "n";
    //     cell.z = XLSX.SSF._table[14];
    //     cell.v = datenum(cell.v);
    //   } else cell.t = "s";
    //   if (R) {
    //     delete cell.s.fill;
    //   }
      ws[cell_ref] = cell;
    }
  }
  data.fileName = "sample.xlsx";
  var workbook = new Workbook();
  var wsName = data.fileName.split(".xlsx")[0];
  workbook.SheetNames.push(wsName);
  workbook.Sheets[wsName] = ws;
  if (range.s.c < 10000000) ws["!ref"] = XLSX.utils.encode_range(range);
  var wopts = {
    bookType: "xlsx",
    bookSST: false,
    type: "binary"
  };
  var wbout = XLSX.write(workbook, wopts);
  XLSX.writeFile(workbook, data.fileName);
  return wbout;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}
