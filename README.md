# @allnulled/runtime

Spawns new processes from JavaScript functions.

## Installation

```sh
npm i -s @allnulled/runtime
```

## Usage

This script spawns 3 different processes:

```js
const Runtime = require("@allnulled/runtime");

Runtime.start(() => {
    setInterval(() => {
        console.log("go 1");
    }, 1000);
});

Runtime.start(() => {
    setInterval(() => {
        console.log("go 2");
    }, 1000);
});

Runtime.start(() => {
    setInterval(() => {
        console.log("go 3");
    }, 1000);
});
```

Things to now:

- The scripts are saved automatically under `runtimes` folder (from `process.cwd`), each of them with its own id.
   - Change the second parameter to another path if you prefer other folder.
- The functions (or callbacks, it does not matter) must not provide any parameter, as it is going to run in a separated different process.
- The scripts are headed with events to remove the file itself when the process is over.