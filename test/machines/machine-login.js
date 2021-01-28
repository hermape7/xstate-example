import { Machine, assign } from "xstate";
import { createModel } from "@xstate/test";

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
        REGISTER: "registration",
        SIGN_IN: {
          target: "sign_in",
          cond: (context) => {
            return context.username === true && context.password === true;
          },
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
          target: "login_opened",
          cond: (context) => context.registration_done === true,
          actions: assign({ registration_done: false }),
        },
      },
    },
    sign_in: {
      on: {
        LOGOUT: "login_opened",
      },
    },
  },
});

export const loginModel = createModel(loginMachine, {
  events: {
    SET_PASSWORD: async (browser) => {
    },
    SET_USERNAME: async () => {},
    SET_REMEMBER_ME: async () => {},
    REGISTER: async () => {},
    SIGN_IN: async () => {},
    SIGN_UP: async () => {},
    LOGOUT: async () => {},
    FILL_FORM: async () => {},
  },
});
