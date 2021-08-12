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
  // const readyTests = [];

  const readyTests = [
    {
      title:
        "StatuseEventController-POST_/status_event_mapppings/-returns_422_if_the_specified_event_id_is_not_in_the_requested_org",
      template_id: "1",
      type_id: "3",
      priority_id: "3",
      custom_brigade: "3",
      custom_pyramid_layer: "7",
      custom_automated: true,
      custom_description:
        "{testTitle: returns 422 if the specified event id is not in the requested org, testSpecModule: StatuseEventController,POST /status_event_mapppings/}",
    },
    {
      title:
        "StatuseEventController-POST_/status_event_mapppings/-returns_422_if_the_specified_status_event_mapping_already_exist",
      template_id: "1",
      type_id: "3",
      priority_id: "3",
      custom_brigade: "3",
      custom_pyramid_layer: "7",
      custom_automated: true,
      custom_description:
        "{testTitle: returns 422 if the specified status event mapping already exist, testSpecModule: StatuseEventController,POST /status_event_mapppings/}",
    },
    {
      title:
        "StatuseEventController-PATCH_/status_event_mapppings/:id-returns_200_with_the_updated_statusEvent_with_new_eventId_in_the_requested_org",
      template_id: "1",
      type_id: "3",
      priority_id: "3",
      custom_brigade: "3",
      custom_pyramid_layer: "7",
      custom_automated: true,
      custom_description:
        "{testTitle: returns 200 with the updated statusEvent with new eventId in the requested org, testSpecModule: StatuseEventController,PATCH /status_event_mapppings/:id}",
      status_id: 5,
      comment:
        'DBError: role "transactional_workflow" does not exist\n    at wrapError (/Users/andrei.egorov/src/transactional-workflow/node_modules/db-errors/lib/dbErrors.js:19:14)\n    at handleExecuteError (/Users/andrei.egorov/src/transactional-workflow/node_modules/objection/lib/queryBuilder/QueryBuilder.js:1506:32)\n    at QueryBuilder.execute (/Users/andrei.egorov/src/transactional-workflow/node_modules/objection/lib/queryBuilder/QueryBuilder.js:687:20)\n    at process._tickCallback (internal/process/next_tick.js:68:7),DBError: role "transactional_workflow" does not exist\n    at wrapError (/Users/andrei.egorov/src/transactional-workflow/node_modules/db-errors/lib/dbErrors.js:19:14)\n    at handleExecuteError (/Users/andrei.egorov/src/transactional-workflow/node_modules/objection/lib/queryBuilder/QueryBuilder.js:1506:32)\n    at QueryBuilder.execute (/Users/andrei.egorov/src/transactional-workflow/node_modules/objection/lib/queryBuilder/QueryBuilder.js:687:20)\n    at process._tickCallback (internal/process/next_tick.js:68:7)',
      custom_test_case_title:
        "returns 404 if status belongs to a different org",
    },
  ];

  const testCases = testRunOutput.testResults;

  // testCases.map((group) => {
  //   group.assertionResults.map((test) => {

  //     const title = [...test.ancestorTitles, test.title].join("-").replace(/\s+/g, '_')

  //     // console.log("TITLE:  ", test)
  //     readyTests.push({
  //       title: title,
  //       template_id: TEST_TEMPLATE_ID,
  //       type_id: TEST_TYPE_ID,
  //       priority_id: TEST_PRIORITY_ID,
  //       custom_brigade: CUSTOM_BRIGADE_ID,
  //       custom_pyramid_layer: CUSTOM_PYRAMID_LAYER_ID,
  //       custom_automated: !!CUSTOM_AUTOMATED,
  //       custom_description: `{testTitle: ${test.title}, testSpecModule: ${test.ancestorTitles.length ? test.ancestorTitles : 'No describe block'}}`,
  //     });
  //   });
  // });

  console.log("Test Cases Created:", readyTests);
  console.log("Test Cases Created:", readyTests.length);
  return readyTests;
};

module.exports = createTestCaseObjs;
