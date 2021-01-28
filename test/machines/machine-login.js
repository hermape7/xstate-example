import { Machine, assign } from "xstate";
import { createModel } from "@xstate/test";
import faker from 'faker'
const loginMachine = Machine({
  initial: "login_opened",
  context: {
    username: false,
    password: false,
    registration_done: false,
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
        OPEN_REGISTRATION: "registration",
        SIGN_IN: {
          target: "sign_in",
          cond: (context) => {
            return context.username === true && context.password === true;
          },
        },
      },
      meta: {
        test: async () => {
          await (await browser.$('[data-test="signin-submit"]')).waitForDisplayed()
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
              actions: assign({ registration_done: true }),
            },
          },
        },
      },
      on: {
        GO_BACK: "login_opened",
        SIGN_UP: {
          target: "registration",
          cond: (context) => context.registration_done === true,
          actions: assign({ registration_done: false }),
        },
      },
      meta: {
        test: async () => {

        },
      },
    },
    sign_in: {
      on: {
        LOGOUT: "login_opened",
      },
      meta: {
        test: async () => {

        },
      },
    },
  },
});

export const loginModel = createModel(loginMachine, {
  events: {
    SET_PASSWORD: async (browser) => {
      const password = await browser.$('#password')
      await password.setValue('ahoj')
    },
    SET_USERNAME: async (browser) => {
      const username = await browser.$('#username')
      await username.setValue('ahoj')
    },
    SET_REMEMBER_ME: async (browser) => {
      const input = await browser.$('[data-test="signin-remember-me"]')
      await input.click()
    },
    OPEN_REGISTRATION: async (browser) => {
      const link = await browser.$('[data-test="signup"]')
      await link.click()
    },
    SIGN_IN: async (browser) => {
      const signInButton = await browser.$('[data-test="signin-submit"]')
      await signInButton.click()
    },
    SIGN_UP: async (browser) => {
      const signUpButton = await browser.$('[data-test="signup-submit"]')
      await signUpButton.click()
    },
    LOGOUT: async () => {},
    GO_BACK: async (browser) => {
      const goBackLink = await browser.$('=Have an account? Sign In')
      await goBackLink.click()
    },
    FILL_FORM: async (browser) => {
      const userData = {
        firstname: faker.name.findName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      }

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
