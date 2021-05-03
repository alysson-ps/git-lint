"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const pusher = (branch) => {
    const command = `git push -u origin ${branch}`;
    child_process_1.exec(command, (stderr) => {
        console.log(stderr ? 'Push não foi realizado.' : 'Push realizado.');
    });
};
exports.default = pusher;
