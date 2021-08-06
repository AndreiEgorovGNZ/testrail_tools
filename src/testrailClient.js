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