const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const { watch } = require("fs");

function startDevServer(panaraApp, port = 3000) {
  const app = express();
  app.use(express.static("public"));
  app.get("*", (req, res) => {
    res.send(panaraApp.renderToString());
  });

  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    ws.send("connected");
  });

  watch("src", { recursive: true }, () => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send("reload");
      }
    });
  });

  server.listen(port, () => {
    console.log(`Development server started at http://localhost:${port}`);
  });
}

module.exports = { startDevServer };
