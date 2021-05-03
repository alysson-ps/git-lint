const menu = require("cli-select");
const chalk = require("chalk");

const options = {
  values: ["Major", "Minor", "Patch"],
  valueRenderer: (value, selected) => {
    if (selected) {
      return chalk.underline(value);
    }

    return value;
  },
};

menu(options)
  .then((response) => {
    console.log("selected " + response.id + ": " + response.value);
  })
  .catch(() => {
    console.log("cancelled");
  });
