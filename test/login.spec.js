import { loginModel } from "./machines/machine-login";

describe("Cypress real web app - login", () => {

  before(async () => {
    // await browser.setWindowPosition(2000, 0);
    await browser.setWindowSize(1800, 2000);
  });

  const testPlans = loginModel.getSimplePathPlansTo('registration');

  let actual = 0;

  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach((path) => {
        beforeEach(async () => {
          actual += 1;
          console.log(`${actual} / ${testPlans.length}`);
        });
        it(path.description, async () => {
          console.log(plan.description, path.description);
          await browser.url("");
          await path.test(browser);
        });
      });
    });
  });
});
