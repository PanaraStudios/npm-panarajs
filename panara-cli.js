#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function createProject(projectName) {
  const projectPath = path.join(process.cwd(), projectName);
  fs.mkdirSync(projectPath);

  const templatePath = path.join(__dirname, "template");
  copyFolderSync(templatePath, projectPath);

  const prevCwd = process.cwd();
  process.chdir(projectPath);
  execSync("npm install", { stdio: "inherit" });
  process.chdir(prevCwd);
}

function copyFolderSync(src, dest) {
  fs.readdirSync(src).forEach((entry) => {
    const srcEntryPath = path.join(src, entry);
    const destEntryPath = path.join(dest, entry);

    const entryStats = fs.statSync(srcEntryPath);

    if (entryStats.isDirectory()) {
      fs.mkdirSync(destEntryPath);
      copyFolderSync(srcEntryPath, destEntryPath);
    } else {
      fs.copyFileSync(srcEntryPath, destEntryPath);
    }
  });
}

const projectName = process.argv[2];
if (!projectName) {
  console.error("Missing project name.");
  process.exit(1);
}

createProject(projectName);
