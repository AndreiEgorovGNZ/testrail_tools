require('dotenv').config()
var TestrailApiClient = require('testrail-api');

const initTestrailClient = async () => {

  return new TestrailApiClient({
    user: process.env.TESTRAIL_USER_EMAIL,
    host: process.env.TESTRAIL_HOST,
    password: process.env.TESTRAIL_TOKEN,
  });
};
console.log("HEY", process.env.TEST_RAIL_PROJECT_NAME)

module.exports = initTestrailClient

// const getProjectId = async (): Promise<number> => {
//   try {
//     const res = await testrail.getProjects();
//     const [currentProject] = res.body.filter(
//       (p) => p.name === envConfig.TEST_RAIL_PROJECT_NAME
//     );
//     return currentProject.id;
//   } catch (e) {
//     console.error("Error occurred while trying to fetch project id", e);
//     return e;
//   }
// };

// const getTestSuiteId = async (projectId: number): Promise<number> => {
//   try {
//     const res = await testrail.getSuites(projectId);
//     const [currentSuite] = res.body.filter(
//       (s) => s.name === envConfig.TEST_RAIL_TEST_SUITE_NAME
//     );
//     return currentSuite.id;
//   } catch (e) {
//     console.error("Error occurred while trying to fetch suite id", e.message);
//     return e;
//   }
// };

// const getMostRecentRunId = async (): Promise<number> => {
//   try {
//     const projectId = await getProjectId();
//     const suiteId = await getTestSuiteId(projectId);
//     const res = await testrail.getRuns(projectId, { suite_id: suiteId });
//     // the latest testRun will have the highest id number
//     const mostRecentRun = res.body.reduce((prev, current) => {
//       return prev.id > current.id ? prev : current;
//     });
//     return mostRecentRun.id;
//   } catch (e) {
//     console.error(
//       "Error occurred while trying to fetch most recent run",
//       e.message
//     );
//     return e;
//   }
// };

// const sendTestResultsToTestRail = async (
//   testResults: INewTestResult[]
// ): Promise<void> => {
//   try {
//     const runId = await getMostRecentRunId();

//     await testrail.addResultsForCases(runId, testResults);
//   } catch (e) {
//     console.error(
//       "\x1b[31m",
//       "Error occurred while uploading testrail results",
//       e.message
//     );

//     process.exitCode = 1 // Stop process to stop pipeline build. This will trigger if for some reason test run results were not sent to testrail. (Ex. Testcase does not exist in testrail)
//     throw new Error(`Test run results were not uploaded to testrail. Error: ${e.message}`)
//   }
// };

// const submitTestRailsReport = async (envs: ITestrailEnvs): Promise<void> => {
//   envConfig = envs;

//   const report: ITestReport = getSummaryReport();
//   console.table(report.testResults)

//   if (report) {
//     testrail = await initTestrailClient();

//     await sendTestResultsToTestRail(report.testResults);
//   } else {
//     throw new Error(`No test report provided, ${report}`);
//   }
// };

// export { submitTestRailsReport };
