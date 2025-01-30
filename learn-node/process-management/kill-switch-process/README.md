# SPM - Switch Process Manager

Run the file `spm-initializer.js` via running command --- `nps`.

It is a cross platform solution because this project only uses apis of nodejs.

Spm is amazing if you require a process to be running in background in any of your program and also have a kill-switch file.
- E.g.,  like the case I have for running backend test server code in frontend which requires code to be latest using `tsc --watch` command. Alternatively: you can simply have a check if the appdopriate command is running or not using os's `ps aux` command run via nodejs spawn feature.


### Other thoughts

- You can use `ps-list` to check if process exists via this library - `ps-list`: [npm](https://www.npmjs.com/package/ps-list)
  - Demo in `learn-expressjs/learn-node/demo-ps-list`
