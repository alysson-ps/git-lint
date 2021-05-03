"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const figlet_1 = require("figlet");
const banner = () => {
    console.log(chalk_1.cyan(figlet_1.textSync('GIT LINT', {
        horizontalLayout: 'full',
    })));
};
exports.default = banner;
