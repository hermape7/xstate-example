import { Machine, assign } from "xstate";
import { createModel } from "@xstate/test";
import { expect } from 'chai'
import faker from 'faker'

// faker.finance.transactionDescription()
export let testingData = null;

const transactionMachine = Machine({
  initial: "transaction",
  context: {
    filtering_users: false,
    note: false,
    amount: false,
  },
  states: {
    transaction: {
      initial: "select_contact",
      states: {
        select_contact: {
          on: {
            FILTER_USERS: {
              target: "select_contact",
              cond: (context) => context.filtering_users === false,
              actions: assign({ filtering_users: true }),
            },
            DELETE_FILTER: undefined,
            // it is not important at this moment
            // you can enable it and implement it, but now we can skip it
            // DELETE_FILTER: {
            //   target: "select_contact",
            //   cond: (context) => context.filtering_users === true,
            //   actions: assign({ filtering_users: false }),
            // },
            SELECT_USER: {
              target: "payment_step",
            },
          },
        },
        payment_step: {
          on: {
            ADD_NOTE: { target: "payment_step", actions: assign({ note: true }) },
            ADD_AMOUNT: { target: "payment_step", actions: assign({ amount: true }) },
            REMOVE_NOTE: undefined,
            REMOVE_AMOUNT: undefined,
            CLICK_REQUEST: {
              target: "complete_step",
              cond: (context) => context.note === true && context.amount === true,
            },
            CLICK_PAY: {
              target: "complete_step",
              cond: (context) => context.note === true && context.amount === true,
            },
          },
        },
        complete_step: {
          on: {
            RETURN_TO_TRANSACTIONS: undefined,
            CREATE_ANOTHER_TRANSACTION: "select_contact",
          },
        },
      },
      on: {
        CLICK_NEW: undefined
        // WTF, this doesn't restart whole process? :O 
        // NEW: {
        //   target: "transaction",
        //   actions: assign({ amount: false, note: false, filtering_users: false })
        // },
      },
    },
  },
});

export const resetTestData = () => {
  testingData = null;
}

export const transationModel = createModel(transactionMachine, {
  events: {
    FILTER_USERS: async (browser) => { },
    DELETE_FILTER: async (browser) => { },
    SELECT_USER: async (browser) => { },
    ADD_NOTE: async (browser) => { },
    ADD_AMOUNT: async (browser) => { },
    //REMOVE_AMOUNT: undefined,
    //REMOVE_NOTE: undefined,
    CLICK_PAY: async (browser) => { },
    CLICK_REQUEST: async (browser) => { },
    //RETURN_TO_TRANSACTIONS: undefined,
    CREATE_ANOTHER_TRANSACTION: async (browser) => { },
    //CLICK_NEW: undefined,

  },
});
