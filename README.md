# xstate example
For demo purposes. So this is not production ready and it is only for showing how xstate/test works. So it needs some tweaks and polishing, but you know, deadline and it will be introduced in next version :)) 

## Instalation 
## Setup app 
1. Install and start [Cypress realworld app](https://github.com/cypress-io/cypress-realworld-app) on default port 3000 - yeah, Cypress app :troll_face:
3. `yarn && yarn start`
2. Create first user `ahoj / ahoj` before test. + Add it into DB if you want.

## Tests
1. `yarn`
2. `yarn test`

# Results
Actual model on xstate viz : https://xstate.js.org/viz/?gist=2a42bd0b4c481df949708dfe104c4aee
With current setup, it generates 14 test-cases for this model.
```
 "spec" Reporter:
------------------------------------------------------------------
[chrome 88.0.4324.96 linux #0-0] Spec: /home/vojtech-cerveny/Documents/dev/personal/xstate-example/test/login.spec.js
[chrome 88.0.4324.96 linux #0-0] Running: chrome (v88.0.4324.96) on linux
[chrome 88.0.4324.96 linux #0-0] Session ID: 3e78e5410229436cf123e08c8d4cce34
[chrome 88.0.4324.96 linux #0-0]
[chrome 88.0.4324.96 linux #0-0] Cypress real web app - login + registration
[chrome 88.0.4324.96 linux #0-0]     reaches state: "login_opened" ({"username":false,"password":false,"registration_done":false,"registration_filled":false})
[chrome 88.0.4324.96 linux #0-0]        ✓ via 
[chrome 88.0.4324.96 linux #0-0]
[chrome 88.0.4324.96 linux #0-0]     reaches state: "login_opened" ({"username":true,"password":false,"registration_done":false,"registration_filled":false})
[chrome 88.0.4324.96 linux #0-0]        ✓ via SET_USERNAME
[chrome 88.0.4324.96 linux #0-0]
[chrome 88.0.4324.96 linux #0-0]     reaches state: "login_opened" ({"username":false,"password":true,"registration_done":false,"registration_filled":false})
[chrome 88.0.4324.96 linux #0-0]        ✓ via SET_PASSWORD
[chrome 88.0.4324.96 linux #0-0]
[chrome 88.0.4324.96 linux #0-0]     reaches state: "#(machine).registration.registration_opened" ({"username":false,"password":false,"registration_done":false,"registration_filled":false})
[chrome 88.0.4324.96 linux #0-0]        ✓ via OPEN_REGISTRATION
[chrome 88.0.4324.96 linux #0-0]
[chrome 88.0.4324.96 linux #0-0]     reaches state: "login_opened" ({"username":true,"password":true,"registration_done":false,"registration_filled":false})
[chrome 88.0.4324.96 linux #0-0]        ✓ via SET_USERNAME → SET_PASSWORD
[chrome 88.0.4324.96 linux #0-0]
[chrome 88.0.4324.96 linux #0-0]     reaches state: "#(machine).registration.registration_opened" ({"username":false,"password":false,"registration_done":false,"registration_filled":true})
[chrome 88.0.4324.96 linux #0-0]        ✓ via OPEN_REGISTRATION → FILL_FORM
[chrome 88.0.4324.96 linux #0-0]
[chrome 88.0.4324.96 linux #0-0]     reaches state: "sign_in" ({"username":false,"password":false,"registration_done":false,"registration_filled":false})
[chrome 88.0.4324.96 linux #0-0]        ✓ via SET_USERNAME → SET_PASSWORD → SIGN_IN
[chrome 88.0.4324.96 linux #0-0]
[chrome 88.0.4324.96 linux #0-0]     reaches state: "login_opened" ({"username":false,"password":false,"registration_done":true,"registration_filled":false})
[chrome 88.0.4324.96 linux #0-0]        ✓ via OPEN_REGISTRATION → FILL_FORM → SIGN_UP
[chrome 88.0.4324.96 linux #0-0]
[chrome 88.0.4324.96 linux #0-0]     reaches state: "login_opened" ({"username":true,"password":false,"registration_done":true,"registration_filled":false})
[chrome 88.0.4324.96 linux #0-0]        ✓ via OPEN_REGISTRATION → FILL_FORM → SIGN_UP → SET_USERNAME
[chrome 88.0.4324.96 linux #0-0]
[chrome 88.0.4324.96 linux #0-0]     reaches state: "login_opened" ({"username":false,"password":true,"registration_done":true,"registration_filled":false})
[chrome 88.0.4324.96 linux #0-0]        ✓ via OPEN_REGISTRATION → FILL_FORM → SIGN_UP → SET_PASSWORD
[chrome 88.0.4324.96 linux #0-0]
[chrome 88.0.4324.96 linux #0-0]     reaches state: "#(machine).registration.registration_opened" ({"username":false,"password":false,"registration_done":true,"registration_filled":false})
[chrome 88.0.4324.96 linux #0-0]        ✓ via OPEN_REGISTRATION → FILL_FORM → SIGN_UP → OPEN_REGISTRATION
[chrome 88.0.4324.96 linux #0-0]
[chrome 88.0.4324.96 linux #0-0]     reaches state: "login_opened" ({"username":true,"password":true,"registration_done":true,"registration_filled":false})
[chrome 88.0.4324.96 linux #0-0]        ✓ via OPEN_REGISTRATION → FILL_FORM → SIGN_UP → SET_USERNAME → SET_PASSWORD
[chrome 88.0.4324.96 linux #0-0]
[chrome 88.0.4324.96 linux #0-0]     reaches state: "#(machine).registration.registration_opened" ({"username":false,"password":false,"registration_done":true,"registration_filled":true})
[chrome 88.0.4324.96 linux #0-0]        ✓ via OPEN_REGISTRATION → FILL_FORM → SIGN_UP → OPEN_REGISTRATION → FILL_FORM
[chrome 88.0.4324.96 linux #0-0]
[chrome 88.0.4324.96 linux #0-0]     reaches state: "sign_in" ({"username":false,"password":false,"registration_done":true,"registration_filled":false})
[chrome 88.0.4324.96 linux #0-0]        ✓ via OPEN_REGISTRATION → FILL_FORM → SIGN_UP → SET_USERNAME → SET_PASSWORD → SIGN_IN
[chrome 88.0.4324.96 linux #0-0]
[chrome 88.0.4324.96 linux #0-0] 14 passing (49.7s)


Spec Files:      1 passed, 1 total (100% completed) in 00:00:51 
```