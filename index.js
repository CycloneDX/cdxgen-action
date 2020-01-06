const core = require("@actions/core");
const cdxgen = require("@appthreat/cdxgen");
const io = require("@actions/io");

const process = require("process");
const pathLib = require("path");
const fs = require("fs");

async function run() {
  const output = core.getInput("output");
  const projectId = core.getInput("projectId");
  let projectName = core.getInput("projectName");
  let projectVersion = core.getInput("projectVersion");
  const serverUrl = core.getInput("serverUrl");
  const apiKey = core.getInput("apiKey");

  if (apiKey) {
    core.setSecret(apiKey);
  }

  // Create any required output directories
  await io.mkdirP(pathLib.dirname(output));

  const repo = process.env["GITHUB_REPOSITORY"];
  const repoRef = process.env["GITHUB_REF"];
  const projectPath = process.env["GITHUB_WORKSPACE"];
  if (!projectName) {
    projectName = pathLib.basename(repo);
  }
  if (!projectVersion) {
    projectVersion = pathLib.basename(repoRef);
  }
  core.debug(projectPath, projectId, projectName);
  cdxgen.createBom(true, projectPath, {}, (err, bomData) => {
    if (err) {
      core.setFailed(err.message);
    }
    core.debug(
      `About to submit bom data for ${projectName}, ${projectVersion}`
    );
    if (output) {
      fs.writeFile(output, bomData, () => {});
    }
    if (serverUrl) {
      cdxgen.submitBom(
        {
          output,
          projectId,
          projectName,
          projectVersion,
          serverUrl,
          apiKey
        },
        bomData,
        (err, res, body) => {
          if (err) {
            core.setFailed(err.message);
          } else if (body) {
            core.setOutput("token", body.token);
          }
        }
      );
    }
  });
}

run();
