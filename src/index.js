require("dotenv").config();
const initTestrailClient = require("./testrailClient");
const createTestCaseObjs = require("./parser");
const { saveFile, asyncForEach } = require("./helpers");

let testrailClient;

const addTestCase = async (test) => {
  try {
    const res = await testrailClient.addCase(
      process.env.TESTRAIL_SECTION_ID,
      test
    );
    const createdTest = res.body;

    console.log("Created:", createdTest.id);
    return {
      oldName: createdTest.title,
      newName: `C${createdTest.id}: ${createdTest.title}`,
    };
  } catch (e) {
    console.error(
      `Error occurred while trying to add test case. Test name: ${test.title}`,
      e
    );
    return e;
  }
};

const addMultipleTestCases = async () => {
  const testCases = createTestCaseObjs();
  const addedTestCases = [];
  try {
    await asyncForEach(testCases, async (test) => {
      let createdTestCase = await addTestCase(test);
      addedTestCases.push(createdTestCase);
    });
  } catch (e) {
    console.log("Error creating cases", e);
  }
  saveFile("addedCases.json", addedTestCases);
  console.log("Test cases added: ", testCases.length);
};

const main = async () => {
  testrailClient = await initTestrailClient();
  await addMultipleTestCases();

  console.log("Work done");
};

main();
