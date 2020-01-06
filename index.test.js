const process = require("process");
const cp = require("child_process");
const path = require("path");

// WIP
test("test runs", () => {
  process.env["GITHUB_REPOSITORY"] = ".";
  process.env["GITHUB_REF"] = "master";
  // const cmd = path.join(__dirname, "index.js");
  // const output = cp.execSync(`node ${cmd}`).toString();
  // console.log(output);
});
