// Here we are converting dialog-like dataset date to a proper {input: '', output: ''} array

const makeInputOutputPairs = (dataArray) =>
  dataArray
    .reduce((acc, dialog) => {
      const lastDialog = acc[acc.length - 1];
      if (
        lastDialog &&
        lastDialog.from === dialog.to &&
        lastDialog.to === dialog.from
      ) {
        lastDialog.output = dialog.text;
      } else {
        acc.push({
          from: dialog.from,
          to: dialog.to,
          input: dialog.text,
          output: "",
        });
      }
      return acc;
    }, [])
    .filter((item) => item.output !== "" && item.from !== "");

module.exports = { makeInputOutputPairs };
