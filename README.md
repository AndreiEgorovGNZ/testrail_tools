This tool is made to save time when moving unit tests from your repo to testrail. 

Suppose you want to migrate unit tests from your repo to testrai. (aka create test cases in tesrail). If you have a lot of tests, it may take hours to create test cases manually. 

Instead, you can use this tool.
This will help to create test cases. although not very detailed. Just test case and a title, but that will help you get started. The details, such as "Description" "Execution steps" etc, can be added manually (if needed) later. 


To use it you need: 
* get `output.json` file that contains testrun results. (Basically save your testrun into a file. Ex.: `yarn run test --json --outputFile=test/output.json`)
* add `output.json` to `/src`
* set up env variables: add `.env` file to teh root directory
* fill up .env file with variables: 
`
    TESTRAIL_USER_EMAIL=my_testrail_account@wegalvanize.com
    TESTRAIL_TOKEN=qm/l.4C1K0yorpJFgLTy-ppEgAZKL/Mb05yM3pzBB
    TESTRAIL_HOST=https://galvanize.testrail.com
    TEST_RAIL_PROJECT_NAME=Transactional Workflow
    TESTRAIL_SECTION_ID=454
    TEST_TEMPLATE_ID=1
    TEST_TYPE_ID=3
    TEST_PRIORITY_ID=3
    CUSTOM_BRIGADE_ID=3
    CUSTOM_PYRAMID_LAYER_ID=7
    CUSTOM_AUTOMATED=true
`
* from root directory run `npm run main`. Once the tests have been created, a json file, `addedCases.json` will be created. It contains a list of test names of your existing unit tests and names that now contain a corresponding test case id from testrail Ex `[{
    "oldName": "Unit test doing some stuff",
    "newName": "C3952: Unit test doing some stuff"
  }]`


