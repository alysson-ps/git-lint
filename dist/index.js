#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const banner_1 = __importDefault(require("./components/banner"));
const typeChange = {
    message: 'Escolha o tipo da modificação feita no seu repositorio: ',
    name: 'typeChange',
    type: 'list',
    choices: ['feat', 'refactor', 'fix', 'docs', 'style', 'test'],
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
        if (answer.length > 10) {
            return true;
        }
        else {
            return 'Please enter a message of commit.';
        }
    },
};
const questions = [typeChange, scopeChanged, messageCommit];
banner_1.default();
inquirer_1.prompt(questions)
    .then((answers) => {
    let messageCompleted = '';
    if (answers.scopeChanged === '') {
        messageCompleted = `${answers.typeChange}: ${answers.messageCommit}`;
    }
    else {
        messageCompleted = `${answers.typeChange}[${answers.scopeChanged}]: ${answers.messageCommit}`;
    }
    console.log(messageCompleted);
    // committer()
})
    .catch((err) => {
    console.log(err);
});
// branches('.', (err, res) => {
//   if (!err) {
//     console.log(res);
//   }
// });
