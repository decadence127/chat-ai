const { convertDataset } = require("../utils/convertCSVtoObject");
const fs = require("fs");
const { makeInputOutputPairs } = require("../utils/convertDialogueArray");

const datasetDir = fs.readdirSync("./src/ai/assets/training-dataset");

// const datasetCount = datasetDir.length; - temporary using only one dataset to teach the model
const datasetCount = 1;

const trainingMatrix = [];

const prepareDatasets = async () => {
  console.time("preparingMatrix");
  for (let i = 1; i <= datasetCount; i++) {
    console.info(`started CSV loading and conversion #${i}`);

    console.time(`conversion_${i}`);

    const resultDialogs = await convertDataset(
      `./src/ai/assets/training-dataset/dialogueText_${i}.csv`
    );

    const inputOutputArray = makeInputOutputPairs(resultDialogs);
    trainingMatrix.push(inputOutputArray);
    console.timeEnd(`conversion_${i}`);
  }

  console.timeEnd("preparingMatrix");
};

module.exports = { prepareDatasets, trainingMatrix };
