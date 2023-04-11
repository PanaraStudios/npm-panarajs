const fs = require("fs-extra");
const path = require("path");

function buildProject(panaraApp) {
  fs.copySync("public", "dist");
  fs.writeFileSync(
    path.join("dist", "index.html"),
    panaraApp.renderToString()
  );
}

module.exports = { buildProject };
