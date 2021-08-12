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

const genrateError = (errPrefix, error) => {
  return console.error("\x1b[31m", `${errPrefix}: `, error.message)
}
const generateNewTestCase = (idLessTest) => {
  return {
    title: idLessTest.title,
    template_id: 1,
    type_id: 3,
    priority_id: 3,
    custom_brigade: 3,
    custom_pyramid_layer: 7,
    custom_automated: true,
    custom_description: idLessTest.custom_description,
  };
};

module.exports = { saveFile, asyncForEach, generateNewTestCase, genrateError };
