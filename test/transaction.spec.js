import { transationModel, resetTestData } from "./machines/machine-transaction";

describe("Cypress real web app - transaction", () => {

  // before(async () => {
  //   // await browser.setWindowPosition(2000, 0);
  //   // await browser.setWindowSize(1800, 2000);
  // });

  before(async() => {
    await browser.url("");
    const usernameInput = await browser.$('#username')
    await usernameInput.setValue('ahoj')
    const passwordInput = await browser.$('#password')
    await passwordInput.setValue('ahoj')
    const signInButton = await browser.$('[data-test="signin-submit"]')
    await signInButton.click()
  })

  const testPlans = transationModel.getShortestPathPlans();
  // uncomment only if you want to check how many testcases it will generate
  //const testPlans = loginModel.getShortestPathPlans();

  testPlans.forEach((plan) => {
    describe(plan.description, () => {


      plan.paths.forEach((path) => {
        beforeEach(async () => {
          resetTestData()
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
