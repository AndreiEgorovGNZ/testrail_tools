require("dotenv").config();
const path = require("path");


const {
  TEST_TEMPLATE_ID,
  TEST_TYPE_ID,
  TEST_PRIORITY_ID,
  CUSTOM_BRIGADE_ID,
  CUSTOM_PYRAMID_LAYER_ID,
  CUSTOM_AUTOMATED,
} = process.env;

function readJsonFile(filePath) {
  const outputData = require("fs").readFileSync(filePath);
  return JSON.parse(outputData);
}

const createTestCaseObjs = () => {
  const filePath = path.resolve("src", "output.json");
  const testRunOutput = readJsonFile(filePath);

  if (!testRunOutput) {
    throw new Error("No output file found");
  }
  const readyTests = [];

  const testCases = testRunOutput.testResults;

  testCases.map((group) => {
    group.assertionResults.map((test) => {
      readyTests.push({
        title: `${test.title}`,
        template_id: TEST_TEMPLATE_ID,
        type_id: TEST_TYPE_ID,
        priority_id: TEST_PRIORITY_ID,
        custom_brigade: CUSTOM_BRIGADE_ID,
        custom_pyramid_layer: CUSTOM_PYRAMID_LAYER_ID,
        custom_automated: !!CUSTOM_AUTOMATED,
        custom_description: `{testTitle: ${test.title}, testSpecModule: ${test.ancestorTitles}}`,
      });
    });
  });
  console.log("Test Cases Created:", readyTests.length);
  return readyTests;
};

module.exports = createTestCaseObjs;
