#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const list_git_branches_1 = __importDefault(require("list-git-branches"));
const committer_1 = __importDefault(require("./components/committer"));
const banner_1 = __importDefault(require("./components/banner"));
const pusher_1 = __importDefault(require("./components/pusher"));
const branchesArray = list_git_branches_1.default.sync('.');
const typeChange = {
    message: 'Escolha o tipo da modificação feita no seu repositorio: ',
    name: 'typeChange',
    type: 'list',
    choices: ['feat', 'refactor', 'fix', 'docs', 'style', 'test', 'revert'],
};
const scopeChanged = {
    message: 'Qual escopo foi modificado: ',
    name: 'scopeChanged',
    type: 'input',
    filter: (answer) => {
        return answer.toLowerCase();
    },
    default: '',
};
const messageCommit = {
    message: 'Escreva uma mensagem de commit: ',
    name: 'messageCommit',
    type: 'input',
    filter: (answer) => {
        return answer.toLowerCase();
    },
    validate: (answer) => {
        if (answer.length > 0) {
            return true;
        }
        else {
            return 'Please enter a message of commit.';
        }
    },
};
const doPush = {
    message: 'Dejesa realizar o push: ',
    name: 'doPush',
    type: 'confirm',
};
const branch = {
    message: 'Escolha a branch para fazer o commit: ',
    name: 'branch',
    type: 'list',
    choices: branchesArray.filter((item, index) => branchesArray.indexOf(item) === index),
};
const questions = [
    typeChange,
    scopeChanged,
    messageCommit,
    doPush,
    branch,
];
banner_1.default();
inquirer_1.prompt(questions)
    .then((answers) => {
    console.log(answers);
    let messageCompleted = '';
    if (answers.scopeChanged === '') {
        messageCompleted = `${answers.typeChange}: ${answers.messageCommit}`;
    }
    else {
        messageCompleted = `${answers.typeChange}[${answers.scopeChanged}]: ${answers.messageCommit}`;
    }
    committer_1.default(messageCompleted);
    if (answers.doPush) {
        pusher_1.default(answers.branch);
    }
})
    .catch((err) => {
    console.log(err);
});
