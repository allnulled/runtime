const Runtime = require(__dirname + "/Runtime.js");


Runtime.start(function() {
  let counter = 0;
  setInterval(function OK_PROCESS() {
    console.log("OK " + (++counter));
  }, 1000);
});

Runtime.start(function() {
  let counter = 0;
  setInterval(function NOPE_PROCESS() {
    console.log("NOPE " + (++counter));
  }, 1500);
});