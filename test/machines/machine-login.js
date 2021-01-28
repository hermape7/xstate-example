import { Machine, assign } from "xstate";
import { createModel } from "@xstate/test";
import { expect } from 'chai'
import faker from 'faker'

export let testingData = null;

const loginMachine = Machine({
  initial: "login_opened",
  context: {
    username: false,
    password: false,
    registration_done: false,
    registration_filled: false,
  },
  states: {
    login_opened: {
      on: {
        SET_USERNAME: {
          target: "login_opened",
          actions: assign({ username: true }),
        },
        SET_PASSWORD: {
          target: "login_opened",
          actions: assign({ password: true }),
        },
        SET_REMEMBER_ME: "login_opened",
        OPEN_REGISTRATION: {
          target: "registration",
          actions: assign({ password: false, username: false })
        },
        SIGN_IN: {
          target: "sign_in",
          cond: (context) => {
            return context.username === true && context.password === true;
          },
          actions: assign({ password: false, username: false })
        },
      },
      meta: {
        test: async () => {
          await (await browser.$('[data-test="signin-submit"]')).waitForDisplayed()
          expect(await browser.getUrl()).to.equal(`${browser.config.baseUrl}signin`)

          // TODO: Add some validations for elements after actions
        },
      },
    },
    registration: {
      initial: "registration_opened",
      states: {
        registration_opened: {
          on: {
            FILL_FORM: {
              target: "registration_opened",
              actions: assign({ registration_filled: true }),
            },
          },
        },
      },
      on: {
        GO_BACK: { target: "login_opened", actions: assign({ registration_done: false, registration_filled: false }) },
        SIGN_UP: {
          target: "login_opened",
          cond: (context) => context.registration_filled === true,
          actions: assign({ registration_done: true, registration_filled: false }),
        },
      },
      meta: {
        test: async () => {
          await (await browser.$('[data-test="signup-submit"]')).waitForDisplayed()
          expect(await browser.getUrl()).to.equal(`${browser.config.baseUrl}signup`)
        },
      },
    },
    sign_in: {
      on: {
        LOGOUT: "login_opened",
      },
      meta: {
        test: async () => {
          await browser.waitUntil(async () => await browser.getUrl() == browser.config.baseUrl)
          expect(await (await browser.$('[data-test="main"]')).isDisplayed()).to.be.true

          // TODO: Add some validations for elements after actions
          
        },
      },
    },
  },
});

export const resetTestData = () => {
  testingData = null;
}

export const loginModel = createModel(loginMachine, {
  events: {
    SET_PASSWORD: async (browser) => {
      const passwordInput = await browser.$('#password')
      const password = testingData ? testingData.user.password : "ahoj"
      await passwordInput.setValue(password)
    },
    SET_USERNAME: async (browser) => {
      const usernameInput = await browser.$('#username')
      const username = testingData ? testingData.user.username : "ahoj"
      await usernameInput.setValue(username)
    },
    SET_REMEMBER_ME: async (browser) => {
      const input = await browser.$('[data-test="signin-remember-me"]')
      await input.click()
    },
    OPEN_REGISTRATION: async (browser) => {
      const link = await browser.$('[data-test="signup"]')
      await link.click()
      // bug, when you need to click twice on link 
      if (await link.isDisplayed()) {
        await link.click()
      }
    },
    SIGN_IN: async (browser) => {
      const signInButton = await browser.$('[data-test="signin-submit"]')
      await signInButton.click()
    },
    SIGN_UP: async (browser) => {
      const signUpButton = await browser.$('[data-test="signup-submit"]')
      await signUpButton.click()
    },
    LOGOUT: async () => { },
    GO_BACK: async (browser) => {
      const goBackLink = await browser.$('=Have an account? Sign In')
      await goBackLink.click()
      testingData = {}
      // bug, when you need to click twice on link 
      if (await goBackLink.isDisplayed()) {
        await goBackLink.click()
      }
    },
    FILL_FORM: async (browser) => {
      const userData = {
        firstname: faker.name.findName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      }
      testingData = {};
      testingData.user = userData;

      const firstname = await browser.$('#firstName')
      const lastname = await browser.$('#lastName')
      const username = await browser.$('#username')
      const password = await browser.$('#password')
      const confirmPassword = await browser.$('#confirmPassword')

      await firstname.setValue(userData.firstname)
      await lastname.setValue(userData.lastname)
      await username.setValue(userData.username)
      await password.setValue(userData.password)
      await confirmPassword.setValue(userData.password)
    },
  },
});
