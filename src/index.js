const express = require("express");
const AI = require("./ai/AI");
const bodyParser = require("body-parser");

const AIInstance = new AI();
AIInstance.initialize();

if (AIInstance.classifier) {
  const app = express();

  const PORT = process.env.PORT || 5050;

  app.use(bodyParser.json());

  app.get("/api", (req, res) => {
    res.send("Hello world");
  });
  app.post("/api/chat", (req, res) => {
    const { input } = req.body;

    const output = AIInstance.answer(input);

    res.send({ output });
  });

  app.listen(PORT, () => {
    console.info(`Chat service has been started on port ${PORT}`);
  });
} else {
  console.error("AI Server failed to start");
}
