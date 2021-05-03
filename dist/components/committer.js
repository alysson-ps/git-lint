"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const commit = (msg) => {
    const command = `git commit -m "${msg}"`;
    child_process_1.exec(command, (stderr) => {
        console.log(stderr ? 'Commit não realizado.' : 'Commit realizado, realize o push.');
    });
};
exports.default = commit;
