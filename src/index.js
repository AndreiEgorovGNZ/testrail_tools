require("dotenv").config();
const initTestrailClient = require("./testrailClient");
const createTestCaseObjs = require("./parser");
const { saveFile, asyncForEach, generateNewTestCase, genrateError } = require("./helpers");

let testrailClient;

let projectId;
let suiteId;
let sectionId;
const initGlobalVars = async () => {
  // sequence is important
  projectId = await getProjectId()
  suiteId = await getSuiteId()
  sectionId = await getSectionId()
}


const getTestCases = async () => {
  try {

    const res = await testrailClient.getCases(await getProjectId(), {
      suite_id: await getSuiteId(),
    });
    return res.body;
  } catch (e) {
    genrateError("Error occurred while requesting project test cases", e )
    // console.error(
    //   "\x1b[31m",
    //   "Error occurred while requesting project test cases",
    //   e.message
    // );
  }
};

const getProjectId = async () => {
  try {
    const res = await testrailClient.getProjects();
    const currentProject = res.body.find(
      (p) => p.name === process.env.TEST_RAIL_PROJECT_NAME
    );
    console.log("PROJECT ID", currentProject.id);
    return currentProject.id;
  } catch (e) {
    console.error("Error occurred while trying to fetch project id", e);
    return e;
  }
};

const getSuiteId = async () => {
  console.log("PROJECTO:", projectId);

  try {
    const res = await testrailClient.getSuites(
      projectId || await getProjectId()
    );
    const currentSuite = res.body.find(
      (s) => s.name === process.env.TEST_RAIL_TEST_SUITE_NAME
    );
    console.log("TEST SUITE ID", currentSuite.id);
    return currentSuite.id;
  } catch (e) {
    console.error("Error occurred while trying to fetch suite id", e.message);
    return e;
  }
};


const getSectionId = async () => {
  console.log("FINAL TEST", projectId,suiteId )
  try {
    const res = await testrailClient.getSections(projectId, {
      suite_id: suiteId
    } )
    console.log("RESIX", res.body)
  } catch (e) {
    console.error("Error occurred while trying to fetch section id", e.message);
    return e;
  }
};



const getTestRuns = async () => {

  try {
    const res = await testrailClient.getRuns(await getProjectId())
    const currentRun = res.body.find(r => {
      return r.name === `workflows_api_second`
      // return r.name === `${process.env.TEST_RAIL_PROJECT_NAME}_test_run`
    })
    console.log("RESIX", res.body)
  } catch (e) {
    console.error("Error occurred while trying to fetch section id", e.message);
    return e;
  }
};

const addTestRun = async () => {

  try {
    const res = await testrailClient.addRun(await getProjectId(), {
      suite_id: await getSuiteId(),
      name: "DeleteMe test run3",
      include_all: true,
      case_ids:null

    } )
 
    console.log("RESIX", res.body)
  } catch (e) {
    console.error("Error occurred while trying to fetch section id", e.message);
    return e;
  }
};


const addTestCase = async (test) => {
  try {
    const res = await testrailClient.addCase(
      process.env.TESTRAIL_SECTION_ID,
      test
    );
    const createdTest = res.body;

    console.log("Created:", createdTest.id);
    return createdTest
  } catch (e) {
    console.error( "\x1b[31m",
      `Error occurred while trying to add test case. Test name: ${test.title}`,
      e
    
    );
    return e;
  }
};

const deleteTestCase = async (testId) => {
  try {
    const { response } = await testrailClient.deleteCase(testId);
    if (response.statusCode === 200) {
      console.log("Deleted:", testId);
      console.table([{"Deleted": testId}])
    }
  } catch (e) {
    console.error(
      `Error occurred while trying to add test case. Test id: ${testId}`,
      e
    );
    return e;
  }
};

const deleteMultipleTestCases = async (testsToDelete) => {
  try {
    await asyncForEach(testsToDelete, async (test) => {
      await deleteTestCase(test.id);
    });
  } catch (e) {
    console.log("Error deleting cases", e);
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
  // await addMultipleTestCases();

  //  await getProjectId()
  //  await getSuiteId()
   await getTestCases()
  
  //  createTestCaseObjs();
  // await updateTestRailCasesAndAssignResultsIds(resultsWithoutIds);
  // const runs = await getTestRuns()
  // await initGlobalVars()
  // await addTestRun()
  console.log("<<<   Work done   >>>");
};

const updateTestRailCasesAndAssignResultsIds = async (resultsWithoutIds) => {
  const completeResults = [];

  try {
    const testRailDashBoardCases = await getTestCases();

    for (let i = 0; i < resultsWithoutIds.length; i++) {
      const idLessRes = resultsWithoutIds[i];

      const testRailMatch = testRailDashBoardCases.find((t) => {
        return t.title === idLessRes.title;
      });

      if (testRailMatch) {
        idLessRes.id = testRailMatch.id;
        completeResults.push(idLessRes);

        const caseIndex = testRailDashBoardCases.indexOf(testRailMatch);
        testRailDashBoardCases.splice(caseIndex, 1);
      } else {
        console.log("No match:", idLessRes.title)
        const testCaseToAdd = generateNewTestCase(idLessRes);
        const addedTestCase = await addTestCase(testCaseToAdd);

        idLessRes.id = addedTestCase.id
        completeResults.push(idLessRes);
      }
    }
    if (testRailDashBoardCases.length) {
      // good. keep below.
      console.log('deleting')
      await deleteMultipleTestCases(testRailDashBoardCases);
    }
  } catch (e) {
    console.log("ERROR:", e);
  }
  console.log("COMPLETE RESULTS", completeResults)
  return completeResults
};

main();

const resultsWithoutIds = [
  {
    case_id: null,
    status_id: 5,
    comment: "some comment",
    title: "1 first result",
    custom_description: "I am description",
  },
  {
    case_id: null,
    status_id: 5,
    comment: "some comment",
    title: "2 second result",
    custom_description: "I am description",
  },
  {
    case_id: null,
    status_id: 5,
    comment: "some comment",
    title:
      "StatuseEventController-PATCH_/status_event_mapppings/:id-returns_200_with_the_updated_statusEvent_with_new_eventId_in_the_requested_org",
    custom_description: "I am description",
  },
  {
    case_id: null,
    status_id: 5,
    comment: "some comment",
    title: "4 first result",
    custom_description: "I am description",
  },
];
