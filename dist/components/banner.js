"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
const banner = () => {
    console.log(chalk_1.default.cyan(figlet_1.default.textSync('GIT LINT', {
        horizontalLayout: 'full',
    })));
};
exports.default = banner;
