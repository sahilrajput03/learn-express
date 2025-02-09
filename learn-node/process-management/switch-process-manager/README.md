# SPM - Switch Process Manager

Switch Process manager is a process manager with a kill switch.

Run the file `spm-initializer.js` via running command --- `nps`.

It is a cross platform solution (this program only uses nodejs apis).

Spm is amazing if you require a process to be running in background in any of your program and also have a kill-switch file.

- E.g., like the case I have for running backend test server code in frontend (qr-solution) which requires code to be latest using `tsc --watch` command to be running so that playwright tests are running against upto date code of backend project.
  - _Alternatively:_ you can simply have a check if the appdopriate command is running or not using os's `ps aux` command run via nodejs spawn feature.

### Other thoughts

- You can use `ps-list` to check if process exists via this library - `ps-list`: [npm](https://www.npmjs.com/package/ps-list)
  - Demo in `learn-expressjs/learn-node/demo-ps-list`
- **For project `qr-solution-frontend`:** Add a error message start `tsc --watch` and ask to start in a separate terminal on your system to make sure you are always using latest code of backend in the frontend playwright tests.
  - You can need to test this by checking `ps aux | grep [t]sc --watch` or by using `ps-list` node library. Note: You can add a process identifier in cmd to check with
    and check if the output contains name of backend-project folder.
  - For macos you have this output to test for: `apple             9582   0.1  1.0 35773680 326832   ??  S     4:45PM   0:59.30 node /Users/apple/Documents/test/qr-solution/qr-solution-backend/node_modules/.bin/tsc --watch`
  - **For future: I can remove spm from qr-solution-frontend because it is simply overkill (maybe).**
  - **Why not to use a simple nps's parallel script execution for starting backend test server or watching typesctipt compilation:**
    1. I want robust first time run experience i.e., we start testing only when compilation has completed even for the first time.
    2. For starting test server I want ecplicit communication to start and stop for each file not just to create test-server once for all the times because I want to access backend test server's more feature's i.e., to create some sample data to test particular features via playwright. To be concise - I want more than just start and stop the test server via explicit code control over ipc than just spawning a process of test-server. Also, necessarily I want to be notified when the test server is started before running the tests otherwise the tests would run into race-conditions which are crucial to debug for the lifetime of any project I am working on.
