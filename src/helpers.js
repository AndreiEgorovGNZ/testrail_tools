var fs = require("fs");

const saveFile = (fileNameString, data) => {
  const json = JSON.stringify(data);
  fs.writeFile(fileNameString, json, "utf8", (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
     await callback(array[index], index, array);
  }
};

module.exports = {saveFile, asyncForEach};

