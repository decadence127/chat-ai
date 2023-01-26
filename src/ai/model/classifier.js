const Natural = require("natural");
const fs = require("fs");
const { trainingMatrix } = require("./prepareDatasets");
const { info } = require("console");

const startTraining = (classifier) => {
  info("started model training");
  console.time("training");
  trainingMatrix.forEach((datasetArray) => {
    datasetArray.forEach((data) => {
      classifier.addDocument(data.input, data.output);
    });

    classifier.train();
  });
  console.timeEnd("training");

  classifier.save(
    "./src/ai/assets/results/classifier.json",
    (err, classifier) => {
      if (err) {
        console.error(err);
      }
    }
  );
  info("training results recorded");
};

module.exports = { startTraining };
