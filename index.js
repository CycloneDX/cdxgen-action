const core = require("@actions/core");
const cdxgen = require("@appthreat/cdxgen");
const process = require("process");
const pathLib = require("path");

async function run() {
  try {
    const output = core.getInput("output");
    const projectId = core.getInput("projectId");
    let projectName = core.getInput("projectName");
    let projectVersion = core.getInput("projectVersion");
    const serverUrl = core.getInput("serverUrl");
    const apiKey = core.getInput("apiKey");

    core.setSecret(apiKey);

    const repo = process.env["GITHUB_REPOSITORY"];
    const repoRef = process.env["GITHUB_REF"];
    if (!projectName) {
      projectName = pathLib.basename(repo);
    }
    if (!projectVersion) {
      projectVersion = pathLib.basename(repoRef);
    }
    const bomData = await cdxgen.createBom(true, output, { projectId });
    core.debug(
      `About to submit bom data for ${projectName}, ${projectVersion}`
    );
    if (serverUrl) {
      try {
        const response = await cdxgen.submitBom(
          {
            output,
            projectId,
            projectName,
            projectVersion,
            serverUrl,
            apiKey
          },
          bomData
        );
        if (response) {
          core.setOutput("token", response.token);
        }
      } catch (err) {
        core.setFailed(err.message);
      }
    }
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
