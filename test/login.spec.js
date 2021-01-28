import { loginModel, resetTestData } from "./machines/machine-login";

describe("Cypress real web app - login + registration", () => {

  before(async () => {
    // await browser.setWindowPosition(2000, 0);
    // await browser.setWindowSize(1800, 2000);
  });

  const testPlans = loginModel.getShortestPathPlans();
  // uncomment only if you want to check how many testcases it will generate
  //const testPlans = loginModel.getShortestPathPlans();

  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach((path) => {
        beforeEach(async () => {
          resetTestData()
          await browser.reloadSession()
          await browser.url("");
        });
        it(path.description, async () => {
          // just for info, what test is executed 
          console.log(plan.description, path.description);
          await path.test(browser);
        });
      });
    });
  });
});
