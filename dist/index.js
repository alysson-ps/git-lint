#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const list_git_branches_1 = __importDefault(require("list-git-branches"));
const simple_spellchecker_1 = require("simple-spellchecker");
const banner_1 = __importDefault(require("./components/banner"));
const branchesArray = list_git_branches_1.default.sync('.');
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
        if (answer.length > 0) {
            const words = answer.split(' ');
            const res = simple_spellchecker_1.getDictionary('pt-BR', (err, dictionary) => {
                if (!err) {
                    words.map((item) => {
                        const misspelled = !dictionary.spellCheck(item);
                        if (misspelled) {
                            const suggestions = dictionary.getSuggestions(item);
                            return JSON.stringify(suggestions);
                        }
                        else {
                            return misspelled;
                        }
                    });
                }
            });
            return res;
        }
        else {
            return 'Please enter a message of commit.';
        }
    },
};
const doPush = {
    message: 'Quer fazer o push: ',
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
