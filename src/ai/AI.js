const { startTraining } = require("./model/classifier");
const { prepareDatasets } = require("./model/prepareDatasets");
const Natural = require("natural");
const fs = require("fs");

class AI {
  isTraining = false;
  classifier = null;
  constructor() {
    if (
      this.classifier === null &&
      fs.existsSync("./src/ai/assets/results/classifier.json")
    ) {
      this.classifier = new Natural.BayesClassifier.restore(
        require("./assets/results/classifier.json")
      );
    }
  }
  initialize() {
    if (this.isTraining) {
      this.classifier = new Natural.BayesClassifier();

      prepareDatasets().then((_) => {
        startTraining(classifier);
      });
    }
    console.log(
      "AI initialized",
      this.classifier
        ? "Classifier has been loaded"
        : "Classifier loading failed"
    );
  }

  answer(input) {
    const result = this.classifier.classify(input);
    return result;
  }

  get classifier() {
    return this.classifier;
  }
}

module.exports = AI;
